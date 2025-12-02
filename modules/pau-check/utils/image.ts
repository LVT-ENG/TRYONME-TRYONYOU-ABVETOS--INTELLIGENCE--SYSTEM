export async function normalizeImage(img: Buffer | string) {
  if (!img) throw new Error("PAU-CHECK: No image provided");
  return img;
}
