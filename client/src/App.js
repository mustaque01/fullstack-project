import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Clients from './components/Clients';
import ContactForm from './components/ContactForm';
import Newsletter from './components/Newsletter';
import AdminPanel from './components/AdminPanel';

// Landing Page Component
function LandingPage() {
  return (
    <>
      <Hero />
      <Projects />
      <Clients />
      <ContactForm />
      <Newsletter />
      
      <footer className="bg-gray-900 text-white py-8 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <p className="mb-2">© 2025 ShowcaseFlow. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <Link to="/admin" className="hover:text-blue-400 transition">Admin Panel</Link>
            <button className="hover:text-blue-400 transition">Privacy Policy</button>
            <button className="hover:text-blue-400 transition">Terms of Service</button>
            <button className="hover:text-blue-400 transition">Contact</button>
          </div>
        </div>
      </footer>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
