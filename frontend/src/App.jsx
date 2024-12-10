import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "./components";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { GrammarAssessment } from "./pages/Assessment";
import { Login, Register } from "./pages/authentication";
import { useState, useEffect } from "react";

function App() {
  const isUserAuthenticated = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            {/* SAKSHAM ADD ROUTING FOR THIS PAGES  */}
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assessments" element={<GrammarAssessment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
