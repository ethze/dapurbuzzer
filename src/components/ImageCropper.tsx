"use client";

import Cropper, { Area } from "react-easy-crop";
import { useState, useCallback } from "react";

type Props = {
  file: File;
  onCancel: () => void;
  onCropDone: (croppedBlob: Blob, previewUrl: string) => void;
};

export default function ImageCropper({ file, onCancel, onCropDone }: Props) {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImg = async () => {
    if (!croppedAreaPixels) return;

    const image = await createImage(URL.createObjectURL(file));
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return new Promise<void>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const previewUrl = URL.createObjectURL(blob);
          onCropDone(blob, previewUrl);
        }
        resolve();
      }, "image/jpeg");
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div style={{ position: "relative", width: "90vw", height: "70vh" }}>
        <Cropper
          image={URL.createObjectURL(file)}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>

      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <button
          onClick={onCancel}
          style={{
            backgroundColor: "#e5e7eb",
            color: "#374151",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            fontWeight: "600",
          }}
        >
          Cancel
        </button>

        <button
          onClick={getCroppedImg}
          style={{
            backgroundColor: "#7c3aed",
            color: "white",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            fontWeight: "600",
          }}
        >
          Crop & Save
        </button>
      </div>
    </div>
  );
}

async function createImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (err) => reject(err));
    image.src = url;
  });
}

