// macOS Vision で画像を OCR して JSON 行にする。文字化けする PDF(第56・57回)用。
// 使い方: swiftc -O ocr.swift -o ocr && ./ocr <画像フォルダ> > ocr.jsonl   (画像名: a_003.png のように 午前=a/午後=b + ページ番号)
import Foundation
import Vision
import AppKit

let dir = CommandLine.arguments[1]
let files = try FileManager.default.contentsOfDirectory(atPath: dir).filter { $0.hasSuffix(".png") }.sorted()
for f in files {
    guard let img = NSImage(contentsOfFile: dir + "/" + f),
          let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else { continue }
    let req = VNRecognizeTextRequest()
    req.recognitionLevel = .accurate
    req.recognitionLanguages = ["ja-JP", "en-US"]
    req.usesLanguageCorrection = false
    try VNImageRequestHandler(cgImage: cg).perform([req])
    for o in req.results ?? [] {
        guard let t = o.topCandidates(1).first?.string else { continue }
        let b = o.boundingBox  // 左下原点・正規化
        let d: [String: Any] = ["t": t, "f": f, "x": b.minX, "y": 1 - b.maxY, "w": b.width, "h": b.height]
        let data = try JSONSerialization.data(withJSONObject: d)
        print(String(data: data, encoding: .utf8)!)
    }
}
