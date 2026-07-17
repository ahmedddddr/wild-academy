import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaArrowLeft } from 'react-icons/fa';
import './BadgeManager.css';

const WILD_ANIMALS = [
  '🦁 Lion', '🐯 Tiger', '🐻 Bear', '🐺 Wolf', '🦊 Fox',
  '🐘 Elephant', '🦒 Giraffe', '🦓 Zebra', '🦏 Rhino', '🐃 Buffalo',
  '🦅 Eagle', '🦉 Owl', '🦜 Parrot', '🦩 Flamingo', '🐧 Penguin',
  '🦈 Shark', '🐋 Whale', '🐬 Dolphin', '🐙 Octopus', '🦀 Crab',
  '🐊 Crocodile', '🐍 Snake', '🦎 Lizard', '🐢 Turtle', '🦖 Dinosaur',
  '🦋 Butterfly', '🐝 Bee', '🦗 Cricket', '🐜 Ant', '🕷️ Spider'
];

const RARITY_COLORS = {
  common: '#9CA3AF',
  rare: '#3B82F6',
  epic: '#8B5CF6',
  legendary: '#F59E0B'
};

function BadgeManager() {
  const navigate = useNavigate();
  const [badges, setBadges] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBadge, setEditingBadge] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    animal: '',
    badgePhoto: '',
    points: 10,
    rarity: 'common'
  });

  useEffect(() => {
    fetchBadges();
  }, []);

  const fetchBadges = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/badges');
      const data = await response.json();
      setBadges(data);
    } catch (error) {
      console.error('Error fetching badges:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingBadge 
        ? `http://localhost:3001/api/badges/${editingBadge._id}`
        : 'http://localhost:3001/api/badges';
      
      const method = editingBadge ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchBadges();
        resetForm();
        alert(editingBadge ? 'Badge updated successfully!' : 'Badge created successfully!');
      }
    } catch (error) {
      console.error('Error saving badge:', error);
      alert('Error saving badge');
    }
  };

  const handleEdit = (badge) => {
    setEditingBadge(badge);
    setFormData({
      name: badge.name,
      description: badge.description,
      animal: badge.animal,
      badgePhoto: badge.badgePhoto,
      points: badge.points,
      rarity: badge.rarity
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this badge?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/badges/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          fetchBadges();
          alert('Badge deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting badge:', error);
        alert('Error deleting badge');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      animal: '',
      badgePhoto: '',
      points: 10,
      rarity: 'common'
    });
    setEditingBadge(null);
    setShowForm(false);
  };

  return (
    <div className="badge-manager">
      <div className="badge-header">
        <button className="back-button" onClick={() => navigate('/admin/dashboard')}>
          <FaArrowLeft /> Back to Dashboard
        </button>
        <h1>🏆 Badge Manager</h1>
        <button className="add-badge-btn" onClick={() => setShowForm(true)}>
          <FaPlus /> Add New Badge
        </button>
      </div>

      {showForm && (
        <div className="badge-form-overlay">
          <div className="badge-form">
            <h2>{editingBadge ? 'Edit Badge' : 'Create New Badge'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Badge Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  placeholder="e.g., Jungle Explorer"
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe what this badge represents"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Wild Animal</label>
                <select
                  value={formData.animal}
                  onChange={(e) => setFormData({...formData, animal: e.target.value})}
                  required
                >
                  <option value="">Select an animal</option>
                  {WILD_ANIMALS.map(animal => (
                    <option key={animal} value={animal}>{animal}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Badge Photo URL</label>
                <input
                  type="text"
                  value={formData.badgePhoto}
                  onChange={(e) => setFormData({...formData, badgePhoto: e.target.value})}
                  placeholder="https://example.com/badge-image.png"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Points</label>
                  <input
                    type="number"
                    value={formData.points}
                    onChange={(e) => setFormData({...formData, points: parseInt(e.target.value)})}
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Rarity</label>
                  <select
                    value={formData.rarity}
                    onChange={(e) => setFormData({...formData, rarity: e.target.value})}
                  >
                    <option value="common">Common</option>
                    <option value="rare">Rare</option>
                    <option value="epic">Epic</option>
                    <option value="legendary">Legendary</option>
                  </select>
                </div>
              </div>

              <div className="form-buttons">
                <button type="submit" className="submit-btn">
                  {editingBadge ? 'Update Badge' : 'Create Badge'}
                </button>
                <button type="button" className="cancel-btn" onClick={resetForm}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="badges-grid">
        {badges.map(badge => (
          <div key={badge._id} className="badge-card" style={{ borderColor: RARITY_COLORS[badge.rarity] }}>
            <div className="badge-animal">{badge.animal}</div>
            <div className="badge-image">
              {badge.badgePhoto ? (
                <img src={badge.badgePhoto} alt={badge.name} />
              ) : (
                <div className="placeholder-image">🏆</div>
              )}
            </div>
            <h3>{badge.name}</h3>
            <p className="badge-description">{badge.description}</p>
            <div className="badge-info">
              <span className="badge-points">⭐ {badge.points} pts</span>
              <span className="badge-rarity" style={{ color: RARITY_COLORS[badge.rarity] }}>
                {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
              </span>
            </div>
            <div className="badge-actions">
              <button className="edit-btn" onClick={() => handleEdit(badge)}>
                <FaEdit />
              </button>
              <button className="delete-btn" onClick={() => handleDelete(badge._id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {badges.length === 0 && (
        <div className="no-badges">
          <p>No badges created yet. Click "Add New Badge" to create your first badge!</p>
        </div>
      )}
    </div>
  );
}

export default BadgeManager;
