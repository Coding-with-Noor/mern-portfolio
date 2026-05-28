import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);

  // Tracks whether we are currently creating a new item or updating an existing one
  const [editingProjectId, setEditingProjectId] = useState(null);

  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    techStack: '',
    githubLink: ''
  });

  const [formStatus, setFormStatus] = useState({ loading: false, success: false, error: null });

  // Fetch data engines
  const fetchMessages = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/messages');
      if (!response.ok) throw new Error('Could not fetch messages');
      const data = await response.json();
      setMessages(data);
      setLoadingMessages(false);
    } catch (err) {
      setLoadingMessages(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects');
      if (!response.ok) throw new Error('Could not fetch projects');
      const data = await response.json();
      setProjects(data);
      setLoadingProjects(false);
    } catch (err) {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchProjects();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProjectForm({ ...projectForm, [name]: value });
  };

  // CREATE OR UPDATE ACTION HANDLER
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: null });

    const formattedTechStack = projectForm.techStack
      .split(',')
      .map(tech => tech.trim())
      .filter(tech => tech !== "");

    const submissionData = { ...projectForm, techStack: formattedTechStack };

    const url = editingProjectId 
      ? `http://localhost:5000/api/projects/${editingProjectId}`
      : 'http://localhost:5000/api/projects';
      
    const method = editingProjectId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Action failed');

      setFormStatus({ loading: false, success: true, error: null });
      setProjectForm({ title: '', description: '', techStack: '', githubLink: '' });
      setEditingProjectId(null);
      fetchProjects();
    } catch (err) {
      setFormStatus({ loading: false, success: false, error: err.message });
    }
  };

  const handleEditClick = (project) => {
    setEditingProjectId(project._id);
    setProjectForm({
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(', '), 
      githubLink: project.githubLink
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = async (projectId) => {
    if (!window.confirm("Are you absolutely sure you want to delete this project permanently from MongoDB?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete item');
      
      setProjects(projects.filter(p => p._id !== projectId));
      
      if (editingProjectId === projectId) {
        setEditingProjectId(null);
        setProjectForm({ title: '', description: '', techStack: '', githubLink: '' });
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const cancelEditing = () => {
    setEditingProjectId(null);
    setProjectForm({ title: '', description: '', techStack: '', githubLink: '' });
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin Control Dashboard</h1>
        <p>Perform creation, edit adjustments, and permanent deletion of database items.</p>
      </header>

      <div className="admin-grid">
        {/* LEFT COLUMN: ADAPTIVE FORM & LIVE PORTFOLIO CARDS */}
        <section className="admin-panel-card">
          <h2>{editingProjectId ? "Modify Active Project" : "Upload New Project"}</h2>
          <form onSubmit={handleFormSubmit} className="admin-form">
            {formStatus.success && <div className="admin-alert success-alert">✓ Database transaction processed successfully!</div>}
            {formStatus.error && <div className="admin-alert error-alert">✗ Error: {formStatus.error}</div>}

            <div className="admin-field">
              <label>Project Title *</label>
              <input type="text" name="title" value={projectForm.title} onChange={handleFormChange} required />
            </div>

            <div className="admin-field">
              <label>Description *</label>
              <textarea name="description" rows="4" value={projectForm.description} onChange={handleFormChange} required></textarea>
            </div>

            <div className="admin-field">
              <label>Tech Stack * (Separate with commas)</label>
              <input type="text" name="techStack" value={projectForm.techStack} onChange={handleFormChange} required placeholder="e.g., React, Node.js, MongoDB" />
            </div>

            <div className="admin-field">
              <label>GitHub Repository URL *</label>
              <input type="url" name="githubLink" value={projectForm.githubLink} onChange={handleFormChange} required />
            </div>

            <div className="form-action-buttons">
              <button type="submit" className="admin-submit-btn" disabled={formStatus.loading}>
                {editingProjectId ? 'Update Project Details' : 'Publish Project Code'}
              </button>
              {editingProjectId && (
                <button type="button" className="admin-cancel-btn" onClick={cancelEditing}>
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          {/* UPGRADED LIVE PORTFOLIO CARD INVENTORY CONTAINER */}
          <div className="admin-projects-list-section">
            <h3 className="sub-section-title">Live Portfolio Inventory</h3>
            {loadingProjects ? (
              <p className="inbox-info">Reading systems data...</p>
            ) : projects.length === 0 ? (
              <p className="inbox-info">No items published yet.</p>
            ) : (
              <div className="admin-inventory-list">
                {projects.map(proj => (
                  <div key={proj._id} className="inventory-item-row">
                    <div className="inventory-card-info">
                      <h4 className="inventory-card-title">{proj.title}</h4>
                      <div className="inventory-tech-badges">
                        {proj.techStack.map((tech, i) => (
                          <span key={i} className="tech-tag-badge">{tech}</span>
                        ))}
                      </div>
                    </div>
                    <div className="inventory-actions">
                      <button className="btn-edit" onClick={() => handleEditClick(proj)}>Edit</button>
                      <button className="btn-delete" onClick={() => handleDeleteClick(proj._id)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* RIGHT COLUMN: INBOX SUBMISSIONS */}
        <section className="admin-panel-card">
          <h2>Inbox Submissions ({messages.length})</h2>
          
          <div className="inbox-list">
            {loadingMessages ? (
              <p className="inbox-info">Loading connection items...</p>
            ) : messages.length === 0 ? (
              <p className="inbox-info">Your inbox database is currently empty.</p>
            ) : (
              messages.map((msg) => (
                <div key={msg._id} className="inbox-item-card">
                  <div className="inbox-item-header">
                    <h3>{msg.subject || 'General Inquiry'}</h3>
                    <span className="inbox-date">{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="inbox-meta">From: <strong>{msg.name}</strong> &middot; {msg.email}</p>
                  <p className="inbox-body-text">{msg.message}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;