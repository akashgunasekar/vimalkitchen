import Foundation
import AppKit

let inputPath = "assets/images/logo/vimal-brand-logo-full.png"
guard let image = NSImage(contentsOfFile: inputPath) else {
    print("Failed to load image")
    exit(1)
}

guard let rep = image.representations.first as? NSBitmapImageRep else {
    print("Failed to get bitmap representation")
    exit(1)
}

let width = rep.pixelsWide
let height = rep.pixelsHigh
print("Image size: \(width) x \(height)")

// Crop the logo area:
// From y = 10 to y = 430, x = 60 to x = 964
let cropX = 70
let cropY = 15
let cropW = 884
let cropH = 415

// In Cocoa, coordinate origin (0,0) is bottom-left, so:
let cocoaY = height - (cropY + cropH)

let cropRect = NSRect(x: cropX, y: cocoaY, width: cropW, height: cropH)
guard let cgImage = rep.cgImage?.cropping(to: cropRect) else {
    print("Failed to crop CGImage")
    exit(1)
}

let croppedRep = NSBitmapImageRep(cgImage: cgImage)
guard let pngData = croppedRep.representation(using: .png, properties: [:]) else {
    print("Failed to create PNG data")
    exit(1)
}

let outputPath = "assets/images/logo/vimal-logo.png"
try! pngData.write(to: URL(fileURLWithPath: outputPath))
print("Successfully saved cropped logo to \(outputPath)")
