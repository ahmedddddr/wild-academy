import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CoursePage.css';

const CoursePage = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const navigate = useNavigate();
  const contentDisplayRef = useRef(null);
  const contentAreaRef = useRef(null);

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

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    if (contentDisplayRef.current) {
      contentDisplayRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen && contentAreaRef.current) {
      if (contentAreaRef.current.requestFullscreen) {
        contentAreaRef.current.requestFullscreen();
      } else if (contentAreaRef.current.webkitRequestFullscreen) {
        contentAreaRef.current.webkitRequestFullscreen();
      } else if (contentAreaRef.current.msRequestFullscreen) {
        contentAreaRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
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
              onClick={() => handleSectionClick(section.id)}
            >
              <span className="nav-icon">{section.icon}</span>
              <span className="nav-title">{section.title}</span>
              <img src={section.image} alt={section.title} className="nav-image" />
            </div>
          ))}
        </div>

        {/* Content Display with Navigation */}
        <div className="content-display" ref={contentDisplayRef}>
          <button 
            className="nav-button prev-button" 
            onClick={goToPrevious}
            disabled={currentIndex === 0}
          >
            ← Previous
          </button>

          <div className="content-area" ref={contentAreaRef}>
            <button 
              className="fullscreen-button"
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? "✕" : "⛶"}
            </button>
            
            {sections.find(s => s.id === activeSection)?.gameUrl ? (
              <div className="game-container">
                <div className="game-header">
                  <h2>🎨 Quick Draw Game</h2>
                  <p>Draw something and watch the AI guess what it is!</p>
                  <a 
                    href="https://quickdraw.withgoogle.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="gamelink-button"
                  >
                    Play Quick Draw Game →
                  </a>
                </div>
                <img
                  src={sections.find(s => s.id === activeSection)?.image}
                  alt={sections.find(s => s.id === activeSection)?.title}
                  className="game-image"
                  onError={(e) => {
                    console.error('Image failed to load:', sections.find(s => s.id === activeSection)?.image);
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            ) : (
              <div className="section-content">
                <img
                  src={sections.find(s => s.id === activeSection)?.image}
                  alt={sections.find(s => s.id === activeSection)?.title}
                  className="section-image"
                  onError={(e) => {
                    console.error('Image failed to load:', sections.find(s => s.id === activeSection)?.image);
                    e.target.style.display = 'none';
                  }}
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
