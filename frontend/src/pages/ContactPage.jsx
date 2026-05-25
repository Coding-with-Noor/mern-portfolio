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
      <div className="contact-split-grid">
        
        {/* LEFT COLUMN: MINIMALIST PROFESSIONAL FOCUS */}
        <div className="contact-info-panel">
          <span className="contact-tag">Professional Correspondence</span>
          <h1 className="contact-title">Let's connect regarding technical opportunities.</h1>
          <p className="contact-desc">
            I am currently seeking software engineering internships and entry-level full-stack roles. 
            If you are looking to collaborate on robust web applications, discuss structural backend logic, 
            or review my academic projects, please submit your inquiry through this secure portal. 
            I typically review submissions within 24 business hours.
          </p>
        </div>

        {/* RIGHT COLUMN: FORM CONTAINER */}
        <div className="contact-form-wrapper">
          <form className="contact-form" onSubmit={handleSubmit}>
            {status.success && <div className="alert alert-success">✓ Message securely logged into the database!</div>}
            {status.error && <div className="alert alert-error">✗ Database connection error: {status.error}</div>}

            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., Noor" required />
            </div>

            <div className="form-group">
              <label>Email Address *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@example.com" required />
            </div>

            <div className="form-group">
              <label>Subject *</label>
              <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="e.g., Project Collaboration / Interview Schedule" required />
            </div>

            <div className="form-group">
              <label>Your Message *</label>
              <textarea name="message" rows="5" value={formData.message} onChange={handleChange} placeholder="Provide comprehensive details regarding your inquiry..." required></textarea>
            </div>

            <button type="submit" className="submit-btn" disabled={status.loading}>
              {status.loading ? 'Transmitting Data...' : 'Submit Message'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;