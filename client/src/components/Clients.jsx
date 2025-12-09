import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/clients');
        setClients(response.data.data || []);
        setError(null);
      } catch (err) {
        setError('Failed to load client testimonials. Please try again later.');
        console.error('Error fetching clients:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Happy Clients</h2>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Happy Clients</h2>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
            {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Happy Clients
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Hear what our valued clients have to say about their experience with us
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clients.length === 0 ? (
            <div className="col-span-full text-center py-20 bg-gray-50 rounded-2xl">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-gray-500 text-xl font-medium">No client testimonials available yet.</p>
              <p className="text-gray-400 mt-2">Stay tuned for amazing feedback!</p>
            </div>
          ) : (
            clients.map((client) => (
              <div 
                key={client._id} 
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
              >
                {/* Client Info */}
                <div className="flex items-center mb-6">
                  <div className="relative">
                    <img 
                      src={client.photo} 
                      alt={client.name}
                      className="w-20 h-20 rounded-full object-cover ring-4 ring-purple-100 group-hover:ring-purple-200 transition-all"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-xl text-gray-800">{client.name}</h3>
                    <p className="text-purple-600 font-medium text-sm">{client.designation}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{client.testimonial}"</p>
                <div className="mt-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Clients;
