import React from 'react';
import './App.css';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Clients from './components/Clients';
import ContactForm from './components/ContactForm';
import Newsletter from './components/Newsletter';

function App() {
  return (
    <div className="App">
      <Hero />
      <Projects />
      <Clients />
      <ContactForm />
      <Newsletter />
      
      <footer className="bg-gray-900 text-white py-8 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <p className="mb-2">© 2025 ShowcaseFlow. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
