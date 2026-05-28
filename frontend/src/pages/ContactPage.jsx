import React, { useState } from 'react';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Something went wrong.');

      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  return (
    <div className="contact-page-container">
      
      {/* HEADER BLOCK */}
      <header className="contact-header-centered">
        <span className="contact-tag">Secure Correspondence</span>
        <h1 className="contact-title-main">Let's Build Something Exceptional.</h1>
        <p className="contact-subtitle-main">Reach out directly or utilize the database logging terminal below.</p>
      </header>

      <div className="contact-split-grid">
        
        {/* LEFT COLUMN: INTERACTIVE PROFESSIONAL CARDS */}
        <div className="contact-cards-panel">
          
          <a href="mailto:your-email@example.com" className="interactive-contact-card email-card">
            <div className="card-accent-edge"></div>
            <div className="contact-icon-box">
              <span className="icon-graphic">✉</span>
            </div>
            <div className="contact-card-text">
              <h3>Direct Email</h3>
              <p>your-email@example.com</p>
              <span className="action-hint">Send Instant Ping →</span>
            </div>
          </a>

          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="interactive-contact-card linkedin-card">
            <div className="card-accent-edge"></div>
            <div className="contact-icon-box">
              <span className="icon-graphic">in</span>
            </div>
            <div className="contact-card-text">
              <h3>Professional Network</h3>
              <p>linkedin.com/in/yourprofile</p>
              <span className="action-hint">View Connection →</span>
            </div>
          </a>

          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="interactive-contact-card github-card">
            <div className="card-accent-edge"></div>
            <div className="contact-icon-box">
              <span className="icon-graphic">⚡</span>
            </div>
            <div className="contact-card-text">
              <h3>Source Engineering</h3>
              <p>github.com/yourusername</p>
              <span className="action-hint">Review Repositories →</span>
            </div>
          </a>

        </div>

        {/* RIGHT COLUMN: HIGH-END TERMINAL FORM */}
        <div className="contact-form-wrapper">
          <div className="form-glow-aurora"></div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
            {status.success && <div className="alert alert-success">✓ Message logged securely to cluster database.</div>}
            {status.error && <div className="alert alert-error">✗ Node Server Linkage Error: {status.error}</div>}

            <div className="form-row-split">
              <div className="form-group">
                <label>Identify Yourself</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
              </div>

              <div className="form-group">
                <label>Return Link Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@domain.com" required />
              </div>
            </div>

            <div className="form-group">
              <label>Objective Scope</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="e.g., Project Integration Proposals" required />
            </div>

            <div className="form-group">
              <label>Message Content payload</label>
              <textarea name="message" rows="4" value={formData.message} onChange={handleChange} placeholder="Type your core transmission details here..." required></textarea>
            </div>

            <button type="submit" className="submit-btn" disabled={status.loading}>
              <span>{status.loading ? 'Transmitting Over Network...' : 'Execute Transmission'}</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;