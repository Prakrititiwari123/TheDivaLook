import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_right,#ffdce9,#fff7fb_45%,#dcfff7_100%)] px-6 py-14 md:px-10">
      <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-2 md:items-center">
        <div className="animate-fade-up">
          <p className="inline-flex items-center rounded-full border border-[#f3d3e3] bg-white px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#FF3E9B]">
            Beauty Meets Technology
          </p>
          <h1 className="mt-5 text-4xl font-black leading-tight text-[#1f2937] md:text-6xl">
            Build Your
            <span className="block bg-linear-to-r from-[#FF3E9B] to-[#3A8B95] bg-clip-text text-transparent">
              Signature Diva Look
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-[#4b5563] md:text-lg">
            Discover trending products, preview shades instantly, and create a routine that fits your style, tone, and mood.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/products"
              className="animate-pop-in rounded-xl bg-[#FF3E9B] px-7 py-3 font-semibold text-white shadow-lg shadow-[#ff3e9b33] transition hover:-translate-y-1 hover:bg-[#e6358c]"
            >
              Shop Makeup
            </Link>
            <Link
              to="/try-makeup"
              className="rounded-xl border-2 border-[#3A8B95] bg-white px-7 py-3 font-semibold text-[#3A8B95] transition hover:-translate-y-1 hover:bg-[#3A8B95] hover:text-white"
            >
              Try Virtual Makeup
            </Link>
          </div>
        </div>

        <div className="animate-float-soft rounded-3xl border border-white/80 bg-white/70 p-6 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-4">
            {["Velvet Rose", "Nude Aura", "Coral Pop", "Berry Night"].map((shade, index) => (
              <div
                key={shade}
                className="interactive-card rounded-2xl border border-[#f3d3e3] bg-white p-4"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className="mb-2 h-16 rounded-xl bg-linear-to-br from-[#FF88BA] via-[#ffd0e3] to-[#66D0BC]" />
                <p className="font-semibold text-[#1f2937]">{shade}</p>
                <p className="text-sm text-[#6b7280]">Match confidence 94%</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 grid w-full max-w-6xl gap-5 md:grid-cols-3">
        {[
          { title: "Skin Tone Match", desc: "Smart recommendations by undertone and finish." },
          { title: "Trending Kits", desc: "Shop looks curated by creators and artists." },
          { title: "Virtual Try-On", desc: "Test shades on your photo in seconds." }
        ].map((item, index) => (
          <div
            key={item.title}
            className="interactive-card animate-fade-up rounded-2xl border border-[#f3d3e3] bg-white/90 p-5 shadow-sm"
            style={{ animationDelay: `${index * 130}ms` }}
          >
            <h3 className="text-lg font-bold text-[#1f2937]">{item.title}</h3>
            <p className="mt-2 text-sm text-[#6b7280]">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;