import React from 'react'
import { Link } from 'react-router-dom'


function Navbar() {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
          <Link to="/" className="text-xl font-bold">
              <img 
                src="/images/logo.png"
                alt="Logo"
                className="h-20"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar