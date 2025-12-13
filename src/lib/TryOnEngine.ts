import {
  Pose,
  Results as PoseResults,
} from "@mediapipe/pose";

import {
  SelfieSegmentation,
  Results as SegmentationResults,
} from "@mediapipe/selfie_segmentation";

export interface TryOnResult {
  canvas: HTMLCanvasElement;
  landmarks?: PoseResults;
  segmentation?: SegmentationResults;
}

export default class TryOnEngine {
  private pose: Pose;
  private segmentation: SelfieSegmentation;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private isReady: boolean = false;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d")!;

    // ===========================
    //  🔥 INIT POSE
    // ===========================
    this.pose = new Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    this.pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    // ===========================
    //  🔥 INIT SEGMENTATION
    // ===========================
    this.segmentation = new SelfieSegmentation({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
    });

    this.segmentation.setOptions({
      modelSelection: 1,
    });

    this.isReady = true;
  }

  async processImage(image: HTMLImageElement): Promise<TryOnResult> {
    if (!this.isReady) throw new Error("Engine not ready");

    // Resize canvas
    this.canvas.width = image.width;
    this.canvas.height = image.height;
    this.ctx.drawImage(image, 0, 0);

    const poseResults = await this.pose.send({ image });
    const segResults = await this.segmentation.send({ image });

    return {
      canvas: this.canvas,
      landmarks: poseResults,
      segmentation: segResults,
    };
  }

  compose(
    modelImg: HTMLImageElement,
    garmentImg: HTMLImageElement,
    segmentation?: SegmentationResults,
    landmarks?: PoseResults
  ) {
    this.canvas.width = modelImg.width;
    this.canvas.height = modelImg.height;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw base model
    this.ctx.drawImage(modelImg, 0, 0);

    // Simple overlay (placeholder for warp)
    this.ctx.drawImage(
      garmentImg,
      modelImg.width * 0.32,
      modelImg.height * 0.25,
      garmentImg.width * 0.6,
      garmentImg.height * 0.6
    );

    return this.canvas;
  }
}