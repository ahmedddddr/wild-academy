import React, { useState } from 'react';
import axios from 'axios';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', content: '' });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError('');
    try {
      await axios.post('http://localhost:5000/api/messages', formData);
      setFormData({ name: '', email: '', content: '' });
      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{ backgroundColor: '#fffaf0', minHeight: '100vh', padding: '40px 20px', fontFamily: 'Segoe UI, sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 0 10px #e0e0e0' }}>
        <h1 style={{ color: '#f97316', textAlign: 'center' }}>Contact Wild Academy</h1>
        <p style={{ color: '#555', textAlign: 'center' }}>
          We'd love to hear from you! Fill in the form below and we'll get back to you.
        </p>

        {success && <p style={{ color: 'green', fontWeight: 600 }}>Message sent successfully!</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Name</label>
          <input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="Your Name"
          />

          <label style={{ display: 'block', marginTop: '20px', marginBottom: '8px', fontWeight: 'bold' }}>Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="Your Email"
          />

          <label style={{ display: 'block', marginTop: '20px', marginBottom: '8px', fontWeight: 'bold' }}>Message</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Your Message"
            style={{ ...inputStyle, resize: 'vertical' }}
          />

          <button type="submit" style={buttonStyle}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '6px',
  fontSize: '16px'
};

const buttonStyle = {
  marginTop: '25px',
  backgroundColor: '#16a34a',
  color: '#fff',
  padding: '12px 24px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '16px'
};

export default Contact;
