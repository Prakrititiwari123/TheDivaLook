import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80";
const CART_STORAGE_KEY = "divaCartItems";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4500";

const getProductTimestamp = (product) => {
  if (product?.createdAt) {
    const createdAtTime = new Date(product.createdAt).getTime();
    if (!Number.isNaN(createdAtTime)) {
      return createdAtTime;
    }
  }

  if (typeof product?._id === "string" && product._id.length >= 8) {
    const objectIdPrefix = product._id.substring(0, 8);
    const parsed = Number.parseInt(objectIdPrefix, 16);
    if (!Number.isNaN(parsed)) {
      return parsed * 1000;
    }
  }

  return 0;
};

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isTopRatedMode, setIsTopRatedMode] = useState(false);
  const [addedItems, setAddedItems] = useState({});

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setIsLoadingProducts(true);
        const res = await axios.get(`${API_BASE_URL}/api/products`);
        const products = Array.isArray(res.data) ? res.data : [];
        const topRatedProducts = products
          .filter((product) => typeof product.rating === "number")
          .sort((a, b) => (b.rating || 0) - (a.rating || 0));

        if (topRatedProducts.length > 0) {
          setFeaturedProducts(topRatedProducts.slice(0, 4));
          setIsTopRatedMode(true);
        } else {
          const latestProducts = [...products]
            .sort((a, b) => getProductTimestamp(b) - getProductTimestamp(a))
            .slice(0, 4);
          setFeaturedProducts(latestProducts);
          setIsTopRatedMode(false);
        }
      } catch (error) {
        console.log(error);
        setFeaturedProducts([]);
        setIsTopRatedMode(false);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleAddToCart = (product) => {
    if (!product) {
      return;
    }

    const productId = product._id || product.name;

    try {
      const existingCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "[]");
      const nextCart = Array.isArray(existingCart) ? [...existingCart] : [];
      const existingIndex = nextCart.findIndex((item) => item.id === productId);

      if (existingIndex >= 0) {
        nextCart[existingIndex].quantity = (nextCart[existingIndex].quantity || 1) + 1;
      } else {
        nextCart.push({
          id: productId,
          name: product.name || "Beauty Product",
          brand: product.brand || "Diva Collection",
          price: product.price || 0,
          image: product.image || FALLBACK_IMAGE,
          quantity: 1
        });
      }

      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextCart));

      setAddedItems((prev) => ({ ...prev, [productId]: true }));
      setTimeout(() => {
        setAddedItems((prev) => ({ ...prev, [productId]: false }));
      }, 1400);
    } catch (error) {
      console.log(error);
    }
  };

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

      <section className="mx-auto mt-16 w-full max-w-6xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-[#1f2937] md:text-3xl">Featured Products</h2>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#6b7280]">
              {isTopRatedMode ? "Top Rated Picks" : "Latest Arrivals"}
            </p>
          </div>
          <Link
            to="/products"
            className="rounded-xl border border-[#3A8B95] px-4 py-2 text-sm font-semibold text-[#3A8B95] transition hover:bg-[#3A8B95] hover:text-white"
          >
            View All
          </Link>
        </div>

        {isLoadingProducts && (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array.from({ length: 4 })].map((_, index) => (
              <div key={index} className="shimmer-surface h-72 rounded-2xl border border-[#f3d3e3]" />
            ))}
          </div>
        )}

        {!isLoadingProducts && featuredProducts.length === 0 && (
          <div className="mt-6 rounded-2xl border border-[#f3d3e3] bg-white/90 p-6">
            <p className="text-sm font-medium text-[#6b7280]">Products will appear here after they are added.</p>
          </div>
        )}

        {!isLoadingProducts && featuredProducts.length > 0 && (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <article
                key={product._id || `${product.name}-${index}`}
                className="interactive-card animate-fade-up group overflow-hidden rounded-2xl border border-[#f3d3e3] bg-white/95 shadow-sm"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <img
                  src={product.image || FALLBACK_IMAGE}
                  alt={product.name || "Product image"}
                  className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }}
                />
                <div className="p-4">
                  <p className="text-sm font-semibold text-[#6b7280]">{product.brand || "Diva Collection"}</p>
                  <h3 className="mt-1 text-base font-bold text-[#1f2937]">{product.name || "Beauty Product"}</h3>
                  <p className="mt-2 text-sm font-semibold text-[#FF3E9B]">Rs {product.price ?? "--"}</p>
                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className="mt-3 rounded-lg border border-[#3A8B95] px-3 py-1.5 text-xs font-semibold text-[#3A8B95] transition hover:bg-[#3A8B95] hover:text-white"
                  >
                    {addedItems[product._id || product.name] ? "Added" : "Add to Cart"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;