import { useState } from "react";

const navLinks = [
  { name: "Analytics", href: "#" },
  { name: "Platform", href: "#" },
  { name: "Solutions", href: "#" },
  { name: "Enterprise", href: "#" },
  { name: "Pricing", href: "#" },
];

export default function Header() {
  const [active, setActive] = useState("Analytics");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center pt-6 px-4">
      {/* Pill Header */}
      <div className="w-full max-w-4xl">
        <nav
          className="flex items-center justify-between px-5 py-3 rounded-full"
          style={{
            background: "rgba(30, 30, 32, 0.85)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 4px 32px rgba(0,0,0,0.5)",
          }}
        >
          {/* Logo */}
          <span className="text-white font-bold text-[17px] tracking-tight whitespace-nowrap mr-6">
            Client Connect<span className="text-emerald-400">.</span>
          </span>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => setActive(link.name)}
                className="px-4 py-1.5 rounded-full text-[13.5px] font-medium transition-all duration-200"
                style={{
                  color: active === link.name ? "#fff" : "rgba(255,255,255,0.5)",
                  background: active === link.name ? "rgba(255,255,255,0.08)" : "transparent",
                }}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <button
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-[13px] font-bold uppercase tracking-wide transition-all duration-200 ml-4"
            style={{
              background: "#10b981",
              color: "#000",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#34d399")}
            onMouseLeave={e => (e.currentTarget.style.background = "#10b981")}
          >
            Start Scaling
          </button>

          {/* Mobile Hamburger */}
          <button
            className="flex md:hidden flex-col gap-[5px] p-2 ml-auto"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block h-[2px] w-5 bg-white transition-all duration-300"
              style={{ transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }}
            />
            <span
              className="block h-[2px] w-5 bg-white transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block h-[2px] w-5 bg-white transition-all duration-300"
              style={{ transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }}
            />
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            className="mt-2 rounded-2xl flex flex-col overflow-hidden md:hidden"
            style={{
              background: "rgba(30, 30, 32, 0.95)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => { setActive(link.name); setMenuOpen(false); }}
                className="text-left px-6 py-4 text-[15px] font-medium border-b transition-colors duration-150"
                style={{
                  color: active === link.name ? "#fff" : "rgba(255,255,255,0.5)",
                  borderColor: "rgba(255,255,255,0.06)",
                  background: active === link.name ? "rgba(255,255,255,0.05)" : "transparent",
                }}
              >
                {link.name}
              </button>
            ))}
            <div className="p-4">
              <button
                className="w-full py-3 rounded-full text-[13px] font-bold uppercase tracking-wide"
                style={{ background: "#10b981", color: "#000" }}
              >
                Start Scaling
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}