import { runFullAvatarPipeline } from "../../pipeline/avatarPipeline";

export default async function handler(req: any, res: any) {
  try {
    const { image, userId, stylePreferences } = req.body;

    const result = await runFullAvatarPipeline({
      image: Buffer.from(image, "base64"),
      userId,
      stylePreferences
    });

    res.status(200).json(result);
  } catch (error: any) {
    console.error("Avatar Pipeline Error:", error);
    res.status(500).json({ error: error.message });
  }
}
