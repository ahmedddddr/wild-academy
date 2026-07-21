import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CoursePage.css';

const CoursePage = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const navigate = useNavigate();

  const sections = [
    { id: 'intro', title: 'Introduction', image: '/ai course/first page.png', icon: '📚' },
    { id: 'hardware', title: 'Hardware & Software', image: '/ai course/hardware and software.png', icon: '💻' },
    { id: 'os', title: 'Operating Systems', image: '/ai course/os.png', icon: '⚙️' },
    { id: 'binary', title: 'Binary Language', image: '/ai course/binary.png', icon: '🔢' },
    { id: 'fields', title: '5 Programming Fields', image: '/ai course/5 fields.png', icon: '🎯' },
    { id: 'ai-intro', title: 'Introduction to AI', image: '/ai course/ai intro.png', icon: '🤖' },
    { id: 'quickdraw', title: 'Quick Draw Game', image: '/ai course/quick draw.png', icon: '🎨', gameUrl: 'https://quickdraw.withgoogle.com/' }
  ];

  const currentIndex = sections.findIndex(s => s.id === activeSection);

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id);
    }
  };

  const goToNext = () => {
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].id);
    }
  };

  return (
    <div className="course-container">
      <header className="course-header">
        <div className="header-content">
          <div className="logo-wrapper">
            <img src="/wild_logo.png" alt="Wild Academy Logo" className="logo-icon" />
            <div className="logo-text">
              <span className="logo-name">Wild</span>
              <span className="logo-academy">Academy</span>
            </div>
          </div>
          <h1 className="course-title">Computer & AI Course</h1>
        </div>
      </header>

      <div className="course-content">
        {/* Navigation Cards */}
        <div className="course-nav">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`nav-card ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <span className="nav-icon">{section.icon}</span>
              <span className="nav-title">{section.title}</span>
              <img src={section.image} alt={section.title} className="nav-image" />
            </div>
          ))}
        </div>

        {/* Content Display with Navigation */}
        <div className="content-display">
          <button 
            className="nav-button prev-button" 
            onClick={goToPrevious}
            disabled={currentIndex === 0}
          >
            ← Previous
          </button>

          <div className="content-area">
            {sections.find(s => s.id === activeSection)?.gameUrl ? (
              <div className="game-iframe-container">
                <div className="game-header">
                  <h2>🎨 Quick Draw Game</h2>
                  <p>Draw something and watch the AI guess what it is!</p>
                  <a 
                    href="https://quickdraw.withgoogle.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="game-link"
                  >
                    Open Quick Draw in new tab →
                  </a>
                </div>
                <iframe
                  src={sections.find(s => s.id === activeSection)?.gameUrl}
                  className="game-iframe"
                  title={sections.find(s => s.id === activeSection)?.title}
                  allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone"
                />
              </div>
            ) : (
              <div className="section-content">
                <img
                  src={sections.find(s => s.id === activeSection)?.image}
                  alt={sections.find(s => s.id === activeSection)?.title}
                  className="section-image"
                />
              </div>
            )}
          </div>

          <button 
            className="nav-button next-button" 
            onClick={goToNext}
            disabled={currentIndex === sections.length - 1}
          >
            Next →
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="progress-indicator">
          <span className="progress-text">
            {currentIndex + 1} of {sections.length}
          </span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentIndex + 1) / sections.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
