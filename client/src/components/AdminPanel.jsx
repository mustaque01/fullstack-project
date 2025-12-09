import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Project Form State
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    image: null,
  });
  const [editingProject, setEditingProject] = useState(null);

  // Client Form State
  const [clientForm, setClientForm] = useState({
    name: '',
    designation: '',
    testimonial: '',
    photo: null,
  });
  const [editingClient, setEditingClient] = useState(null);

  useEffect(() => {
    if (activeTab === 'projects') fetchProjects();
    else if (activeTab === 'clients') fetchClients();
    else if (activeTab === 'contacts') fetchContacts();
    else if (activeTab === 'subscribers') fetchSubscribers();
  }, [activeTab]);

  // Fetch Functions
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/projects');
      setProjects(response.data);
    } catch (error) {
      setMessage('Error fetching projects');
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/clients');
      setClients(response.data);
    } catch (error) {
      setMessage('Error fetching clients');
    } finally {
      setLoading(false);
    }
  };

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/contact');
      setContacts(response.data);
    } catch (error) {
      setMessage('Error fetching contacts');
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/newsletter');
      setSubscribers(response.data);
    } catch (error) {
      setMessage('Error fetching subscribers');
    } finally {
      setLoading(false);
    }
  };

  // Project CRUD Operations
  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let imageUrl = '';
      if (projectForm.image) {
        const formData = new FormData();
        formData.append('image', projectForm.image);
        const uploadRes = await axios.post('http://localhost:5000/api/upload', formData);
        imageUrl = uploadRes.data.url;
      }

      const projectData = {
        name: projectForm.name,
        description: projectForm.description,
        image: imageUrl,
      };

      if (editingProject) {
        await axios.put(`http://localhost:5000/api/projects/${editingProject._id}`, projectData);
        setMessage('Project updated successfully!');
        setEditingProject(null);
      } else {
        await axios.post('http://localhost:5000/api/projects', projectData);
        setMessage('Project added successfully!');
      }

      setProjectForm({ name: '', description: '', image: null });
      fetchProjects();
    } catch (error) {
      setMessage('Error saving project');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      name: project.name,
      description: project.description,
      image: null,
    });
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`http://localhost:5000/api/projects/${id}`);
        setMessage('Project deleted successfully!');
        fetchProjects();
      } catch (error) {
        setMessage('Error deleting project');
      }
    }
  };

  // Client CRUD Operations
  const handleClientSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      let photoUrl = '';
      if (clientForm.photo) {
        const formData = new FormData();
        formData.append('image', clientForm.photo);
        const uploadRes = await axios.post('http://localhost:5000/api/upload', formData);
        photoUrl = uploadRes.data.url;
      }

      const clientData = {
        name: clientForm.name,
        designation: clientForm.designation,
        testimonial: clientForm.testimonial,
        photo: photoUrl,
      };

      if (editingClient) {
        await axios.put(`http://localhost:5000/api/clients/${editingClient._id}`, clientData);
        setMessage('Client updated successfully!');
        setEditingClient(null);
      } else {
        await axios.post('http://localhost:5000/api/clients', clientData);
        setMessage('Client added successfully!');
      }

      setClientForm({ name: '', designation: '', testimonial: '', photo: null });
      fetchClients();
    } catch (error) {
      setMessage('Error saving client');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClient = (client) => {
    setEditingClient(client);
    setClientForm({
      name: client.name,
      designation: client.designation,
      testimonial: client.testimonial,
      photo: null,
    });
  };

  const handleDeleteClient = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await axios.delete(`http://localhost:5000/api/clients/${id}`);
        setMessage('Client deleted successfully!');
        fetchClients();
      } catch (error) {
        setMessage('Error deleting client');
      }
    }
  };

  // Contact Delete
  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`http://localhost:5000/api/contact/${id}`);
        setMessage('Contact deleted successfully!');
        fetchContacts();
      } catch (error) {
        setMessage('Error deleting contact');
      }
    }
  };

  // Subscriber Delete
  const handleDeleteSubscriber = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscriber?')) {
      try {
        await axios.delete(`http://localhost:5000/api/newsletter/${id}`);
        setMessage('Subscriber deleted successfully!');
        fetchSubscribers();
      } catch (error) {
        setMessage('Error deleting subscriber');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">ShowcaseFlow Admin Panel</h1>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'projects'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover-bg-gray-200'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'clients'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover-bg-gray-200'
            }`}
          >
            Clients
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'contacts'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover-bg-gray-200'
            }`}
          >
            Contacts
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === 'subscribers'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover-bg-gray-200'
            }`}
          >
            Subscribers
          </button>
        </div>

        {/* Message Display */}
        {message && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-center">
            {message}
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              <form onSubmit={handleProjectSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Project Name</label>
                  <input
                    type="text"
                    value={projectForm.name}
                    onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus-outline-none focus-ring-2 focus-ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Description</label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus-outline-none focus-ring-2 focus-ring-blue-500"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Project Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProjectForm({ ...projectForm, image: e.target.files[0] })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover-bg-blue-700 disabled-bg-gray-400"
                  >
                    {loading ? 'Saving...' : editingProject ? 'Update Project' : 'Add Project'}
                  </button>
                  {editingProject && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProject(null);
                        setProjectForm({ name: '', description: '', image: null });
                      }}
                      className="px-6 py-3 bg-gray-500 text-white rounded-lg hover-bg-gray-600"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">All Projects</h2>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <div key={project._id} className="border rounded-lg p-4">
                      {project.image && (
                        <img
                          src={project.image}
                          alt={project.name}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      )}
                      <h3 className="text-xl font-bold mb-2">{project.name}</h3>
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditProject(project)}
                          className="px-4 py-2 bg-yellow-500 text-white rounded hover-bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project._id)}
                          className="px-4 py-2 bg-red-500 text-white rounded hover-bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Clients Tab */}
        {activeTab === 'clients' && (
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">
                {editingClient ? 'Edit Client' : 'Add New Client'}
              </h2>
              <form onSubmit={handleClientSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Client Name</label>
                  <input
                    type="text"
                    value={clientForm.name}
                    onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus-outline-none focus-ring-2 focus-ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Designation</label>
                  <input
                    type="text"
                    value={clientForm.designation}
                    onChange={(e) => setClientForm({ ...clientForm, designation: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus-outline-none focus-ring-2 focus-ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Testimonial</label>
                  <textarea
                    value={clientForm.testimonial}
                    onChange={(e) => setClientForm({ ...clientForm, testimonial: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus-outline-none focus-ring-2 focus-ring-blue-500"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">Client Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setClientForm({ ...clientForm, photo: e.target.files[0] })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover-bg-blue-700 disabled-bg-gray-400"
                  >
                    {loading ? 'Saving...' : editingClient ? 'Update Client' : 'Add Client'}
                  </button>
                  {editingClient && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingClient(null);
                        setClientForm({ name: '', designation: '', testimonial: '', photo: null });
                      }}
                      className="px-6 py-3 bg-gray-500 text-white rounded-lg hover-bg-gray-600"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">All Clients</h2>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3 gap-6">
                  {clients.map((client) => (
                    <div key={client._id} className="border rounded-lg p-4">
                      {client.photo && (
                        <img
                          src={client.photo}
                          alt={client.name}
                          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                        />
                      )}
                      <h3 className="text-xl font-bold text-center mb-1">{client.name}</h3>
                      <p className="text-gray-500 text-center mb-2">{client.designation}</p>
                      <p className="text-gray-600 mb-4">{client.testimonial}</p>
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleEditClient(client)}
                          className="px-4 py-2 bg-yellow-500 text-white rounded hover-bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClient(client._id)}
                          className="px-4 py-2 bg-red-500 text-white rounded hover-bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Contact Submissions</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Mobile</th>
                      <th className="px-4 py-2 text-left">City</th>
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact._id} className="border-b hover-bg-gray-50">
                        <td className="px-4 py-2">{contact.fullName}</td>
                        <td className="px-4 py-2">{contact.email}</td>
                        <td className="px-4 py-2">{contact.mobile}</td>
                        <td className="px-4 py-2">{contact.city}</td>
                        <td className="px-4 py-2">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => handleDeleteContact(contact._id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover-bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Subscribers Tab */}
        {activeTab === 'subscribers' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Newsletter Subscribers</h2>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Subscribed Date</th>
                      <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscribers.map((subscriber) => (
                      <tr key={subscriber._id} className="border-b hover-bg-gray-50">
                        <td className="px-4 py-2">{subscriber.email}</td>
                        <td className="px-4 py-2">
                          {new Date(subscriber.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => handleDeleteSubscriber(subscriber._id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover-bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
