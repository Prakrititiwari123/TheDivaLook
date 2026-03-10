import React from 'react'

const Footer = () => {
  return (

    <div className="bg-[#3A8B95] text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-3 gap-6">

        <div>

          <h2 className="text-xl font-bold mb-3">
            The Diva Look
          </h2>

          <p className="text-sm">
            Discover makeup that suits your beauty.
            Try shades virtually and shop your favorites.
          </p>

        </div>


        <div>

          <h2 className="text-lg font-semibold mb-3">
            Quick Links
          </h2>

          <ul className="space-y-2 text-sm">

            <li>Home</li>
            <li>Products</li>
            <li>Try Makeup</li>
            <li>Login</li>

          </ul>

        </div>


        <div>

          <h2 className="text-lg font-semibold mb-3">
            Contact
          </h2>

          <p className="text-sm">
            Email: support@thedivalook.com
          </p>

          <p className="text-sm">
            Instagram: @thedivalook
          </p>

        </div>

      </div>

      <div className="text-center py-4 border-t border-[#66D0BC] text-sm">

        © 2026 The Diva Look. All rights reserved.

      </div>

    </div>

  )
}

export default Footer