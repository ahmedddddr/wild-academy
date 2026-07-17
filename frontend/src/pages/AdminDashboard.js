import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaCalendarAlt, FaClipboardList, FaCamera, FaComments, FaTrophy, FaBullseye, FaBell, FaMedal, FaAward, FaBox } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="admin-grid">
        <div className="admin-card" onClick={() => navigate('/admin/users')}>
          <FaUser className="admin-icon" />
          <p>User Generator</p>
        </div>

        <div className="admin-card" onClick={() => navigate('/admin/timetable')}>
          <FaCalendarAlt className="admin-icon" />
          <p>Timetable Manager</p>
        </div>

        <div className="admin-card" onClick={() => navigate('/admin/applications')}>
          <FaClipboardList className="admin-icon" />
          <p>Applications</p>
        </div>

        <div className="admin-card" onClick={() => navigate('/admin/media')}>
          <FaCamera className="admin-icon" />
          <p>Lost and Found Manager</p>
        </div>

        <div className="admin-card" onClick={() => navigate('/admin/chat')}>
          <FaComments className="admin-icon" />
          <p>Chat Manager</p>
        </div>

        <div className="admin-card" onClick={() => navigate('/admin/leaderboard')}>
          <FaTrophy className="admin-icon" />
          <p>Leaderboard</p>
        </div>

        <div className="admin-card" onClick={() => navigate('/admin/badges')}>
          <FaMedal className="admin-icon" />
          <p>Badge Manager</p>
        </div>

        <div className="admin-card" onClick={() => navigate('/admin/achievements')}>
          <FaAward className="admin-icon" />
          <p>Achievements</p>
        </div>

        <div className="admin-card" onClick={() => navigate('/admin/activities')}>
          <FaBullseye className="admin-icon" />
          <p>Activities Control</p>
        </div>

        <div className="admin-card" onClick={() => navigate('/admin/notifications')}>
          <FaBell className="admin-icon" />
          <p>Notifications</p>
        </div>

        <div className="admin-card" onClick={() => navigate('/admin/prizes')}>
          <FaBox className="admin-icon" />
          <p>Prize Manager</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
