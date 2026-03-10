import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/products" },
    { label: "Try Makeup", to: "/try-makeup" },
    { label: "Login", to: "/login" },
    { label: "Register", to: "/register" }
  ];

  return (
    <div className="sticky top-0 z-50 w-full border-b border-[#ffc4de] bg-[#FF3E9B]/95 text-white shadow-md backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">
        <h1 className="text-xl font-black tracking-wide md:text-2xl">The Diva Look</h1>

        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive ? "bg-white text-[#FF3E9B]" : "hover:bg-[#ffffff22]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;