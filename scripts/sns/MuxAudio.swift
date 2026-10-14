// 動画に、音声ファイルを、指定した秒数の位置に重ねる（macOS標準の AVFoundation）。
// 使い方: MuxAudio <出力.mp4> <入力.mp4> <リスト.txt>   リストの各行: 開始秒<TAB>音声ファイル（aiff/wav/m4a）
import AVFoundation
import Foundation

let args = CommandLine.arguments
guard args.count == 4 else { fputs("usage: MuxAudio out.mp4 in.mp4 list.txt\n", stderr); exit(2) }
let outURL = URL(fileURLWithPath: args[1])
let inURL = URL(fileURLWithPath: args[2])
let lines = try String(contentsOfFile: args[3], encoding: .utf8).split(separator: "\n").map(String.init)
try? FileManager.default.removeItem(at: outURL)

let video = AVURLAsset(url: inURL)
let comp = AVMutableComposition()
let sem = DispatchSemaphore(value: 0)
Task {
  do {
    let dur = try await video.load(.duration)
    guard let vsrc = try await video.loadTracks(withMediaType: .video).first,
          let vtrack = comp.addMutableTrack(withMediaType: .video, preferredTrackID: kCMPersistentTrackID_Invalid) else { exit(3) }
    try vtrack.insertTimeRange(CMTimeRange(start: .zero, duration: dur), of: vsrc, at: .zero)
    vtrack.preferredTransform = try await vsrc.load(.preferredTransform)
    // 音声は、重ならないように、複数のトラックに分けて入れる
    var tracks: [AVMutableCompositionTrack] = []
    for l in lines {
      let p = l.split(separator: "\t", maxSplits: 1).map(String.init)
      guard p.count == 2, let start = Double(p[0]) else { continue }
      let a = AVURLAsset(url: URL(fileURLWithPath: p[1]))
      guard let asrc = try await a.loadTracks(withMediaType: .audio).first else { continue }
      let adur = try await a.load(.duration)
      let at = CMTime(seconds: start, preferredTimescale: 600)
      var tr: AVMutableCompositionTrack? = nil
      for t in tracks where t.segments.allSatisfy({ CMTimeRangeGetEnd($0.timeMapping.target).seconds <= start + 0.001 }) { tr = t; break }
      if tr == nil { tr = comp.addMutableTrack(withMediaType: .audio, preferredTrackID: kCMPersistentTrackID_Invalid); tracks.append(tr!) }
      let end = min(CMTimeAdd(at, adur), dur)
      try tr!.insertTimeRange(CMTimeRange(start: .zero, duration: CMTimeSubtract(end, at)), of: asrc, at: at)
    }
    guard let ex = AVAssetExportSession(asset: comp, presetName: AVAssetExportPresetHighestQuality) else { exit(4) }
    ex.outputURL = outURL
    ex.outputFileType = .mp4
    try await ex.export(to: outURL, as: .mp4)
    print("ok \(outURL.path)")
    sem.signal()
  } catch { fputs("error: \(error)\n", stderr); exit(1) }
}
sem.wait()
