import React, { useState } from 'react';
import { FaArrowLeft, FaBook, FaRobot, FaLaptopCode, FaMicrochip, FaGamepad } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './CoursePage.css';

const CoursePage = () => {
  const [activeTab, setActiveTab] = useState('pdf');
  const navigate = useNavigate();

  const sections = [
    { id: 'hardware', title: 'Hardware & Software', icon: FaMicrochip },
    { id: 'os', title: 'Operating Systems', icon: FaLaptopCode },
    { id: 'binary', title: 'Binary Language', icon: FaBook },
    { id: 'programming', title: 'Programming Fields', icon: FaLaptopCode },
    { id: 'ai', title: 'Introduction to AI', icon: FaRobot }
  ];

  return (
    <div className="course-container">
      <header className="course-header">
        <div className="header-content">
          <div className="logo-wrapper">
            <div className="logo-icon">🦁</div>
            <div className="logo-text">
              <span className="logo-name">Wild</span>
              <span className="logo-academy">Academy</span>
            </div>
          </div>
          <h1 className="course-title">Computer & AI Course</h1>
        </div>
      </header>

      <div className="course-content">
        {/* Navigation Tabs */}
        <div className="course-tabs">
          <button 
            className={`tab-btn ${activeTab === 'pdf' ? 'active' : ''}`}
            onClick={() => setActiveTab('pdf')}
          >
            <FaBook /> Course Materials
          </button>
          <button 
            className={`tab-btn ${activeTab === 'quickdraw' ? 'active' : ''}`}
            onClick={() => setActiveTab('quickdraw')}
          >
            <FaGamepad /> Quick Draw Game
          </button>
        </div>

        {/* PDF Viewer Section */}
        {activeTab === 'pdf' && (
          <div className="pdf-section">
            <div className="section-intro">
              <h2>Welcome to Computer & AI Course!</h2>
              <p>Learn about computers, programming, and artificial intelligence through this interactive course.</p>
            </div>

            <div className="course-sections">
              {sections.map((section) => (
                <div key={section.id} className="section-card">
                  <div className="section-icon">
                    <section.icon />
                  </div>
                  <h3>{section.title}</h3>
                  <p>Click to view this section</p>
                </div>
              ))}
            </div>

            <div className="pdf-viewer-container">
              <div className="pdf-placeholder">
                <div className="pdf-icon">📄</div>
                <h3>Course PDF</h3>
                <p>Place your course PDF file in the public folder and update the path below</p>
                <div className="pdf-instructions">
                  <p><strong>To add your PDF:</strong></p>
                  <ol>
                    <li>Put your PDF file in: <code>frontend/public/course.pdf</code></li>
                    <li>Update the iframe src in CoursePage.js to: <code>/course.pdf</code></li>
                  </ol>
                </div>
                <iframe 
                  src="/course.pdf" 
                  className="pdf-iframe"
                  title="Course PDF"
                />
              </div>
            </div>
          </div>
        )}

        {/* Quick Draw Section */}
        {activeTab === 'quickdraw' && (
          <div className="quickdraw-section">
            <div className="quickdraw-intro">
              <h2>Quick Draw - AI Drawing Game</h2>
              <p>Draw something and watch the AI guess what it is! This game uses machine learning to recognize your drawings in real-time.</p>
              <div className="quickdraw-tips">
                <h3>Tips for playing:</h3>
                <ul>
                  <li>Draw clearly and simply</li>
                  <li>Use simple shapes</li>
                  <li>Try common objects like: cat, dog, car, house, tree</li>
                  <li>Have fun and experiment!</li>
                </ul>
              </div>
            </div>
            <div className="quickdraw-iframe-container">
              <iframe 
                src="https://quickdraw.withgoogle.com/" 
                className="quickdraw-iframe"
                title="Quick Draw Game"
                allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePage;
