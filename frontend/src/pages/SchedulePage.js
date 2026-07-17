import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './SchedulePage.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const SchedulePage = ({ user }) => {
  const [timetable, setTimetable] = useState([]);
  const [selectedDay, setSelectedDay] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTimetable();
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

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Group sessions by day for display
  const groupedTimetable = timetable.reduce((acc, session) => {
    if (!acc[session.day]) {
      acc[session.day] = [];
    }
    acc[session.day].push(session);
    return acc;
  }, {});

  const filteredTimetable = selectedDay === 'All'
    ? Object.entries(groupedTimetable)
    : Object.entries(groupedTimetable).filter(([day]) => day === selectedDay);

  const getSessionIcon = (activity) => {
    const activityLower = activity.toLowerCase();
    if (activityLower.includes('swim')) return '🏊';
    if (activityLower.includes('football') || activityLower.includes('soccer')) return '⚽';
    if (activityLower.includes('basketball')) return '🏀';
    if (activityLower.includes('tennis')) return '🎾';
    if (activityLower.includes('art') || activityLower.includes('paint')) return '🎨';
    if (activityLower.includes('music')) return '🎵';
    if (activityLower.includes('dance')) return '💃';
    if (activityLower.includes('cooking')) return '👨‍🍳';
    if (activityLower.includes('science')) return '🔬';
    if (activityLower.includes('read') || activityLower.includes('story')) return '📚';
    if (activityLower.includes('quran')) return '📖';
    if (activityLower.includes('fitness') || activityLower.includes('gym')) return '💪';
    if (activityLower.includes('martial') || activityLower.includes('karate')) return '🥋';
    if (activityLower.includes('archery')) return '🏹';
    if (activityLower.includes('zumba')) return '🎶';
    if (activityLower.includes('treasure')) return '🗺️';
    if (activityLower.includes('ai')) return '🤖';
    if (activityLower.includes('foundation')) return '🧱';
    if (activityLower.includes('volleyball')) return '🏐';
    return '⭐';
  };

  return (
    <div className="schedule-container">
      <header className="schedule-header">
        <button className="back-button" onClick={() => navigate('/main')}>
          <FaArrowLeft />
        </button>
        <h1 className="schedule-title">My Schedule</h1>
        <div className="header-info">
          <span className="branch-badge">{user.branch}</span>
          <span className="age-badge">{user.ageGroup} years</span>
        </div>
      </header>

      <div className="day-filter">
        <button 
          className={`filter-btn ${selectedDay === 'All' ? 'active' : ''}`}
          onClick={() => setSelectedDay('All')}
        >
          All Days
        </button>
        {days.map(day => (
          <button
            key={day}
            className={`filter-btn ${selectedDay === day ? 'active' : ''}`}
            onClick={() => setSelectedDay(day)}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="schedule-content">
        {Object.keys(groupedTimetable).length === 0 ? (
          <div className="no-schedule">
            <div className="no-schedule-icon">📅</div>
            <h3>No Schedule Yet</h3>
            <p>Your schedule will appear here once it's set up by the academy.</p>
          </div>
        ) : (
          <div className="schedule-grid">
            {filteredTimetable.map(([dayName, sessions]) => (
              <div key={dayName} className="day-card">
                <div className="day-header">
                  <h3>{dayName}</h3>
                  <span className="session-count">{sessions.length} sessions</span>
                </div>
                <div className="sessions-list">
                  {sessions.map((session) => (
                    <div key={session._id} className="session-card">
                      <div className="session-icon">
                        {getSessionIcon(session.activity)}
                      </div>
                      <div className="session-info">
                        <div className="session-time">{session.time}</div>
                        <div className="session-activity">{session.activity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SchedulePage;
