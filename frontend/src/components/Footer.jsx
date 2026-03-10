import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-(--border) bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-extrabold text-(--primary)">TheDivaLook</h3>
          <p className="mt-3 max-w-md text-sm leading-6 text-(--text-secondary)">
            Discover makeup shades that match your vibe. Try products virtually, compare
            looks, and shop with confidence.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-(--text-primary)">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/" className="text-(--text-secondary) transition hover:text-(--primary)">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-(--text-secondary) transition hover:text-(--primary)">
                Products
              </Link>
            </li>
            <li>
              <Link to="/try-makeup" className="text-(--text-secondary) transition hover:text-(--primary)">
                Try Makeup
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-(--text-primary)">Account</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/login" className="text-(--text-secondary) transition hover:text-(--primary)">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-(--text-secondary) transition hover:text-(--primary)">
                Register
              </Link>
            </li>
            <li>
              <a href="mailto:support@thedivalook.com" className="text-(--text-secondary) transition hover:text-(--primary)">
                support@thedivalook.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-(--border) bg-(--background-soft)">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-(--text-secondary) sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} TheDivaLook. All rights reserved.</p>
          <p>Glow confidently, every day.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;