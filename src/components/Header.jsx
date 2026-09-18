import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const linkClass = (path) =>
    `hover:text-gray-900 transition ${
      location.pathname === path ? "text-gray-900 font-medium" : "text-gray-600"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg tracking-tight text-gray-900">
          Connect<span className="text-rose-500">.</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          <Link to="/" className={linkClass("/")}>
            发现
          </Link>
          <Link to="/safety" className={linkClass("/safety")}>
            安全指南
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 text-sm font-medium">
            U
          </div>
        </div>
      </div>
    </header>
  );
}
