import React from 'react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          Welcome to ShowcaseFlow
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Transforming ideas into reality with innovative solutions and creative excellence. 
          Discover our amazing projects and join our community of satisfied clients.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition duration-300 shadow-lg">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;
