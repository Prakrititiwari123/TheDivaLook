import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      setIsError(true);
      setMessage("Please fill all fields to register.");
      return;
    }

    setLoading(true);
    setMessage("");

    try
     {
      const res = await axios.post("http://localhost:4500/api/auth/register", {
        name,
        email,
        password
      });

      console.log(res.data);
      setIsError(false);
      setMessage("Account created successfully. You can now login.");
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
      setIsError(true);
      setMessage("Registration failed. Please try another email.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#f3d3e3] bg-white px-4 py-3 text-sm text-[#1f2937] outline-none transition focus:border-[#FF3E9B] focus:ring-2 focus:ring-[#ff3e9b33]";


  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#d7fff4,#fff7fb_42%,#ffdce9)] px-5 py-16">
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
        <div className="animate-fade-up order-2 md:order-1">
          <h1 className="text-4xl font-black leading-tight text-[#1f2937] md:text-5xl">
            Start Your
            <span className="block text-[#FF3E9B]">Beauty Profile</span>
          </h1>
          <p className="mt-4 max-w-md text-[#4b5563]">
            Join The Diva Look to save your favorites, discover smart recommendations, and preview shades with confidence.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {["Save products", "Build routines", "Try trends", "Exclusive offers"].map((item) => (
              <div key={item} className="interactive-card rounded-xl border border-[#f3d3e3] bg-white/80 px-4 py-3 text-sm font-medium text-[#374151]">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="animate-pop-in order-1 rounded-3xl border border-white/70 bg-white/85 p-8 shadow-2xl backdrop-blur-xl md:order-2 md:p-10">
          <h2 className="text-3xl font-black text-[#1f2937]">Create Account</h2>
          <p className="mt-1 text-sm text-[#6b7280]">It only takes a minute.</p>

          <div className="mt-6 space-y-4">
            <input
              placeholder="Name"
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className={inputClass}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`${inputClass} pr-20`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-semibold text-[#3A8B95] transition hover:bg-[#ecfffb]"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-[#FF3E9B] py-3 font-semibold text-white shadow-lg shadow-[#ff3e9b2e] transition hover:-translate-y-0.5 hover:bg-[#e6358c] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creating account..." : "Register"}
          </button>

          {message && (
            <p
              className={`mt-4 rounded-lg px-3 py-2 text-sm ${
                isError ? "bg-[#fff1f5] text-[#be123c]" : "bg-[#ecfdf5] text-[#047857]"
              }`}
            >
              {message}
            </p>
          )}

          <p className="mt-6 text-sm text-[#6b7280]">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[#3A8B95] hover:text-[#2f6f76]">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>

  );
};

export default Register;