import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

function Header() {

  // This function returns the classes for the NavLink, highlighting the active one
  const getNavLinkClass = ({ isActive }) => {
    const commonClasses = "px-4 py-2 rounded-md text-sm font-medium";
    if (isActive) {
      return `bg-orange-100 dark:bg-orange-400/20 text-orange-700 dark:text-orange-300 ${commonClasses}`;
    }
    return `text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-800 ${commonClasses}`;
  };

  return (
    <header className="bg-white/70 dark:bg-gray-950/70 backdrop-blur-lg shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            Bhagavad Gita
          </Link>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-baseline space-x-2">
              <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
              <NavLink to="/chapters" className={getNavLinkClass}>Chapters</NavLink>
              <NavLink to="/about" className={getNavLinkClass}>About</NavLink>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;