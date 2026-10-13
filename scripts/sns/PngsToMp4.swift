// 静止画（PNG）を、指定した秒数ずつ並べて、MP4（H.264・30fps・無音）にする。外部のツールは使わない（macOS標準）。
// 使い方: PngsToMp4 out.mp4 list.txt   （list.txt は 1行に「PNGのパス<TAB>秒数」）
import AVFoundation
import AppKit
import Foundation

let args = CommandLine.arguments
guard args.count == 3 else { print("usage: PngsToMp4 out.mp4 list.txt"); exit(2) }
let outURL = URL(fileURLWithPath: args[1])
let lines = try String(contentsOfFile: args[2], encoding: .utf8).split(separator: "\n").map { String($0) }
let items: [(String, Double)] = lines.compactMap {
  let p = $0.split(separator: "\t")
  guard p.count == 2, let s = Double(p[1]) else { return nil }
  return (String(p[0]), s)
}
guard let first = items.first, let img0 = NSImage(contentsOfFile: first.0),
      let cg0 = img0.cgImage(forProposedRect: nil, context: nil, hints: nil) else { print("cannot read first image"); exit(1) }
let width = cg0.width, height = cg0.height
try? FileManager.default.removeItem(at: outURL)

let writer = try AVAssetWriter(outputURL: outURL, fileType: .mp4)
let settings: [String: Any] = [
  AVVideoCodecKey: AVVideoCodecType.h264, AVVideoWidthKey: width, AVVideoHeightKey: height,
  AVVideoCompressionPropertiesKey: [AVVideoAverageBitRateKey: 6_000_000, AVVideoProfileLevelKey: AVVideoProfileLevelH264HighAutoLevel],
]
let input = AVAssetWriterInput(mediaType: .video, outputSettings: settings)
let adaptor = AVAssetWriterInputPixelBufferAdaptor(
  assetWriterInput: input,
  sourcePixelBufferAttributes: [kCVPixelBufferPixelFormatTypeKey as String: kCVPixelFormatType_32ARGB,
                                kCVPixelBufferWidthKey as String: width, kCVPixelBufferHeightKey as String: height])
writer.add(input)
writer.startWriting()
writer.startSession(atSourceTime: .zero)

func buffer(_ path: String) -> CVPixelBuffer? {
  guard let img = NSImage(contentsOfFile: path), let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else { return nil }
  var pb: CVPixelBuffer?
  CVPixelBufferCreate(nil, width, height, kCVPixelFormatType_32ARGB, nil, &pb)
  guard let buf = pb else { return nil }
  CVPixelBufferLockBaseAddress(buf, [])
  let ctx = CGContext(data: CVPixelBufferGetBaseAddress(buf), width: width, height: height, bitsPerComponent: 8,
                      bytesPerRow: CVPixelBufferGetBytesPerRow(buf), space: CGColorSpaceCreateDeviceRGB(),
                      bitmapInfo: CGImageAlphaInfo.noneSkipFirst.rawValue)
  ctx?.draw(cg, in: CGRect(x: 0, y: 0, width: width, height: height))
  CVPixelBufferUnlockBaseAddress(buf, [])
  return buf
}

let fps: Int32 = 30
var frame: Int64 = 0
for (path, seconds) in items {
  guard let buf = buffer(path) else { print("skip \(path)"); continue }
  let count = max(1, Int(seconds * Double(fps)))
  for _ in 0..<count {
    while !input.isReadyForMoreMediaData { Thread.sleep(forTimeInterval: 0.005) }
    adaptor.append(buf, withPresentationTime: CMTime(value: frame, timescale: fps))
    frame += 1
  }
}
input.markAsFinished()
let sem = DispatchSemaphore(value: 0)
writer.finishWriting { sem.signal() }
sem.wait()
print(writer.status == .completed ? "ok \(outURL.path)" : "failed: \(String(describing: writer.error))")
