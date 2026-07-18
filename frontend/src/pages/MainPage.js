import React, { useState, useEffect } from 'react';
import './MainPage.css';
import { FaTrophy, FaUserCircle, FaComments, FaCamera, FaCalendarAlt, FaClipboardList, FaBullseye, FaBell, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const MainPage = ({ user }) => {
  const [timetable, setTimetable] = useState([]);
  const [hasNotifications, setHasNotifications] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTimetable();
    checkNotifications();
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

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaySession = timetable.find(item => item.day === today);

  return (
    <div className="main-container">
      <header className="header">
        <div className="left-header">
          <img src="/wild_logo.png" alt="Wild Academy Logo" className="logo" />
          <h1 className="welcome-text">Welcome, {user.username} 👋</h1>
        </div>
        <div className="right-header">
          <div className="notification-icon" title="Notifications" onClick={() => navigate('/notifications')}>
            <FaBell className="header-icon" />
            {hasNotifications && <span className="notification-badge"></span>}
          </div>
          <FaUserCircle className="header-icon" title="Profile" onClick={() => navigate('/profile')} />
        </div>
      </header>

      <h1 className="dashboard-title">My Dashboard</h1>

      <div className="dashboard-grid">
        <div className="dashboard-card" onClick={() => navigate('/media')}>
          <FaCamera className="dashboard-icon" />
          <p>Lost and Found</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate('/chat')}>
          <FaComments className="dashboard-icon" />
          <p>Messages</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate('/activities')}>
          <FaBullseye className="dashboard-icon" />
          <p>My Activities</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate('/achievements')}>
          <FaClipboardList className="dashboard-icon" />
          <p>Achievements</p>
        </div>

        <div className="dashboard-card" onClick={() => navigate('/shop')}>
          <FaShoppingCart className="dashboard-icon" />
          <p>Prize Shop</p>
        </div>
      </div>

      <section className="today-session">
        <h2>Today's Session</h2>
        {todaySession ? (
          todaySession.sessions.map((session, i) => (
            <div key={i} className="session-box">
              <span>{session.time}</span> - <span>{session.activity}</span>
            </div>
          ))
        ) : (
          <p>No session scheduled for today.</p>
        )}
      </section>

      <nav className="bottom-toolbar">
        <div className="toolbar-item" onClick={() => navigate('/main')}>
          <span className="toolbar-icon">🏠</span>
          <span className="toolbar-label">Home</span>
        </div>
        <div className="toolbar-item" onClick={() => navigate('/leaderboard')}>
          <span className="toolbar-icon">🏆</span>
          <span className="toolbar-label">Leaderboard</span>
        </div>
        <div className="toolbar-item" onClick={() => navigate('/schedule')}>
          <span className="toolbar-icon">📅</span>
          <span className="toolbar-label">Schedule</span>
        </div>
        <div className="toolbar-item" onClick={() => navigate('/profile')}>
          <span className="toolbar-icon">👤</span>
          <span className="toolbar-label">Profile</span>
        </div>
      </nav>
    </div>
  );
};

export default MainPage;
