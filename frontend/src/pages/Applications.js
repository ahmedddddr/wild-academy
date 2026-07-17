import React, { useEffect, useState } from 'react';
import './Applications.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function Applications() {
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchApplications();
    loadUsers();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch(`${API_URL}/api/applications`);
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const generateUsername = (name) => {
    const id = Math.floor(1000 + Math.random() * 9000);
    const cleanName = name.trim().split(' ')[0].toLowerCase();
    return `${cleanName}_${id}`;
  };

  const generatePassword = () => {
    return Math.random().toString(36).slice(-8);
  };

  const handleGenerateUser = async (app, index) => {
    const username = generateUsername(app.name);
    const password = generatePassword();

    const newUser = {
      name: app.name,
      phone: app.phone,
      branch: app.branch,
      ageGroup: app.ageGroup,
      username,
      password
    };

    try {
      // Create user via API
      const userResponse = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      if (userResponse.ok) {
        // Delete application via API
        const deleteResponse = await fetch(`${API_URL}/api/applications/${app._id}`, {
          method: 'DELETE'
        });

        if (deleteResponse.ok) {
          // Refresh both lists
          fetchApplications();
          loadUsers();
          alert(`✅ User created!\nUsername: ${username}\nPassword: ${password}`);
        }
      }
    } catch (error) {
      console.error('Error generating user:', error);
      alert('❌ Failed to generate user');
    }
  };

  const handleDelete = async (index) => {
    try {
      const response = await fetch(`${API_URL}/api/applications/${applications[index]._id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchApplications();
      }
    } catch (error) {
      console.error('Error deleting application:', error);
      alert('❌ Failed to delete application');
    }
  };

  const handleClearAll = async () => {
    try {
      const response = await fetch(`${API_URL}/api/applications/clear/all`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchApplications();
      }
    } catch (error) {
      console.error('Error clearing applications:', error);
      alert('❌ Failed to clear applications');
    }
  };

  return (
    <div className="applications-container">
      <h1>Submitted Applications</h1>

      {applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <>
          <button className="clear-all-btn" onClick={handleClearAll}>Clear All Applications</button>

          <table className="applications-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Branch</th>
                <th>Age Group</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={index}>
                  <td>{app.name}</td>
                  <td>{app.phone}</td>
                  <td>{app.branch}</td>
                  <td>{app.ageGroup}</td>
                  <td>
                    <button onClick={() => handleGenerateUser(app, index)}>Generate User</button>
                    <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Applications;
