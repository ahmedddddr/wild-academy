import React, { useState, useEffect } from 'react';
import './MainPage.css';
import { FaTrophy, FaUserCircle, FaComments, FaCamera, FaCalendarAlt, FaClipboardList, FaBullseye, FaBell, FaShoppingCart, FaStar, FaFire, FaClock, FaArrowRight, FaGem, FaChartLine, FaMedal } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const MainPage = ({ user }) => {
  const [timetable, setTimetable] = useState([]);
  const [hasNotifications, setHasNotifications] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTimetable();
    checkNotifications();
    fetchUserPoints();
  }, [user]);

  const fetchTimetable = async () => {
    try {
      const response = await fetch(`${API_URL}/api/timetable/${user.branch}/${user.ageGroup}`);
      const data = await response.json();
      setTimetable(data);
    } catch (error) {
      console.error('Error fetching timetable:', error);
    }
  };

  const checkNotifications = async () => {
    try {
      const response = await fetch(`${API_URL}/api/notifications/${user.branch}/${user.ageGroup}`);
      const data = await response.json();
      setHasNotifications(data.length > 0);
    } catch (error) {
      console.error('Error checking notifications:', error);
    }
  };

  const fetchUserPoints = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users`);
      const data = await response.json();
      const currentUser = data.find(u => u.username === user?.username);
      setUserPoints(currentUser?.points || 0);
    } catch (error) {
      console.error('Error fetching user points:', error);
    }
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaySession = timetable.find(item => item.day === today);

  return (
    <div className="main-container">
      {/* Glass Header */}
      <header className="glass-header">
        <div className="header-content">
          <div className="logo-section">
            <img src="/wild_logo.png" alt="Wild Academy Logo" className="logo" />
            <div className="user-info">
              <h1 className="welcome-text">Welcome back, {user.username}</h1>
              <div className="user-meta">
                <span className="meta-tag">{user.branch}</span>
                <span className="meta-tag">{user.ageGroup} years</span>
              </div>
            </div>
          </div>
          <div className="header-actions">
            <div className="action-btn notification-btn" onClick={() => navigate('/notifications')}>
              <FaBell />
              {hasNotifications && <span className="pulse-dot"></span>}
            </div>
            <div className="action-btn profile-btn" onClick={() => navigate('/profile')}>
              <FaUserCircle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Stats */}
      <div className="hero-stats">
        <div className="hero-card main-stat">
          <div className="stat-glow"></div>
          <div className="stat-icon-large">
            <FaGem />
          </div>
          <div className="stat-info">
            <span className="stat-number">{userPoints}</span>
            <span className="stat-text">Total Points</span>
          </div>
          <div className="stat-trend">
            <FaChartLine />
            <span>Your Progress</span>
          </div>
        </div>
      </div>

      {/* Action Grid */}
      <div className="action-grid">
        <div className="action-card schedule-card" onClick={() => navigate('/schedule')}>
          <div className="card-bg"></div>
          <div className="card-icon">
            <FaCalendarAlt />
          </div>
          <div className="card-content">
            <h3>Schedule</h3>
            <p>View your timetable</p>
          </div>
          <div className="card-arrow">
            <FaArrowRight />
          </div>
        </div>

        <div className="action-card achievements-card" onClick={() => navigate('/achievements')}>
          <div className="card-bg"></div>
          <div className="card-icon">
            <FaMedal />
          </div>
          <div className="card-content">
            <h3>Achievements</h3>
            <p>Track your badges</p>
          </div>
          <div className="card-arrow">
            <FaArrowRight />
          </div>
        </div>

        <div className="action-card shop-card" onClick={() => navigate('/shop')}>
          <div className="card-bg"></div>
          <div className="card-icon">
            <FaShoppingCart />
          </div>
          <div className="card-content">
            <h3>Prize Shop</h3>
            <p>Spend your points</p>
          </div>
          <div className="card-arrow">
            <FaArrowRight />
          </div>
        </div>
      </div>

      {/* Secondary Features */}
      <div className="features-row">
        <div className="mini-card" onClick={() => navigate('/media')}>
          <FaCamera />
          <span>Gallery</span>
        </div>
        <div className="mini-card" onClick={() => navigate('/chat')}>
          <FaComments />
          <span>Messages</span>
        </div>
        <div className="mini-card" onClick={() => navigate('/leaderboard')}>
          <FaTrophy />
          <span>Leaderboard</span>
        </div>
        <div className="mini-card" onClick={() => navigate('/activities')}>
          <FaBullseye />
          <span>Activities</span>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="schedule-section">
        <div className="section-header">
          <div className="section-icon">
            <FaClock />
          </div>
          <h2>Today's Schedule</h2>
        </div>
        {todaySession ? (
          <div className="schedule-list">
            {todaySession.sessions.map((session, i) => (
              <div key={i} className="schedule-item">
                <div className="time-badge">{session.time}</div>
                <div className="activity-name">{session.activity}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <FaClock />
            <p>No sessions today</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
