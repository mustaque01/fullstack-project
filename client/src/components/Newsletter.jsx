import React, { useState } from 'react';
import axios from 'axios';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setSubmitting(true);
    setSubmitStatus(null);
    setError('');

    try {
      await axios.post('http://localhost:5000/api/newsletter', { email });
      setSubmitStatus({ 
        type: 'success', 
        message: 'Successfully subscribed to our newsletter!' 
      });
      setEmail('');
    } catch (err) {
      if (err.response?.status === 409) {
        setSubmitStatus({ 
          type: 'error', 
          message: 'This email is already subscribed.' 
        });
      } else {
        setSubmitStatus({ 
          type: 'error', 
          message: 'Failed to subscribe. Please try again.' 
        });
      }
      console.error('Error subscribing to newsletter:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
    if (submitStatus) setSubmitStatus(null);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-xl mb-8">
          Stay updated with our latest projects and news. Join our community today!
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white ${
                error ? 'border-2 border-red-500' : ''
              }`}
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed"
            >
              {submitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          
          {error && (
            <p className="text-red-300 text-sm mt-2 text-left">{error}</p>
          )}
          
          {submitStatus && (
            <div className={`mt-4 p-4 rounded-lg ${
              submitStatus.type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              {submitStatus.message}
            </div>
          )}
        </form>

        <p className="text-sm mt-6 opacity-90">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
