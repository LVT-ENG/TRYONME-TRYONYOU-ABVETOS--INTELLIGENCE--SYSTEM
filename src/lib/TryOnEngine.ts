import { Pose, Results as PoseResults } from "@mediapipe/pose";
import { SelfieSegmentation, Results as SegmentationResults } from "@mediapipe/selfie_segmentation";

export interface TryOnResult {
  canvas: HTMLCanvasElement;
  landmarks?: PoseResults;
  segmentation?: SegmentationResults;
}

export class TryOnEngine {
  private pose: Pose;
  private segmentation: SelfieSegmentation;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private isReady: boolean = false;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d")!;

    // Initialize Pose detection (for warping anchors)
    this.pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });
    this.pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    // Initialize Segmentation (for occlusion masking)
    this.segmentation = new SelfieSegmentation({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
    });
    this.segmentation.setOptions({
      modelSelection: 1, // 1 = landscape model (better quality)
    });

    this.isReady = true;
  }

  async processImage(imageElement: HTMLImageElement): Promise<TryOnResult> {
    if (!this.isReady) throw new Error("Engine not ready");

    // Resize canvas to match image
    this.canvas.width = imageElement.naturalWidth;
    this.canvas.height = imageElement.naturalHeight;

    // 1. Get Pose Landmarks
    let poseResults: PoseResults | undefined;
    this.pose.onResults((results) => {
      poseResults = results;
    });
    await this.pose.send({ image: imageElement });

    // 2. Get Segmentation Mask
    let segResults: SegmentationResults | undefined;
    this.segmentation.onResults((results) => {
      segResults = results;
    });
    await this.segmentation.send({ image: imageElement });

    return {
      canvas: this.canvas, // We will draw on this later
      landmarks: poseResults,
      segmentation: segResults,
    };
  }

  // Advanced Composition Pipeline
  compose(
    baseImage: HTMLImageElement,
    garmentImage: HTMLImageElement,
    segmentation: SegmentationResults,
    landmarks: PoseResults
  ): HTMLCanvasElement {
    const width = baseImage.naturalWidth;
    const height = baseImage.naturalHeight;

    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx.clearRect(0, 0, width, height);

    // Step 1: Draw Base Model
    this.ctx.drawImage(baseImage, 0, 0, width, height);

    // Step 2: Calculate Garment Position based on Landmarks
    // (Simplified warping logic for demo: Scale & Position based on shoulders)
    if (landmarks && landmarks.poseLandmarks) {
      const leftShoulder = landmarks.poseLandmarks[11];
      const rightShoulder = landmarks.poseLandmarks[12];
      
      // Calculate shoulder width in pixels
      const shoulderWidth = Math.abs(leftShoulder.x - rightShoulder.x) * width;
      const centerX = ((leftShoulder.x + rightShoulder.x) / 2) * width;
      const centerY = ((leftShoulder.y + rightShoulder.y) / 2) * height;

      // Heuristic scaling for garments
      // A standard t-shirt is roughly 2.5x shoulder width
      const garmentWidth = shoulderWidth * 2.8; 
      const garmentHeight = garmentWidth * (garmentImage.naturalHeight / garmentImage.naturalWidth);
      
      const garmentX = centerX - (garmentWidth / 2);
      const garmentY = centerY - (garmentHeight * 0.15); // Offset slightly up for neck

      // Step 3: Draw Garment (Warped/Scaled)
      this.ctx.drawImage(garmentImage, garmentX, garmentY, garmentWidth, garmentHeight);
    } else {
      // Fallback if no pose detected: Center overlay
      this.ctx.drawImage(garmentImage, 0, 0, width, height);
    }

    // Step 4: Apply Segmentation Mask (Optional: for tucking in or occlusion)
    // For "Try-On", we usually want the garment ON TOP, so we don't mask it out unless
    // we are doing "tucking" (shirt inside pants).
    // For this demo, we keep it simple: Garment over Body.

    return this.canvas;
  }
}
