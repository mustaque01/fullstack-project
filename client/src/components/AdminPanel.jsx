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
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('success'); // success or error

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); // newest, oldest, a-z

  // Project Form State
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    image: null,
  });
  const [projectImagePreview, setProjectImagePreview] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  // Client Form State
  const [clientForm, setClientForm] = useState({
    name: '',
    designation: '',
    testimonial: '',
    photo: null,
  });
  const [clientPhotoPreview, setClientPhotoPreview] = useState(null);
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
      setProjects(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setMessage('Error fetching projects');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/clients');
      setClients(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setMessage('Error fetching clients');
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/contact');
      setContacts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setMessage('Error fetching contacts');
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/newsletter');
      setSubscribers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setMessage('Error fetching subscribers');
      setSubscribers([]);
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
        showToastMessage('Project updated successfully!', 'success');
        setEditingProject(null);
      } else {
        await axios.post('http://localhost:5000/api/projects', projectData);
        showToastMessage('Project added successfully!', 'success');
      }

      setProjectForm({ name: '', description: '', image: null });
      setProjectImagePreview(null);
      fetchProjects();
    } catch (error) {
      showToastMessage('Error saving project', 'error');
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
    setProjectImagePreview(project.image);
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`http://localhost:5000/api/projects/${id}`);
        showToastMessage('Project deleted successfully!', 'success');
        fetchProjects();
      } catch (error) {
        showToastMessage('Error deleting project', 'error');
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
        showToastMessage('Client updated successfully!', 'success');
        setEditingClient(null);
      } else {
        await axios.post('http://localhost:5000/api/clients', clientData);
        showToastMessage('Client added successfully!', 'success');
      }

      setClientForm({ name: '', designation: '', testimonial: '', photo: null });
      setClientPhotoPreview(null);
      fetchClients();
    } catch (error) {
      showToastMessage('Error saving client', 'error');
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
    setClientPhotoPreview(client.photo);
  };

  const handleDeleteClient = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        await axios.delete(`http://localhost:5000/api/clients/${id}`);
        showToastMessage('Client deleted successfully!', 'success');
        fetchClients();
      } catch (error) {
        showToastMessage('Error deleting client', 'error');
      }
    }
  };

  // Contact Delete
  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`http://localhost:5000/api/contact/${id}`);
        showToastMessage('Contact deleted successfully!', 'success');
        fetchContacts();
      } catch (error) {
        showToastMessage('Error deleting contact', 'error');
      }
    }
  };

  // Subscriber Delete
  const handleDeleteSubscriber = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscriber?')) {
      try {
        await axios.delete(`http://localhost:5000/api/newsletter/${id}`);
        showToastMessage('Subscriber deleted successfully!', 'success');
        fetchSubscribers();
      } catch (error) {
        showToastMessage('Error deleting subscriber', 'error');
      }
    }
  };

  // Show toast notification
  const showToastMessage = (msg, type = 'success') => {
    setMessage(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Filter and sort projects
  const getFilteredProjects = () => {
    let filtered = projects.filter(project => 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (sortOrder === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOrder === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortOrder === 'a-z') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    return filtered;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold mb-3 text-gray-900">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ShowcaseFlow</span> Admin Panel
          </h1>
          <p className="text-gray-600 text-lg">Manage projects, clients & subscribers effortlessly</p>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className={`fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 z-50 ${
            toastType === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{toastType === 'success' ? '✓' : '✗'}</span>
              <span className="font-semibold">{message}</span>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex justify-center mb-10 flex-wrap gap-4">
          <button
            onClick={() => setActiveTab('projects')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all shadow-sm ${
              activeTab === 'projects'
                ? 'bg-blue-600 text-white shadow-md transform scale-105'
                : 'bg-white text-gray-700 hover-bg-gray-100 border border-gray-200'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('clients')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all shadow-sm ${
              activeTab === 'clients'
                ? 'bg-blue-600 text-white shadow-md transform scale-105'
                : 'bg-white text-gray-700 hover-bg-gray-100 border border-gray-200'
            }`}
          >
            Clients
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all shadow-sm ${
              activeTab === 'contacts'
                ? 'bg-blue-600 text-white shadow-md transform scale-105'
                : 'bg-white text-gray-700 hover-bg-gray-100 border border-gray-200'
            }`}
          >
            Contacts
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`px-8 py-3 rounded-lg font-semibold transition-all shadow-sm ${
              activeTab === 'subscribers'
                ? 'bg-blue-600 text-white shadow-md transform scale-105'
                : 'bg-white text-gray-700 hover-bg-gray-100 border border-gray-200'
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
            <div className="bg-white rounded-lg shadow-md p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {editingProject ? '✏️ Edit Project' : '➕ Add New Project'}
              </h2>
              <form onSubmit={handleProjectSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Project Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={projectForm.name}
                    onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-outline-none focus-ring-2 focus-ring-blue-500 focus-border-transparent"
                    placeholder="Enter project name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus-outline-none focus-ring-2 focus-ring-blue-500 focus-border-transparent resize-none"
                    rows="5"
                    placeholder="Describe your project"
                    maxLength="500"
                    required
                  ></textarea>
                  <div className="text-sm text-gray-500 mt-1 text-right">
                    {projectForm.description.length}/500 characters
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Project Image {!editingProject && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setProjectForm({ ...projectForm, image: file });
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setProjectImagePreview(reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg file-mr-4 file-py-2 file-px-4 file-rounded-lg file-border-0 file-bg-blue-50 file-text-blue-700 hover-file-bg-blue-100"
                    required={!editingProject}
                  />
                  <p className="text-sm text-gray-500 mt-1">Accepted: JPG, PNG, GIF, WebP (Max 5MB)</p>
                  
                  {/* Image Preview */}
                  {projectImagePreview && (
                    <div className="mt-4 relative inline-block">
                      <img 
                        src={projectImagePreview} 
                        alt="Preview" 
                        className="w-48 h-48 object-cover rounded-lg border-2 border-gray-200 shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setProjectImagePreview(null);
                          setProjectForm({ ...projectForm, image: null });
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover-bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover-from-blue-700 hover-to-blue-800 disabled-bg-gray-400 disabled-cursor-not-allowed font-semibold transition-all shadow-md hover-shadow-lg transform hover-scale-105"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="spinner-small"></div>
                        Saving...
                      </span>
                    ) : editingProject ? '✅ Update Project' : '✅ Add Project'}
                  </button>
                  {editingProject && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProject(null);
                        setProjectForm({ name: '', description: '', image: null });
                        setProjectImagePreview(null);
                      }}
                      className="px-8 py-3 bg-gray-500 text-white rounded-lg hover-bg-gray-600 font-semibold transition-all shadow-sm hover-shadow-md"
                    >
                      ❌ Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col md-flex-row justify-between items-start md-items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold">All Projects ({projects.length})</h2>
                
                {/* Search and Filter */}
                <div className="flex flex-col md-flex-row gap-3 w-full md-w-auto">
                  <input
                    type="text"
                    placeholder="🔍 Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus-outline-none focus-ring-2 focus-ring-blue-500 w-full md-w-64"
                  />
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus-outline-none focus-ring-2 focus-ring-blue-500 bg-white"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="a-z">A-Z</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <div className="spinner"></div>
                  <p className="mt-4 text-gray-600">Loading projects...</p>
                </div>
              ) : getFilteredProjects().length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 text-lg">
                    {searchQuery ? 'No projects found matching your search.' : 'No projects yet. Add your first project above!'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3 gap-6">
                  {getFilteredProjects().map((project) => (
                    <div key={project._id} className="border border-gray-200 rounded-lg p-5 shadow-sm hover-shadow-md transition flex flex-col">
                      {project.image && (
                        <div className="mb-4 overflow-hidden rounded-lg bg-gray-100">
                          <img
                            src={project.image}
                            alt={project.name}
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      )}
                      <h3 className="text-xl font-bold mb-2 text-gray-800">{project.name}</h3>
                      <p className="text-gray-600 mb-4 flex-grow line-clamp-3">{project.description}</p>
                      <div className="flex gap-3 mt-auto">
                        <button
                          onClick={() => handleEditProject(project)}
                          className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover-bg-yellow-600 font-semibold transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project._id)}
                          className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover-bg-red-600 font-semibold transition"
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
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setClientForm({ ...clientForm, photo: file });
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setClientPhotoPreview(reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  
                  {/* Photo Preview */}
                  {clientPhotoPreview && (
                    <div className="mt-4 relative inline-block">
                      <img 
                        src={clientPhotoPreview} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover rounded-full border-2 border-gray-200 shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setClientPhotoPreview(null);
                          setClientForm({ ...clientForm, photo: null });
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover-bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  )}
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
                        setClientPhotoPreview(null);
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
