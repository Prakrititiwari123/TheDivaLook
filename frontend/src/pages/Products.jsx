import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data || []);
      } catch (fetchError) {
        setError("Unable to load products right now. Please try again.");
        console.log(fetchError);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const brands = useMemo(() => {
    const uniqueBrands = new Set(products.map((product) => product.brand));
    return ["All", ...uniqueBrands];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const bySearch = `${product.name} ${product.brand}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const byBrand = brandFilter === "All" || product.brand === brandFilter;
      return bySearch && byBrand;
    });
  }, [brandFilter, products, searchTerm]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ffe3ef,#fff7fb_45%,#d7fff4)] px-5 py-12 md:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="animate-fade-up md:flex md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-black text-[#1f2937] md:text-5xl">Makeup Products</h1>
            <p className="mt-2 text-[#4b5563]">Browse, filter, and discover your next favorite look.</p>
          </div>
          <p className="mt-4 rounded-full border border-[#f3d3e3] bg-white px-4 py-2 text-sm font-semibold text-[#FF3E9B] md:mt-0">
            {filteredProducts.length} items found
          </p>
        </div>

        <div className="mt-8 grid gap-4 rounded-2xl border border-white/80 bg-white/85 p-4 shadow-lg md:grid-cols-[2fr_1fr] md:p-5">
          <input
            type="text"
            placeholder="Search product or brand"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-xl border border-[#f3d3e3] px-4 py-3 text-sm text-[#1f2937] outline-none transition focus:border-[#FF3E9B] focus:ring-2 focus:ring-[#ff3e9b33]"
          />
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="rounded-xl border border-[#f3d3e3] px-4 py-3 text-sm text-[#1f2937] outline-none transition focus:border-[#3A8B95] focus:ring-2 focus:ring-[#3a8b9522]"
          >
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {loading && (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array.from({ length: 6 })].map((_, index) => (
              <div key={index} className="shimmer-surface h-64 rounded-2xl border border-[#f3d3e3]" />
            ))}
          </div>
        )}

        {!loading && error && (
          <p className="mt-8 rounded-xl bg-[#fff1f5] px-4 py-3 text-sm font-medium text-[#be123c]">{error}</p>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="mt-10 rounded-2xl border border-[#f3d3e3] bg-white p-10 text-center">
            <h3 className="text-xl font-bold text-[#1f2937]">No matches found</h3>
            <p className="mt-2 text-sm text-[#6b7280]">Try a different search or clear the brand filter.</p>
          </div>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product, index) => (
              <div
                key={product._id}
                className="interactive-card animate-fade-up group rounded-2xl border border-[#f3d3e3] bg-white p-4 shadow-sm"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-44 w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="mt-4 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-[#1f2937]">{product.name}</h3>
                    <p className="text-sm text-[#6b7280]">{product.brand}</p>
                  </div>
                  <span className="rounded-full bg-[#fff1f6] px-3 py-1 text-sm font-semibold text-[#FF3E9B]">
                    Rs {product.price}
                  </span>
                </div>

                <button className="mt-4 w-full rounded-xl border border-[#3A8B95] py-2 text-sm font-semibold text-[#3A8B95] transition hover:bg-[#3A8B95] hover:text-white">
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

  );
};

export default Products;