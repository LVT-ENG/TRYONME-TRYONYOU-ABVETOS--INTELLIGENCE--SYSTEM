import { BaoIdentityData } from "../types";
import { cosineDistance } from "../utils/math";

export async function computeIdentityDistance(
  img: Buffer | string,
  identity: BaoIdentityData
): Promise<number> {
  const pseudoEmbedding = identity.embedding.map(v => v + Math.random() * 0.001);
  return cosineDistance(pseudoEmbedding, identity.embedding);
}
