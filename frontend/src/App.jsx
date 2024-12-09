import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import Footer from './layout/Footer';
import Dashboard from './pages/Dashboard';
import GrammarAssessment from './pages/GrammarAssessment';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>

            {/* SAKSHAM ADD ROUTING FOR THIS PAGES  */}


            {/* <Route path="/" element={<Home />} /> */}
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route path="/" element={<GrammarAssessment />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;