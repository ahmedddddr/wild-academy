import React, { useState, useEffect } from 'react';
import { FaTrophy, FaMedal, FaAward } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Leaderboard.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const Leaderboard = ({ user }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeaderboard();
  }, [user]);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`${API_URL}/api/leaderboard/${user.branch}/${user.ageGroup}`);
      const data = await response.json();
      setLeaderboard(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <FaTrophy className="gold-medal" />;
    if (rank === 2) return <FaMedal className="silver-medal" />;
    if (rank === 3) return <FaAward className="bronze-medal" />;
    return <span className="rank-number">{rank}</span>;
  };

  const getRankClass = (rank) => {
    if (rank === 1) return 'rank-1';
    if (rank === 2) return 'rank-2';
    if (rank === 3) return 'rank-3';
    return '';
  };

  if (loading) {
    return <div className="leaderboard-container"><p>Loading leaderboard...</p></div>;
  }

  return (
    <div className="leaderboard-container">
      <header className="leaderboard-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>← Back</button>
        <h1>🏆 Leaderboard</h1>
        <p>{user.branch} - Age {user.ageGroup}</p>
      </header>

      {leaderboard.length === 0 ? (
        <div className="no-data">
          <p>No leaderboard data yet. Be the first to earn points!</p>
        </div>
      ) : (
        <div className="leaderboard-list">
          {leaderboard.map((entry, index) => (
            <div 
              key={index} 
              className={`leaderboard-item ${getRankClass(entry.rank)} ${entry.username === user.username ? 'current-user' : ''}`}
            >
              <div className="rank-cell">
                {getRankIcon(entry.rank)}
              </div>
              <div className="user-info">
                <span className="username">{entry.username}</span>
                {entry.username === user.username && <span className="you-badge">YOU</span>}
              </div>
              <div className="points-cell">
                <span className="points">{entry.points}</span>
                <span className="points-label">pts</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="leaderboard-footer">
        <p>Your Rank: {leaderboard.find(e => e.username === user.username)?.rank || 'N/A'}</p>
        <p>Your Points: {leaderboard.find(e => e.username === user.username)?.points || 0}</p>
      </div>
    </div>
  );
};

export default Leaderboard;
