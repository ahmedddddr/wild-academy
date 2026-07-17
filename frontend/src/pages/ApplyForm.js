import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ApplyForm.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function ApplyForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    branch: '',
    ageGroup: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/applications/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Application submitted successfully!');
        navigate('/');
      } else {
        alert('❌ Failed to submit application');
      }
    } catch (error) {
      alert('❌ An error occurred while submitting the application.');
      console.error(error);
    }
  };

  return (
    <div className="apply-container">
      <form className="apply-card" onSubmit={handleSubmit}>
        <img src="/wild_logo.png" alt="Wild Academy Logo" className="form-logo" />
        <h2>Reserve your child's spot in Wild Academy</h2>

        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Mobile Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>Branch</label>
        <select name="branch" value={formData.branch} onChange={handleChange} required>
          <option value="">-- Select Branch --</option>
          <option value="German future school">German future school – Rehab</option>
          <option value="Othman Bin affan school">Othman Bin affan school – Rehab</option>
          <option value="Madinaty">Madinaty Sports Club</option>
          <option value="MILS">MILS – Madinaty</option>
          <option value="MIOLS">MIOLS – Madinaty</option>
          <option value="Carleton College">Carleton College – El Shorouk</option>
        </select>

        <label>Age Group</label>
        <div className="age-options">
          <label><input type="radio" name="ageGroup" value="4-6" onChange={handleChange} required /> 4–6</label>
          <label><input type="radio" name="ageGroup" value="7-9" onChange={handleChange} /> 7–9</label>
          <label><input type="radio" name="ageGroup" value="10-14" onChange={handleChange} /> 10–14</label>
        </div>

        <button type="submit">Apply</button>
      </form>
    </div>
  );
}

export default ApplyForm;
