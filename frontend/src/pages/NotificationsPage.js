import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './NotificationsPage.css';

const NotificationsPage = ({ user }) => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/notifications/${user.branch}/${user.ageGroup}`);
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'event': return '🎉';
      case 'alert': return '⚠️';
      case 'info': return 'ℹ️';
      case 'achievement': return '🏆';
      default: return '📢';
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="notifications-container">
      <header className="notifications-header">
        <button className="back-button" onClick={() => navigate('/main')}>
          <FaArrowLeft />
        </button>
        <div className="header-content">
          <div className="header-icon-wrapper">
            <FaBell className="header-bell" />
          </div>
          <h1 className="notifications-title">Notifications</h1>
        </div>
        <div className="header-spacer"></div>
      </header>

      <div className="notifications-content">
        {notifications.length === 0 ? (
          <div className="no-notifications">
            <div className="no-notifications-icon">🔔</div>
            <h3>No Notifications</h3>
            <p>You're all caught up! Check back later for updates from Wild Academy.</p>
          </div>
        ) : (
          <div className="notifications-list">
            {notifications.map((notification, index) => (
              <div key={index} className="notification-card">
                <div className="notification-icon">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="notification-content">
                  <div className="notification-header">
                    <h4 className="notification-title">{notification.title}</h4>
                    <span className="notification-time">{formatTime(notification.createdAt)}</span>
                  </div>
                  <p className="notification-message">{notification.message}</p>
                  {notification.priority === 'urgent' && (
                    <span className="priority-badge">Urgent</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
