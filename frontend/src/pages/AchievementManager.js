import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaAward, FaUser, FaMedal, FaSearch } from 'react-icons/fa';
import './AchievementManager.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function AchievementManager() {
  const navigate = useNavigate();
  const [badges, setBadges] = useState([]);
  const [users, setUsers] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedBadge, setSelectedBadge] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState('');
  const [filterAgeGroup, setFilterAgeGroup] = useState('');

  const branches = [
    'German future school – Rehab',
    'Othman Bin affan school – Rehab',
    'Madinaty Sports Club',
    'MILS – Madinaty',
    'MIOLS – Madinaty',
    'Carleton College – El Shorouk'
  ];
  const ageGroups = ['4-6', '7-9', '10-14'];

  useEffect(() => {
    fetchBadges();
    fetchUsers();
    fetchAchievements();
  }, []);

  const fetchBadges = async () => {
    try {
      const response = await fetch(`${API_URL}/api/badges`);
      const data = await response.json();
      setBadges(data);
    } catch (error) {
      console.error('Error fetching badges:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchAchievements = async () => {
    try {
      const response = await fetch(`${API_URL}/api/achievements/all`);
      const data = await response.json();
      setAchievements(data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  const handleAssignBadge = async () => {
    if (!selectedUser || !selectedBadge) {
      alert('Please select both a user and a badge');
      return;
    }

    const user = users.find(u => u.username === selectedUser);
    if (!user) {
      alert('User not found');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/achievements/assign-badge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: selectedUser,
          branch: user.branch,
          ageGroup: user.ageGroup,
          badgeId: selectedBadge
        })
      });

      if (response.ok) {
        fetchAchievements();
        setSelectedUser('');
        setSelectedBadge('');
        alert('Badge assigned successfully!');
      } else {
        alert('Error assigning badge');
      }
    } catch (error) {
      console.error('Error assigning badge:', error);
      alert('Error assigning badge');
    }
  };

  const handleDeleteAchievement = async (id) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      try {
        const response = await fetch(`${API_URL}/api/achievements/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          fetchAchievements();
          alert('Achievement deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting achievement:', error);
        alert('Error deleting achievement');
      }
    }
  };

  const filteredAchievements = achievements.filter(achievement => {
    const matchesSearch = achievement.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         achievement.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = !filterBranch || achievement.branch === filterBranch;
    const matchesAgeGroup = !filterAgeGroup || achievement.ageGroup === filterAgeGroup;
    return matchesSearch && matchesBranch && matchesAgeGroup;
  });

  const getRarityColor = (rarity) => {
    const colors = {
      common: '#9CA3AF',
      rare: '#3B82F6',
      epic: '#8B5CF6',
      legendary: '#F59E0B'
    };
    return colors[rarity] || '#9CA3AF';
  };

  return (
    <div className="achievement-manager">
      <div className="achievement-header">
        <button className="back-button" onClick={() => navigate('/admin/dashboard')}>
          <FaArrowLeft /> Back to Dashboard
        </button>
        <h1><FaAward /> Achievement & Badge Manager</h1>
      </div>

      <div className="assignment-section">
        <div className="assignment-card">
          <h2><FaMedal /> Assign Badge to User</h2>
          <div className="assignment-form">
            <div className="form-group">
              <label><FaUser /> Select User</label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value="">Choose a user...</option>
                {users.map(user => (
                  <option key={user._id} value={user.username}>
                    {user.username} ({user.branch} - {user.ageGroup})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label><FaMedal /> Select Badge</label>
              <select
                value={selectedBadge}
                onChange={(e) => setSelectedBadge(e.target.value)}
              >
                <option value="">Choose a badge...</option>
                {badges.map(badge => (
                  <option key={badge._id} value={badge._id}>
                    {badge.animal} {badge.name} ({badge.points} pts - {badge.rarity})
                  </option>
                ))}
              </select>
            </div>

            <button className="assign-btn" onClick={handleAssignBadge}>
              Assign Badge
            </button>
          </div>
        </div>

        <div className="badge-preview">
          <h3>Available Badges</h3>
          <div className="badges-list">
            {badges.map(badge => (
              <div key={badge._id} className="mini-badge-card" style={{ borderColor: getRarityColor(badge.rarity) }}>
                <span className="badge-animal">{badge.animal}</span>
                <span className="badge-name">{badge.name}</span>
                <span className="badge-points">{badge.points} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="achievements-section">
        <h2>User Achievements</h2>
        
        <div className="filters-bar">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by username or achievement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            value={filterBranch}
            onChange={(e) => setFilterBranch(e.target.value)}
          >
            <option value="">All Branches</option>
            {branches.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
          
          <select
            value={filterAgeGroup}
            onChange={(e) => setFilterAgeGroup(e.target.value)}
          >
            <option value="">All Age Groups</option>
            {ageGroups.map(age => (
              <option key={age} value={age}>{age} years</option>
            ))}
          </select>
        </div>

        <div className="achievements-grid">
          {filteredAchievements.map(achievement => (
            <div key={achievement._id} className="achievement-card">
              <div className="achievement-header">
                <span className="achievement-icon">{achievement.icon || '🏆'}</span>
                <div className="achievement-info">
                  <h3>{achievement.title}</h3>
                  <p className="achievement-user">{achievement.username}</p>
                </div>
                <span className="achievement-points">+{achievement.points} pts</span>
              </div>
              
              {achievement.badgePhoto && (
                <div className="achievement-photo">
                  <img src={achievement.badgePhoto} alt={achievement.title} />
                </div>
              )}
              
              {achievement.description && (
                <p className="achievement-description">{achievement.description}</p>
              )}
              
              <div className="achievement-meta">
                <span className="meta-tag">{achievement.branch}</span>
                <span className="meta-tag">{achievement.ageGroup}</span>
                <span className="meta-date">
                  {new Date(achievement.dateEarned).toLocaleDateString()}
                </span>
              </div>
              
              <button 
                className="delete-achievement-btn"
                onClick={() => handleDeleteAchievement(achievement._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="no-achievements">
            <p>No achievements found. Assign badges to users to see them here!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AchievementManager;
