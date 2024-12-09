import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">MERN + FastAPI</Link>
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
          </div>
          <button className="md:hidden">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;