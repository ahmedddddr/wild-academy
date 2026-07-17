import React, { useState, useEffect } from 'react';
import './UserGenerator.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const UserGenerator = () => {
  const [users, setUsers] = useState([]);
  const [searchPhone, setSearchPhone] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const filteredUsers = users.filter(user =>
    user.phone.includes(searchPhone)
  );

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/users/${userId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchUsers();
      } else {
        alert('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user');
    }
  };

  return (
    <div className="user-generator-container">
      <h1>Generated Users</h1>

      {/* Search Box */}
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search by phone number..." 
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
        />
      </div>

      {filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <>
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Branch</th>
                <th>Age Group</th>
                <th>Username</th>
                <th>Password</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, idx) => (
                <tr key={idx}>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.branch}</td>
                  <td>{user.ageGroup}</td>
                  <td>{user.username}</td>
                  <td>{user.password}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(user._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default UserGenerator;
