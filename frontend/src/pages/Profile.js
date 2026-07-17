import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaPhone, FaMapMarkerAlt, FaBirthdayCake, FaCoins, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import './Profile.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const Profile = ({ user }) => {
  const navigate = useNavigate();
  const [userPoints, setUserPoints] = useState(0);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, [user?.username]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users`);
      const data = await response.json();
      const currentUser = data.find(u => u.username === user?.username);
      setUserPoints(currentUser?.points || 0);
      setPurchases(currentUser?.purchases || []);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    navigate('/login');
  };

  if (!user) {
    return <div className="profile-container">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <button className="back-button" onClick={() => navigate('/main')}>
          <FaArrowLeft /> Back
        </button>
        <h1><FaUser /> My Profile</h1>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar">
            <FaUser className="avatar-icon" />
          </div>
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-username">@{user.username}</p>
        </div>

        <div className="info-section">
          <h3>Personal Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <FaPhone className="info-icon" />
              <div className="info-details">
                <span className="info-label">Phone</span>
                <span className="info-value">{user.phone}</span>
              </div>
            </div>
            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <div className="info-details">
                <span className="info-label">Branch</span>
                <span className="info-value">{user.branch}</span>
              </div>
            </div>
            <div className="info-item">
              <FaBirthdayCake className="info-icon" />
              <div className="info-details">
                <span className="info-label">Age Group</span>
                <span className="info-value">{user.ageGroup}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <h3>My Stats</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <FaCoins className="stat-icon" />
              <div className="stat-details">
                <span className="stat-value">{userPoints}</span>
                <span className="stat-label">Points</span>
              </div>
            </div>
            <div className="stat-card">
              <FaShoppingCart className="stat-icon" />
              <div className="stat-details">
                <span className="stat-value">{purchases.length}</span>
                <span className="stat-label">Purchases</span>
              </div>
            </div>
          </div>
        </div>

        <div className="purchases-section">
          <h3>Recent Purchases</h3>
          {purchases.length === 0 ? (
            <p className="no-purchases">No purchases yet. Start earning points!</p>
          ) : (
            <div className="purchases-list">
              {purchases.slice().reverse().map((purchase, index) => (
                <div key={index} className="purchase-item">
                  <div className="purchase-info">
                    <span className="purchase-name">{purchase.prizeName}</span>
                    <span className="purchase-points">-{purchase.points} pts</span>
                  </div>
                  <span className="purchase-date">
                    {new Date(purchase.purchaseDate).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
