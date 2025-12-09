import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">

          {/* LOGO */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide hover:scale-105 transition-transform">
              ShowcaseFlow
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-10">
            <button onClick={() => scrollToSection('hero')} className="navLink">
              Home
            </button>
            <button onClick={() => scrollToSection('projects')} className="navLink">
              Projects
            </button>
            <button onClick={() => scrollToSection('clients')} className="navLink">
              Clients
            </button>
            <button onClick={() => scrollToSection('contact')} className="navLink">
              Contact
            </button>

            <Link
              to="/admin"
              className="px-5 py-2.5 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all whitespace-nowrap"
            >
              Admin Panel
            </Link>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-gray-800" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => scrollToSection('hero')} 
                className="mobileLink py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('projects')} 
                className="mobileLink py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('clients')} 
                className="mobileLink py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clients
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="mobileLink py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Contact
              </button>
              <Link
                to="/admin"
                className="text-center px-6 py-3 mt-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-md hover:shadow-xl transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Panel
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
