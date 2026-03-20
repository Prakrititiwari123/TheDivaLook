import React, { useMemo, useState } from "react";

const TryMakeup = () => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [selectedShade, setSelectedShade] = useState("Rose Bloom");
  const [intensity, setIntensity] = useState(55);

  const shades = useMemo(
    
    () => [
      { name: "Rose Bloom", color: "#ff4f8c" },
      { name: "Coral Crush", color: "#ff6f61" },
      { name: "Berry Muse", color: "#9b2c6f" },
      { name: "Nude Glow", color: "#c87d68" }
    ],
    []
  );

  const activeShade = shades.find((shade) => shade.name === selectedShade) || shades[0];

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl((previousUrl) => {
      if (previousUrl) {
        URL.revokeObjectURL(previousUrl);
      }
      return objectUrl;
    });
  };

  const overlayOpacity = Math.min(Math.max(intensity / 100, 0.2), 0.85);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,#d6fff3,#fff7fb_45%,#ffdbe9)] px-5 py-12 md:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="animate-fade-up text-center">
          <h1 className="text-4xl font-black text-[#1f2937] md:text-5xl">Virtual Makeup Try-On</h1>
          <p className="mx-auto mt-3 max-w-2xl text-[#4b5563]">
            Upload your photo, choose a shade, and adjust intensity for a quick virtual preview.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="animate-pop-in rounded-3xl border border-white/80 bg-white/85 p-5 shadow-2xl backdrop-blur-xl md:p-6">
            <div className="relative overflow-hidden rounded-2xl border border-[#f3d3e3] bg-[#f8fafc]">
              <div className="aspect-4/5 w-full">
                {previewUrl ? (
                  <img src={previewUrl} alt="Makeup preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="animate-pulse-ring h-16 w-16 rounded-full bg-white" />
                    <p className="mt-4 text-sm font-semibold text-[#1f2937]">Upload a photo to start preview</p>
                    <p className="text-xs text-[#6b7280]">JPG or PNG recommended</p>
                  </div>
                )}
              </div>
              {previewUrl && (
                <div
                  className="pointer-events-none absolute inset-0 transition"
                  style={{
                    background: `radial-gradient(circle at 52% 68%, ${activeShade.color} 0%, transparent 45%)`,
                    opacity: overlayOpacity
                  }}
                />
              )}
            </div>

            <label className="mt-5 inline-flex cursor-pointer rounded-xl bg-[#FF3E9B] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#e6358c]">
              Upload Photo
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
          </div>

          <div className="animate-fade-up rounded-3xl border border-white/80 bg-white/85 p-5 shadow-xl backdrop-blur-xl md:p-6">
            <h2 className="text-2xl font-black text-[#1f2937]">Customize Look</h2>
            <p className="mt-1 text-sm text-[#6b7280]">Select your shade and tune the intensity.</p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {shades.map((shade) => (
                <button
                  key={shade.name}
                  onClick={() => setSelectedShade(shade.name)}
                  className={`interactive-card rounded-xl border px-3 py-3 text-left transition ${
                    selectedShade === shade.name
                      ? "border-[#FF3E9B] bg-[#fff1f6]"
                      : "border-[#f3d3e3] bg-white"
                  }`}
                >
                  <span className="mb-2 block h-5 w-10 rounded-full" style={{ backgroundColor: shade.color }} />
                  <span className="text-sm font-semibold text-[#1f2937]">{shade.name}</span>
                </button>
              ))}
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-sm font-semibold text-[#1f2937]">Intensity</p>
                <p className="text-sm font-semibold text-[#3A8B95]">{intensity}%</p>
              </div>
              <input
                type="range"
                min="20"
                max="85"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full accent-[#FF3E9B]"
              />
            </div>

            <div className="mt-6 rounded-xl border border-[#d7f4ee] bg-[#ecfffb] p-4 text-sm text-[#115e59]">
              Pro tip: Use bright, front-facing photos for a more accurate virtual blend.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryMakeup;
