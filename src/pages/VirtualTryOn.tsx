import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, X, SwitchCamera, Download, Loader2, AlertCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Link } from "wouter";

export default function VirtualTryOn() {
  const { user, isAuthenticated } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch wardrobe items
  const { data: wardrobeItems = [], isLoading: itemsLoading } = trpc.wardrobe.getItems.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  // Start camera
  const startCamera = async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }

      setStream(mediaStream);
      setIsCameraActive(true);
      toast.success("Camera activated");
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Unable to access camera. Please check permissions.");
      toast.error("Camera access denied. Please allow camera permissions.");
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setIsCameraActive(false);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      toast.info("Camera stopped");
    }
  };

  // Switch camera (front/back)
  const switchCamera = async () => {
    stopCamera();
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
    setTimeout(() => startCamera(), 100);
  };

  // Capture photo
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsCapturing(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `tryonyou-tryon-${Date.now()}.jpg`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success("Photo captured and saved!");
      }
      setIsCapturing(false);
    }, "image/jpeg");
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>Please sign in to use the Virtual Try-On feature</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button className="w-full">Go to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm">
                ← Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900">Virtual Try-On</h1>
            </div>
          </div>
          <span className="text-sm text-slate-600">Welcome, {user?.name || "User"}!</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Camera View */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle>Camera View</CardTitle>
                <CardDescription>
                  {isCameraActive
                    ? "Select an item from your wardrobe to try it on virtually"
                    : "Start your camera to begin the virtual try-on experience"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative bg-slate-900 aspect-video flex items-center justify-center">
                  {error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-white p-8 text-center z-10">
                      <AlertCircle className="w-16 h-16 mb-4 text-red-400" />
                      <p className="text-lg mb-2">{error}</p>
                      <p className="text-sm text-slate-400 mb-4">
                        Please enable camera permissions in your browser settings
                      </p>
                      <Button onClick={startCamera} variant="secondary">
                        Try Again
                      </Button>
                    </div>
                  )}

                  {!isCameraActive && !error && (
                    <div className="flex flex-col items-center justify-center text-white">
                      <Camera className="w-20 h-20 mb-4 text-slate-400" />
                      <p className="text-lg mb-4">Camera is off</p>
                      <Button onClick={startCamera} size="lg" className="gap-2">
                        <Camera className="w-5 h-5" />
                        Start Camera
                      </Button>
                    </div>
                  )}

                  <video
                    ref={videoRef}
                    className={`w-full h-full object-cover ${isCameraActive ? "block" : "hidden"}`}
                    playsInline
                    autoPlay
                    muted
                  />

                  {/* Overlay for selected item */}
                  {isCameraActive && selectedItem && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm border-2 border-purple-500 rounded-lg p-4">
                        <p className="text-white text-sm font-medium">Item overlay would appear here</p>
                      </div>
                    </div>
                  )}

                  {/* Camera Controls */}
                  {isCameraActive && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                      <Button
                        onClick={switchCamera}
                        variant="secondary"
                        size="lg"
                        className="rounded-full w-14 h-14 p-0"
                      >
                        <SwitchCamera className="w-6 h-6" />
                      </Button>

                      <Button
                        onClick={capturePhoto}
                        disabled={isCapturing}
                        size="lg"
                        className="rounded-full w-16 h-16 p-0 bg-white hover:bg-slate-100"
                      >
                        {isCapturing ? (
                          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                        ) : (
                          <div className="w-12 h-12 rounded-full border-4 border-purple-600" />
                        )}
                      </Button>

                      <Button
                        onClick={stopCamera}
                        variant="destructive"
                        size="lg"
                        className="rounded-full w-14 h-14 p-0"
                      >
                        <X className="w-6 h-6" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Hidden canvas for capture */}
                <canvas ref={canvasRef} className="hidden" />
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">How to Use</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-600">
                <p>1. Click "Start Camera" to activate your device camera</p>
                <p>2. Select an item from your wardrobe on the right</p>
                <p>3. Position yourself in the camera view</p>
                <p>4. Use the capture button to save your try-on photo</p>
                <p>5. Switch between front and back camera as needed</p>
              </CardContent>
            </Card>
          </div>

          {/* Wardrobe Items Selector */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Your Wardrobe</CardTitle>
                <CardDescription>Select an item to try on</CardDescription>
              </CardHeader>
              <CardContent>
                {itemsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                  </div>
                ) : wardrobeItems.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-slate-500 mb-4">No items in your wardrobe yet</p>
                    <Link href="/smart-wardrobe">
                      <Button variant="outline" size="sm">
                        Add Items
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[600px] overflow-y-auto">
                    {wardrobeItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedItem(item.id)}
                        className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                          selectedItem === item.id
                            ? "border-purple-500 bg-purple-50"
                            : "border-slate-200 hover:border-purple-300"
                        }`}
                      >
                        <div className="font-medium text-slate-900">{item.name}</div>
                        <div className="text-sm text-slate-600">
                          {item.category} • {item.color || "N/A"}
                        </div>
                        {item.size && <div className="text-xs text-slate-500">Size: {item.size}</div>}
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
