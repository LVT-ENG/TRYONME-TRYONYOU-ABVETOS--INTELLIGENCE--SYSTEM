import { runBaoIdentity } from "../modules/bao";
import { runTendency } from "../modules/tendency";
import { runRoyalHair } from "../modules/royal-hair";
import { runRoyalMakeup } from "../modules/royal-makeup";
import { runNanoRender } from "../modules/nano-render";
import { runPauCheck } from "../modules/pau-check";

export async function runFullAvatarPipeline(input: {
  image: Buffer | string;
  userId: string;
  stylePreferences?: any;
}) {
  console.log("STEP 1 — BAO: Identity Preservation");
  const baoResult = await runBaoIdentity(input.image, input.userId);

  console.log("STEP 2 — TENDENCY: Style Director");
  const styleData = await runTendency(input.stylePreferences);

  console.log("STEP 3 — ROYAL HAIR: Professional Hair Artist");
  const hairImage = await runRoyalHair(input.image);

  console.log("STEP 4 — ROYAL MAKEUP: Beauty Suite");
  const makeupImage = await runRoyalMakeup(hairImage);

  console.log("STEP 5 — NANO-RENDER ENGINE");
  const finalRender = await runNanoRender(makeupImage, styleData);

  console.log("STEP 6 — PAU-CHECK FINAL APPROVAL");
  const pauResult = await runPauCheck({
    avatarImage: finalRender,
    baoIdentityData: baoResult,
    styleData: styleData
  });

  return {
    baoResult,
    styleData,
    finalRender,
    pauResult
  };
}
