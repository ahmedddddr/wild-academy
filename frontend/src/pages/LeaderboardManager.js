import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEdit, FaTrash, FaSync, FaTrophy, FaFilter } from 'react-icons/fa';
import './LeaderboardManager.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function LeaderboardManager() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [filters, setFilters] = useState({
    branch: '',
    ageGroup: ''
  });
  const [formData, setFormData] = useState({
    username: '',
    branch: '',
    ageGroup: '',
    points: 0
  });

  const branches = ['North', 'South', 'East', 'West', 'Central'];
  const ageGroups = ['5-7', '8-10', '11-13', '14-16'];

  useEffect(() => {
    fetchEntries();
  }, []);

  useEffect(() => {
    filterEntries();
  }, [entries, filters]);

  const fetchEntries = async () => {
    try {
      const response = await fetch(`${API_URL}/api/leaderboard/all`);
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error('Error fetching leaderboard entries:', error);
    }
  };

  const filterEntries = () => {
    let filtered = [...entries];
    
    if (filters.branch) {
      filtered = filtered.filter(entry => entry.branch === filters.branch);
    }
    
    if (filters.ageGroup) {
      filtered = filtered.filter(entry => entry.ageGroup === filters.ageGroup);
    }
    
    // Sort by points descending
    filtered.sort((a, b) => b.points - a.points);
    
    // Add rank
    filtered = filtered.map((entry, index) => ({
      ...entry,
      rank: index + 1
    }));
    
    setFilteredEntries(filtered);
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setFormData({
      username: entry.username,
      branch: entry.branch,
      ageGroup: entry.ageGroup,
      points: entry.points
    });
    setShowEditForm(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/leaderboard/${editingEntry._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ points: formData.points })
      });

      if (response.ok) {
        fetchEntries();
        setShowEditForm(false);
        alert('Points updated successfully!');
      }
    } catch (error) {
      console.error('Error updating entry:', error);
      alert('Error updating entry');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        const response = await fetch(`${API_URL}/api/leaderboard/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          fetchEntries();
          alert('Entry deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting entry:', error);
        alert('Error deleting entry');
      }
    }
  };

  const handleRecalculateRanks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/leaderboard/recalculate`, {
        method: 'POST'
      });
      if (response.ok) {
        fetchEntries();
        alert('Ranks recalculated successfully!');
      }
    } catch (error) {
      console.error('Error recalculating ranks:', error);
      alert('Error recalculating ranks');
    }
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getRankColor = (rank) => {
    if (rank === 1) return '#FFD700';
    if (rank === 2) return '#C0C0C0';
    if (rank === 3) return '#CD7F32';
    return '#6366f1';
  };

  return (
    <div className="leaderboard-manager">
      <div className="leaderboard-header">
        <button className="back-button" onClick={() => navigate('/admin/dashboard')}>
          <FaArrowLeft /> Back to Dashboard
        </button>
        <h1><FaTrophy /> Leaderboard Manager</h1>
        <button className="recalculate-btn" onClick={handleRecalculateRanks}>
          <FaSync /> Recalculate Ranks
        </button>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <FaFilter className="filter-icon" />
          <select
            value={filters.branch}
            onChange={(e) => setFilters({...filters, branch: e.target.value})}
          >
            <option value="">All Branches</option>
            {branches.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
          <select
            value={filters.ageGroup}
            onChange={(e) => setFilters({...filters, ageGroup: e.target.value})}
          >
            <option value="">All Age Groups</option>
            {ageGroups.map(age => (
              <option key={age} value={age}>{age} years</option>
            ))}
          </select>
        </div>
        <div className="stats">
          <span>Total Entries: {filteredEntries.length}</span>
        </div>
      </div>

      <div className="leaderboard-table-container">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Branch</th>
              <th>Age Group</th>
              <th>Points</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((entry, index) => (
              <tr key={entry._id} className={index < 3 ? 'top-three' : ''}>
                <td className="rank-cell" style={{ color: getRankColor(entry.rank) }}>
                  {getRankIcon(entry.rank)}
                </td>
                <td className="username-cell">{entry.username}</td>
                <td>{entry.branch}</td>
                <td>{entry.ageGroup}</td>
                <td className="points-cell">{entry.points}</td>
                <td className="actions-cell">
                  <button className="edit-btn" onClick={() => handleEdit(entry)}>
                    <FaEdit />
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(entry._id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredEntries.length === 0 && (
        <div className="no-entries">
          <p>No leaderboard entries found. Create badges and assign them to users to populate the leaderboard!</p>
        </div>
      )}

      {showEditForm && (
        <div className="edit-form-overlay">
          <div className="edit-form">
            <h2>Edit Points</h2>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  value={formData.username}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Branch</label>
                <input
                  type="text"
                  value={formData.branch}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Age Group</label>
                <input
                  type="text"
                  value={formData.ageGroup}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Points</label>
                <input
                  type="number"
                  value={formData.points}
                  onChange={(e) => setFormData({...formData, points: parseInt(e.target.value)})}
                  min="0"
                  required
                />
              </div>
              <div className="form-buttons">
                <button type="submit" className="submit-btn">Update Points</button>
                <button type="button" className="cancel-btn" onClick={() => setShowEditForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeaderboardManager;
