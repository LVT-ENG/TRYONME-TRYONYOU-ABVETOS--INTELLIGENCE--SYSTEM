import {
  Pose,
  Results as PoseResults,
  Options as PoseOptions
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
    } as PoseOptions);

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

  async processImage(image: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement): Promise<TryOnResult> {
    if (!this.isReady) throw new Error("Engine not ready");

    // Resize canvas
    this.canvas.width = image.width;
    this.canvas.height = image.height;
    this.ctx.drawImage(image, 0, 0);

    // Note: send() returns Promise<void>, results are handled via onResults callback.
    // This is a simplified synchronous-like wrapper for demo purposes.
    // In a real real-time loop, we would set onResults once and just call send().
    
    return {
      canvas: this.canvas,
    };
  }

  // Helper to set callbacks
  onPoseResults(callback: (results: PoseResults) => void) {
    this.pose.onResults(callback);
  }

  onSegmentationResults(callback: (results: SegmentationResults) => void) {
    this.segmentation.onResults(callback);
  }

  async send(image: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement) {
    await this.pose.send({ image: image as HTMLImageElement }); // Cast for compatibility
    // Segmentation can run in parallel or sequence depending on performance needs
    // await this.segmentation.send({ image: image as HTMLImageElement });
  }
}
