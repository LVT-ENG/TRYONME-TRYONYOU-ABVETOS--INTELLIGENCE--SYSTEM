/**
 * PAU-CHECK Image Utilities
 * Image normalization and processing utilities
 */

/**
 * Normalizes image input to a consistent format
 * @param image Image as Buffer or string (base64 or file path)
 * @returns Normalized image Buffer or string
 */
export async function normalizeImage(
  image: Buffer | string
): Promise<Buffer | string> {
  if (!image) {
    throw new Error("PAU-CHECK: No image input provided.");
  }

  // If it's a Buffer, return as-is
  if (Buffer.isBuffer(image)) {
    return image;
  }

  // If it's a string, it could be base64 or a file path
  if (typeof image === "string") {
    // Check if it's a base64 string (data URL format)
    if (image.startsWith("data:image")) {
      const base64Data = image.split(",")[1];
      return Buffer.from(base64Data, "base64");
    }
    // Otherwise treat as file path or raw base64
    return image;
  }

  throw new Error("PAU-CHECK: Invalid image input type.");
}
