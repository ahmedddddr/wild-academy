import React, { useState, useEffect } from 'react';
import './TimetableManager.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const ACTIVITIES = [
  'Swimming',
  'Football',
  'Basketball',
  'Art',
  'Music',
  'Dance',
  'Science',
  'Coding',
  'Yoga',
  'Martial Arts',
  'Drama',
  'Cooking',
  'Reading',
  'Math',
  'Language',
  'Nature',
  'Crafts',
  'Chess',
  'Photography',
  'Gardening'
];

const BRANCHES = [
  'German future school – Rehab',
  'Othman Bin affan school – Rehab',
  'Madinaty Sports Club',
  'MILS – Madinaty',
  'MIOLS – Madinaty',
  'Carleton College – El Shorouk'
];

const AGE_GROUPS = ['4-6', '7-9', '10-14'];

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

const TimetableManagerV2 = () => {
  const [branch, setBranch] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [timetable, setTimetable] = useState([]);
  const [day, setDay] = useState('');
  const [sessionTime, setSessionTime] = useState('');
  const [activity, setActivity] = useState('');
  const [editingSession, setEditingSession] = useState(null);
  const [editTime, setEditTime] = useState('');
  const [editActivity, setEditActivity] = useState('');

  const activities = [
    'Swimming', 'Football', 'Basketball', 'Tennis', 'Art', 'Music', 
    'Dance', 'Cooking', 'Science', 'Reading', 'Quran', 'Fitness',
    'Martial Arts', 'Archery', 'Zumba', 'Treasure Hunt', 'AI', 
    'Foundation', 'Volleyball', 'Story Telling'
  ];

  useEffect(() => {
    if (branch && ageGroup) {
      fetchTimetable();
    }
  }, [branch, ageGroup]);

  const fetchTimetable = async () => {
    try {
      const response = await fetch(`${API_URL}/api/timetable/${branch}/${ageGroup}`);
      const data = await response.json();
      setTimetable(data);
    } catch (error) {
      console.error('Error fetching timetable:', error);
    }
  };

  const handleAdd = async () => {
    if (!branch || !ageGroup || !day || !sessionTime || !activity) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/timetable`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          branch,
          ageGroup,
          day,
          time: sessionTime,
          activity
        })
      });

      if (response.ok) {
        // Reset form
        setDay('');
        setSessionTime('');
        setActivity('');
        fetchTimetable();
      }
    } catch (error) {
      console.error('Error adding session:', error);
      alert('Failed to add session');
    }
  };

  const handleDeleteSession = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/timetable/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchTimetable();
      }
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };

  const handleEditSession = (session) => {
    setEditingSession(session._id);
    setEditTime(session.time);
    setEditActivity(session.activity);
  };

  const handleCancelEdit = () => {
    setEditingSession(null);
    setEditTime('');
    setEditActivity('');
  };

  const handleSaveEdit = async (sessionId) => {
    if (!editTime || !editActivity) {
      alert('Please fill all fields');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/timetable/${sessionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          time: editTime,
          activity: editActivity
        })
      });

      if (response.ok) {
        handleCancelEdit();
        fetchTimetable();
      } else {
        alert('Failed to update session');
      }
    } catch (error) {
      console.error('Error updating session:', error);
      alert('Failed to update session');
    }
  };

  // Group sessions by day for display
  const groupedTimetable = timetable.reduce((acc, session) => {
    if (!acc[session.day]) {
      acc[session.day] = [];
    }
    acc[session.day].push(session);
    return acc;
  }, {});

  return (
    <div className="timetable-container">
      <div className="timetable-header">
        <h1>Timetable Manager</h1>
        <p className="subtitle">Create and manage schedules for different branches and age groups</p>
      </div>

      {/* Selection Section */}
      <div className="selection-section">
        <div className="selection-card">
          <label>Select Branch</label>
          <select value={branch} onChange={(e) => setBranch(e.target.value)}>
            <option value="">Choose branch...</option>
            <option value="German future school">German future school – Rehab</option>
            <option value="Othman Bin affan school">Othman Bin affan school – Rehab</option>
            <option value="Madinaty">Madinaty Sports Club</option>
            <option value="MILS">MILS – Madinaty</option>
            <option value="MIOLS">MIOLS – Madinaty</option>
            <option value="Carleton College">Carleton College – El Shorouk</option>
          </select>
        </div>

        <div className="selection-card">
          <label>Select Age Group</label>
          <select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)}>
            <option value="">Choose age group...</option>
            <option value="4-6">4-6 years</option>
            <option value="7-9">7-9 years</option>
            <option value="10-14">10-14 years</option>
          </select>
        </div>
      </div>

      {/* Timetable Content */}
      {branch && ageGroup && (
        <div className="timetable-content">
          {/* Add Session Form */}
          <div className="add-session-section">
            <h3>Add New Session</h3>
            <div className="add-session-form">
              <div className="form-group">
                <label>Day</label>
                <select value={day} onChange={(e) => setDay(e.target.value)}>
                  <option value="">Select day...</option>
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </select>
              </div>

              <div className="form-group">
                <label>Time</label>
                <input
                  type="time"
                  value={sessionTime}
                  onChange={(e) => setSessionTime(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Activity</label>
                <select value={activity} onChange={(e) => setActivity(e.target.value)}>
                  <option value="">Select activity...</option>
                  {activities.map(act => (
                    <option key={act} value={act}>{act}</option>
                  ))}
                </select>
              </div>

              <button className="add-btn" onClick={handleAdd}>
                <span>+</span> Add Session
              </button>
            </div>
          </div>

          {/* Existing Timetable */}
          <div className="existing-timetable-section">
            <h3>Current Schedule</h3>
            {timetable.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📅</div>
                <p>No sessions scheduled yet</p>
              </div>
            ) : (
              <div className="timetable-grid">
                {Object.entries(groupedTimetable).map(([dayName, sessions]) => (
                  <div key={dayName} className="day-card">
                    <div className="day-card-header">
                      <h4>{dayName}</h4>
                      <span className="session-count">{sessions.length} sessions</span>
                    </div>
                    <div className="day-sessions">
                      {sessions.map((session) => (
                        <div key={session._id} className="session-item">
                          {editingSession === session._id ? (
                            <div className="session-edit-form">
                              <input
                                type="time"
                                value={editTime}
                                onChange={(e) => setEditTime(e.target.value)}
                                className="edit-input"
                              />
                              <select
                                value={editActivity}
                                onChange={(e) => setEditActivity(e.target.value)}
                                className="edit-input"
                              >
                                {activities.map(act => (
                                  <option key={act} value={act}>{act}</option>
                                ))}
                              </select>
                              <button 
                                className="save-btn"
                                onClick={() => handleSaveEdit(session._id)}
                              >
                                ✓
                              </button>
                              <button 
                                className="cancel-btn"
                                onClick={handleCancelEdit}
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <>
                              <div className="session-info">
                                <span className="session-time">{session.time}</span>
                                <span className="session-activity">{session.activity}</span>
                              </div>
                              <div className="session-actions">
                                <button 
                                  className="edit-btn"
                                  onClick={() => handleEditSession(session)}
                                >
                                  ✎
                                </button>
                                <button 
                                  className="delete-btn"
                                  onClick={() => handleDeleteSession(session._id)}
                                >
                                  ✕
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimetableManagerV2;
