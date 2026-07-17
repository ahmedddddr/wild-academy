import React, { useState, useEffect } from 'react';
import './UserGenerator.css';

const UserGenerator = () => {
  const [users, setUsers] = useState([]);
  const [searchPhone, setSearchPhone] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const filteredUsers = users.filter(user => 
    user.phone.includes(searchPhone)
  );

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
