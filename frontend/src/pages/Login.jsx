import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setIsError(true);
      setMessage("Please enter both email and password.");
      return;
    }
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:4500/api/auth/login", {
        email,
        password
      });

      console.log(res.data);
      setIsError(false);
      setMessage("Login successful. Welcome back.");
      
    }
     catch (error) {
      console.log(error);
      setIsError(true);
      setMessage("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#f3d3e3] bg-white px-4 py-3 text-sm text-[#1f2937] outline-none transition focus:border-[#FF3E9B] focus:ring-2 focus:ring-[#ff3e9b33]";


  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#dcfff7,#fff7fb_45%,#ffe6f2)] px-5 py-16">
      <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
        <div className="animate-fade-up hidden md:block">
          <h1 className="text-5xl font-black leading-tight text-[#1f2937]">
            Welcome Back,
            <span className="block text-[#FF3E9B]">Diva</span>
          </h1>
          <p className="mt-4 max-w-md text-[#4b5563]">
            Continue your beauty journey with personalized product picks and quick virtual try-ons.
          </p>
          <div className="mt-8 space-y-3">
            {["Personalized shade suggestions", "Track your favorite looks", "Fast checkout and save carts"].map((item) => (
              <p key={item} className="interactive-card rounded-xl border border-[#f3d3e3] bg-white/80 px-4 py-3 text-sm text-[#374151]">
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="animate-pop-in rounded-3xl border border-white/70 bg-white/80 p-8 shadow-2xl backdrop-blur-xl md:p-10">
          <h2 className="text-3xl font-black text-[#1f2937]">Login</h2>
          <p className="mt-1 text-sm text-[#6b7280]">Access your account to continue.</p>

          <div className="mt-6 space-y-4">
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
            onClick={handleLogin}
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-[#FF3E9B] py-3 font-semibold text-white shadow-lg shadow-[#ff3e9b2e] transition hover:-translate-y-0.5 hover:bg-[#e6358c] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
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
            New here?{" "}
            <Link to="/register" className="font-semibold text-[#3A8B95] hover:text-[#2f6f76]">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>

  );
};

export default Login;