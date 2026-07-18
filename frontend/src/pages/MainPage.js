import React, { useState, useEffect } from 'react';
import './MainPage.css';
import { FaTrophy, FaUserCircle, FaComments, FaCamera, FaCalendarAlt, FaClipboardList, FaBullseye, FaBell, FaShoppingCart, FaStar, FaFire, FaClock, FaArrowRight } from 'react-icons/fa';
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
      <header className="header">
        <div className="left-header">
          <img src="/wild_logo.png" alt="Wild Academy Logo" className="logo" />
          <div>
            <h1 className="welcome-text">Welcome, {user.username} 👋</h1>
            <p className="welcome-subtitle">{user.branch} • {user.ageGroup} years</p>
          </div>
        </div>
        <div className="right-header">
          <div className="notification-icon" title="Notifications" onClick={() => navigate('/notifications')}>
            <FaBell className="header-icon" />
            {hasNotifications && <span className="notification-badge"></span>}
          </div>
          <FaUserCircle className="header-icon" title="Profile" onClick={() => navigate('/profile')} />
        </div>
      </header>

      {/* Quick Stats Section */}
      <div className="quick-stats">
        <div className="stat-card featured">
          <div className="stat-icon-wrapper">
            <FaStar className="stat-icon" />
          </div>
          <div className="stat-content">
            <span className="stat-value">{userPoints}</span>
            <span className="stat-label">Total Points</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper secondary">
            <FaFire className="stat-icon" />
          </div>
          <div className="stat-content">
            <span className="stat-value">{todaySession ? todaySession.sessions.length : 0}</span>
            <span className="stat-label">Today's Sessions</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper tertiary">
            <FaBell className="stat-icon" />
          </div>
          <div className="stat-content">
            <span className="stat-value">{hasNotifications ? 'New' : 'None'}</span>
            <span className="stat-label">Notifications</span>
          </div>
        </div>
      </div>

      {/* Quick Access Shortcuts */}
      <div className="shortcuts-section">
        <h2 className="section-title">Quick Access</h2>
        <div className="shortcuts-grid">
          <div className="shortcut-card primary" onClick={() => navigate('/schedule')}>
            <div className="shortcut-icon">
              <FaCalendarAlt />
            </div>
            <div className="shortcut-content">
              <h3>My Schedule</h3>
              <p>View your weekly timetable</p>
            </div>
            <FaArrowRight className="shortcut-arrow" />
          </div>

          <div className="shortcut-card secondary" onClick={() => navigate('/achievements')}>
            <div className="shortcut-icon">
              <FaClipboardList />
            </div>
            <div className="shortcut-content">
              <h3>Achievements</h3>
              <p>Track your progress</p>
            </div>
            <FaArrowRight className="shortcut-arrow" />
          </div>

          <div className="shortcut-card tertiary" onClick={() => navigate('/shop')}>
            <div className="shortcut-icon">
              <FaShoppingCart />
            </div>
            <div className="shortcut-content">
              <h3>Prize Shop</h3>
              <p>Spend your points</p>
            </div>
            <FaArrowRight className="shortcut-arrow" />
          </div>
        </div>
      </div>

      {/* All Features Grid */}
      <div className="features-section">
        <h2 className="section-title">All Features</h2>
        <div className="features-grid">
          <div className="feature-card" onClick={() => navigate('/media')}>
            <FaCamera className="feature-icon" />
            <h3>Lost and Found</h3>
          </div>

          <div className="feature-card" onClick={() => navigate('/chat')}>
            <FaComments className="feature-icon" />
            <h3>Messages</h3>
          </div>

          <div className="feature-card" onClick={() => navigate('/leaderboard')}>
            <FaTrophy className="feature-icon" />
            <h3>Leaderboard</h3>
          </div>

          <div className="feature-card" onClick={() => navigate('/activities')}>
            <FaBullseye className="feature-icon" />
            <h3>My Activities</h3>
          </div>
        </div>
      </div>

      {/* Today's Session */}
      <section className="today-session">
        <div className="session-header">
          <FaClock className="session-header-icon" />
          <h2>Today's Session</h2>
        </div>
        {todaySession ? (
          <div className="sessions-list">
            {todaySession.sessions.map((session, i) => (
              <div key={i} className="session-box">
                <span className="session-time">{session.time}</span>
                <span className="session-activity">{session.activity}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-session">
            <p>No session scheduled for today.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default MainPage;
