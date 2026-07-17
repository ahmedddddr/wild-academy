import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaBell, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './AdminNotifications.css';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [targetBranch, setTargetBranch] = useState('');
  const [targetAgeGroup, setTargetAgeGroup] = useState('all');
  const [type, setType] = useState('info');
  const [priority, setPriority] = useState('normal');
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/notifications/all');
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleSend = async () => {
    console.log('Send button clicked');
    console.log('Form data:', { title, message, targetBranch, targetAgeGroup, type, priority });
    
    if (!title || !message || !targetBranch) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      console.log('Sending to API...');
      const response = await fetch('http://localhost:3001/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          message,
          targetBranch,
          targetAgeGroup,
          type,
          priority
        })
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        // Reset form
        setTitle('');
        setMessage('');
        setTargetBranch('');
        setTargetAgeGroup('all');
        setType('info');
        setPriority('normal');

        alert('Notification sent successfully!');
        fetchNotifications();
      } else {
        alert('Failed to send notification: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/notifications/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchNotifications();
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
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
    return date.toLocaleString();
  };

  return (
    <div className="admin-notifications-container">
      <header className="admin-notifications-header">
        <button className="back-button" onClick={() => navigate('/admin/dashboard')}>
          <FaArrowLeft />
        </button>
        <div className="header-content">
          <div className="header-icon-wrapper">
            <FaBell className="header-bell" />
          </div>
          <h1 className="notifications-title">Notification Manager</h1>
        </div>
        <div className="header-spacer"></div>
      </header>

      <div className="admin-notifications-content">
        {/* Create Notification Form */}
        <div className="create-notification-section">
          <h2>Create New Notification</h2>
          <div className="notification-form">
            <div className="form-row">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Notification title"
                />
              </div>

              <div className="form-group">
                <label>Type</label>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="info">Info</option>
                  <option value="event">Event</option>
                  <option value="alert">Alert</option>
                  <option value="achievement">Achievement</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Target Branch *</label>
                <select value={targetBranch} onChange={(e) => setTargetBranch(e.target.value)}>
                  <option value="">Select branch...</option>
                  <option value="TBS">TBS – Rehab</option>
                  <option value="Madinaty">Madinaty Sports Club</option>
                  <option value="MILS">MILS – Madinaty</option>
                  <option value="BISM">BISM – Madinaty</option>
                  <option value="Capital">Capital School – New Cairo</option>
                </select>
              </div>

              <div className="form-group">
                <label>Target Age Group</label>
                <select value={targetAgeGroup} onChange={(e) => setTargetAgeGroup(e.target.value)}>
                  <option value="all">All Ages</option>
                  <option value="4-6">4-6 years</option>
                  <option value="7-9">7-9 years</option>
                  <option value="10-14">10-14 years</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Priority</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="normal">Normal</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="form-group full-width">
              <label>Message *</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your notification message..."
                rows="4"
              />
            </div>

            <button className="send-btn" onClick={handleSend}>
              <FaBell /> Send Notification
            </button>
          </div>
        </div>

        {/* Existing Notifications */}
        <div className="existing-notifications-section">
          <h2>Sent Notifications</h2>
          {notifications.length === 0 ? (
            <div className="no-notifications">
              <div className="no-notifications-icon">📭</div>
              <p>No notifications sent yet</p>
            </div>
          ) : (
            <div className="notifications-list">
              {notifications.map((notification) => (
                <div key={notification.id} className="notification-item">
                  <div className="notification-item-icon">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="notification-item-content">
                    <div className="notification-item-header">
                      <h4>{notification.title}</h4>
                      <span className="notification-time">{formatTime(notification.createdAt)}</span>
                    </div>
                    <p>{notification.message}</p>
                    <div className="notification-meta">
                      <span className="meta-tag">Branch: {notification.targetBranch}</span>
                      <span className="meta-tag">Age: {notification.targetAgeGroup}</span>
                      {notification.priority === 'urgent' && (
                        <span className="urgent-badge">Urgent</span>
                      )}
                    </div>
                  </div>
                  <button 
                    className="delete-btn"
                    onClick={() => handleDelete(notification.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNotifications;
