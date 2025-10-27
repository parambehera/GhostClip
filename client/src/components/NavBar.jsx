import React, { useState, useRef, useEffect } from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
   const navigate = useNavigate();

  // --- Close dropdown if clicked outside ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#fffaf0] shadow-md border-b border-[#f5deb3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* --- Logo --- */}
          <h1 className="text-xl font-semibold text-gray-800 tracking-wide">
            GhostClip
          </h1>

          {/* --- Menu Button --- */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 p-2 rounded-md text-gray-700 hover:bg-[#f5deb3]/30 transition-colors focus:outline-none"
            >
              <Menu className="w-6 h-6" />
              <span className="hidden sm:inline font-medium">Menu</span>
            </button>

            {/* --- Dropdown --- */}
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-[#f5deb3] shadow-lg rounded-md overflow-hidden z-50 animate-fadeIn">

               <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-[#f5deb3]/30 transition-colors"
                >
                  Text Sharing
                </Link>
                <Link
                  to="/file-share"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-[#f5deb3]/30 transition-colors"
                >
                  File Sharing
                </Link>
                <Link
                  to="/image-share"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-[#f5deb3]/30 transition-colors"
                >
                  Image Sharing
                </Link>
                <Link
                  to="/url-encode"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-[#f5deb3]/30 transition-colors"
                >
                  URL Encode
                </Link>
                <Link
                  to="/url-decode"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-[#f5deb3]/30 transition-colors"
                >
                  URL Decode
                </Link>
                <Link
                  to="/json-escape"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-[#f5deb3]/30 transition-colors"
                >
                  JSON Escape
                </Link>
                <Link
                  to="/json-unescape"
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:bg-[#f5deb3]/30 transition-colors"
                >
                  JSON Unescape
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
