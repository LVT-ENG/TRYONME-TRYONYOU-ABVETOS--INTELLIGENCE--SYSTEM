import { BaoIdentityData } from "./types";

export async function runBaoIdentity(
  image: Buffer | string,
  userId: string
): Promise<BaoIdentityData> {
  const embedding = Array.from({ length: 128 }, () => Math.random());

  return {
    userId,
    embedding
  };
}
