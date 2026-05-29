import React, { useState } from 'react';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    // Combining names for your existing backend schema if it expects a single 'name' field
    const payload = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      subject: formData.subject,
      message: formData.message
    };

    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Something went wrong.');

      setStatus({ loading: false, success: true, error: null });
      setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message });
    }
  };

  return (
    <div className="contact-page-container">
      
      {/* UPGRADED CENTERED HEADER */}
      <header className="contact-header-centered">
        <h1 className="contact-title-main">Connect for Guidance</h1>
        <p className="contact-subtitle-main">Want to build something? Drop a message and connect with me.</p>
      </header>

      {/* CENTERED COMPACT FORM CONTAINER */}
      <div className="contact-form-center-wrapper">
        <div className="contact-form-wrapper">
          <form className="contact-form" onSubmit={handleSubmit}>
            {status.success && <div className="alert alert-success">✓ Message logged securely to the database.</div>}
            {status.error && <div className="alert alert-error">✗ Server Error: {status.error}</div>}

            <div className="form-row-split">
              <div className="form-group">
                <label>First Name</label>
                <input 
                  type="text" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  placeholder="Enter your first name" 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input 
                  type="text" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  placeholder="Enter your last name" 
                  required 
                />
              </div>
            </div>

            {/* WORK EMAIL FIELD */}
            <div className="form-group">
              <label>Work Email</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Enter your email" 
                required 
              />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input 
                type="text" 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange} 
                placeholder="e.g., Project Collaboration" 
                required 
              />
            </div>

            {/* MESSAGE FIELD */}
            <div className="form-group">
              <label>Message</label>
              <textarea 
                name="message" 
                rows="5" 
                value={formData.message} 
                onChange={handleChange} 
                placeholder="Type your message here..." 
                required
              ></textarea>
            </div>

            {/* SUBMIT ACTION */}
            <button type="submit" className="submit-btn" disabled={status.loading}>
              {status.loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default ContactPage;