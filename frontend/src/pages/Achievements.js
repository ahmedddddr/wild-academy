import React, { useState, useEffect } from 'react';
import { FaTrophy, FaStar, FaMedal, FaAward, FaFire, FaBolt, FaGem, FaCrown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Achievements.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const Achievements = ({ user }) => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPoints, setTotalPoints] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAchievements();
  }, [user]);

  const fetchAchievements = async () => {
    try {
      const response = await fetch(`${API_URL}/api/achievements/user/${user.username}`);
      const data = await response.json();
      setAchievements(data);
      const points = data.reduce((sum, achievement) => sum + (achievement.points || 0), 0);
      setTotalPoints(points);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching achievements:', error);
      setLoading(false);
    }
  };

  const getIcon = (icon) => {
    const icons = {
      '🏆': <FaTrophy />,
      '⭐': <FaStar />,
      '🥇': <FaMedal />,
      '🎖️': <FaAward />,
      '🔥': <FaFire />,
      '⚡': <FaBolt />,
      '💎': <FaGem />,
      '👑': <FaCrown />
    };
    return icons[icon] || <FaTrophy />;
  };

  const getAchievementType = (points) => {
    if (points >= 100) return { class: 'legendary', label: 'Legendary' };
    if (points >= 50) return { class: 'epic', label: 'Epic' };
    if (points >= 25) return { class: 'rare', label: 'Rare' };
    return { class: 'common', label: 'Common' };
  };

  if (loading) {
    return <div className="achievements-container"><p>Loading achievements...</p></div>;
  }

  return (
    <div className="achievements-container">
      <header className="achievements-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>← Back</button>
        <h1>🏆 My Achievements</h1>
        <p>{user.username}</p>
      </header>

      <div className="stats-section">
        <div className="stat-card">
          <span className="stat-number">{achievements.length}</span>
          <span className="stat-label">Achievements</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{totalPoints}</span>
          <span className="stat-label">Total Points</span>
        </div>
      </div>

      {achievements.length === 0 ? (
        <div className="no-data">
          <p>No achievements yet. Complete activities to earn your first achievement!</p>
        </div>
      ) : (
        <div className="achievements-grid">
          {achievements.map((achievement, index) => {
            const type = getAchievementType(achievement.points);
            return (
              <div key={index} className={`achievement-card ${type.class}`}>
                <div className="achievement-icon">
                  {getIcon(achievement.icon)}
                </div>
                <div className="achievement-info">
                  <h3>{achievement.title}</h3>
                  {achievement.description && (
                    <p className="achievement-description">{achievement.description}</p>
                  )}
                  <div className="achievement-meta">
                    <span className="achievement-type">{type.label}</span>
                    <span className="achievement-points">+{achievement.points} pts</span>
                  </div>
                  <span className="achievement-date">
                    {new Date(achievement.dateEarned).toLocaleDateString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Achievements;
