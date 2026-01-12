import { PoseLandmarker, PoseLandmarkerResult, DrawingUtils } from "@mediapipe/tasks-vision";
import { FilesetResolver } from "@mediapipe/tasks-vision";

export interface BodyMeasurements {
  shoulderWidth: number;
  chestWidth: number;
  waistWidth: number;
  hipWidth: number;
  inseam: number;
  armLength: number;
}

export class TryOnEngine {
  private poseLandmarker: PoseLandmarker | null = null;
  private videoElement: HTMLVideoElement | null = null;
  private canvasElement: HTMLCanvasElement | null = null;
  private animationFrameId: number | null = null;
  private onMeasurementsUpdate: ((measurements: BodyMeasurements) => void) | null = null;
  private userHeightCm: number = 170; // Default height for calibration
  private drawingUtils: DrawingUtils | null = null;

  constructor() {}

  async initialize(
    video: HTMLVideoElement, 
    canvas: HTMLCanvasElement,
    onMeasurements?: (m: BodyMeasurements) => void
  ) {
    this.videoElement = video;
    this.canvasElement = canvas;
    if (onMeasurements) this.onMeasurementsUpdate = onMeasurements;

    const ctx = this.canvasElement.getContext("2d");
    if (ctx) {
      this.drawingUtils = new DrawingUtils(ctx);
    }

    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );

    this.poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose/pose_landmarker/float16/1/pose_landmarker.task`,
        delegate: "GPU"
      },
      runningMode: "VIDEO",
      numPoses: 1
    });

    this.startDetection();
  }

  setUserHeight(heightCm: number) {
    this.userHeightCm = heightCm;
  }

  private startDetection() {
    if (!this.videoElement || !this.poseLandmarker) return;

    const detect = async () => {
      if (this.videoElement && this.videoElement.currentTime > 0) {
        const results = this.poseLandmarker!.detectForVideo(
          this.videoElement,
          performance.now()
        );
        
        this.drawResults(results);
        this.calculateMeasurements(results);
      }
      this.animationFrameId = requestAnimationFrame(detect);
    };

    detect();
  }

  private calculateMeasurements(results: PoseLandmarkerResult) {
    if (!results.landmarks || results.landmarks.length === 0) return;

    const landmarks = results.landmarks[0];
    
    // Key landmarks indices (MediaPipe Pose)
    // 11: left shoulder, 12: right shoulder
    // 23: left hip, 24: right hip
    // 13: left elbow, 14: right elbow
    // 15: left wrist, 16: right wrist
    // 25: left knee, 26: right knee
    // 27: left ankle, 28: right ankle
    // 0: nose, 31: left foot index, 32: right foot index

    // 1. Calibration: Calculate pixel height of the person
    // Approximate full body height from nose to mid-point between ankles
    // Note: This is a simplified approximation. A full T-pose calibration is better.
    const nose = landmarks[0];
    const leftAnkle = landmarks[27];
    const rightAnkle = landmarks[28];
    const midAnkleY = (leftAnkle.y + rightAnkle.y) / 2;
    
    // Height in normalized coordinates (0-1)
    // Adding ~10% for head top to nose distance
    const bodyHeightNorm = (midAnkleY - nose.y) * 1.1; 
    
    if (bodyHeightNorm <= 0) return;

    // Pixels per cm ratio
    const pixelsPerCm = bodyHeightNorm / this.userHeightCm; // This is actually "normalized units per cm"

    // Helper to get distance in cm
    const getDistCm = (idx1: number, idx2: number) => {
      const p1 = landmarks[idx1];
      const p2 = landmarks[idx2];
      // Euclidean distance in 3D (using world landmarks would be better for real 3D, 
      // but here we use normalized 2D for screen projection + depth approximation if available)
      // For simplicity in this MVP, we use 2D normalized distance / ratio
      const distNorm = Math.sqrt(
        Math.pow(p1.x - p2.x, 2) + 
        Math.pow(p1.y - p2.y, 2)
      );
      return (distNorm / pixelsPerCm);
    };

    // Calculate measurements
    const shoulderWidth = getDistCm(11, 12);
    const hipWidth = getDistCm(23, 24);
    
    // Chest is approx mid-point between shoulders and hips, often wider than waist
    // We simulate chest width as slightly larger than waist (which is close to hip width in this simple model)
    // Better approximation: average of shoulder and hip * 0.9 for waist, * 1.1 for chest
    const waistWidth = hipWidth * 0.85; 
    const chestWidth = shoulderWidth * 0.9;

    // Arm length: Shoulder to Wrist
    const leftArm = getDistCm(11, 13) + getDistCm(13, 15);
    const rightArm = getDistCm(12, 14) + getDistCm(14, 16);
    const armLength = (leftArm + rightArm) / 2;

    // Inseam: Hip to Ankle
    const leftLeg = getDistCm(23, 27);
    const rightLeg = getDistCm(24, 28);
    const inseam = (leftLeg + rightLeg) / 2;

    const measurements: BodyMeasurements = {
      shoulderWidth: parseFloat(shoulderWidth.toFixed(1)),
      chestWidth: parseFloat(chestWidth.toFixed(1)),
      waistWidth: parseFloat(waistWidth.toFixed(1)),
      hipWidth: parseFloat(hipWidth.toFixed(1)),
      inseam: parseFloat(inseam.toFixed(1)),
      armLength: parseFloat(armLength.toFixed(1))
    };

    if (this.onMeasurementsUpdate) {
      this.onMeasurementsUpdate(measurements);
    }
  }

  private drawResults(results: PoseLandmarkerResult) {
    if (!this.canvasElement || !results.landmarks || results.landmarks.length === 0) return;

    const ctx = this.canvasElement.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    
    // Draw golden points
    ctx.fillStyle = "#D4AF37"; // Gold
    ctx.strokeStyle = "#E5E4E2"; // Silver
    ctx.lineWidth = 2;

    const landmarks = results.landmarks[0];
    
    // Draw connections manually to have full control over style
    const connections = PoseLandmarker.POSE_CONNECTIONS;
    for (const conn of connections) {
      const start = landmarks[conn.start];
      const end = landmarks[conn.end];
      
      ctx.beginPath();
      ctx.moveTo(start.x * this.canvasElement.width, start.y * this.canvasElement.height);
      ctx.lineTo(end.x * this.canvasElement.width, end.y * this.canvasElement.height);
      ctx.stroke();
    }

    // Draw points
    for (const lm of landmarks) {
      ctx.beginPath();
      ctx.arc(lm.x * this.canvasElement.width, lm.y * this.canvasElement.height, 4, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.poseLandmarker) {
      this.poseLandmarker.close();
    }
  }
}
