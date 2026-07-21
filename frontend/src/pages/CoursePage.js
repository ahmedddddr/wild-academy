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
    { id: 'quickdraw', title: 'Quick Draw Game', image: '/ai course/quick draw.png', icon: '🎨', gameUrl: 'https://quickdraw.withgoogle.com/' },
    { id: 'ai-guess', title: 'AI Guess Game', image: '/ai course/ai guess.png', icon: '🎮', gameUrl: 'https://experiments.withgoogle.com/ai-experiments/list/ai-duet' },
    { id: 'games', title: 'More Games', icon: '🎲' }
  ];

  const gameLinks = [
    { name: 'Teachable Machine', url: 'https://teachablemachine.withgoogle.com/', icon: '🧠' },
    { name: 'AI Experiments', url: 'https://experiments.withgoogle.com/ai', icon: '🔬' },
    { name: 'Mystery Animal', url: 'https://experiments.withgoogle.com/ai-experiments/list/mystery-animal', icon: '🦁' },
    { name: 'Emoji Scavenger Hunt', url: 'https://experiments.withgoogle.com/ai-experiments/list/emoji-scavenger-hunt', icon: '🔍' }
  ];

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
            </div>
          ))}
        </div>

        {/* Content Display */}
        <div className="content-display">
          {activeSection === 'games' ? (
            <div className="games-section">
              <h2>🎮 More AI Games</h2>
              <p>Click on any game to play and learn more about AI!</p>
              <div className="games-grid">
                {gameLinks.map((game, index) => (
                  <a
                    key={index}
                    href={game.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="game-card"
                  >
                    <span className="game-icon">{game.icon}</span>
                    <span className="game-name">{game.name}</span>
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div className="section-content">
              {sections.find(s => s.id === activeSection)?.gameUrl ? (
                <div className="game-iframe-container">
                  <iframe
                    src={sections.find(s => s.id === activeSection)?.gameUrl}
                    className="game-iframe"
                    title={sections.find(s => s.id === activeSection)?.title}
                    allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone"
                  />
                </div>
              ) : (
                <img
                  src={sections.find(s => s.id === activeSection)?.image}
                  alt={sections.find(s => s.id === activeSection)?.title}
                  className="section-image"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
