import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaBox, FaCoins, FaWarehouse } from 'react-icons/fa';
import './PrizeManager.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function PrizeManager() {
  const navigate = useNavigate();
  const [prizes, setPrizes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPrize, setEditingPrize] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    points: 100,
    stock: 10,
    category: 'other',
    isActive: true
  });

  const categories = ['toys', 'books', 'clothing', 'accessories', 'other'];

  useEffect(() => {
    fetchPrizes();
  }, []);

  const fetchPrizes = async () => {
    try {
      const response = await fetch(`${API_URL}/api/prizes/admin/all`);
      const data = await response.json();
      setPrizes(data);
    } catch (error) {
      console.error('Error fetching prizes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editingPrize
        ? `${API_URL}/api/prizes/${editingPrize._id}`
        : `${API_URL}/api/prizes`;

      const method = editingPrize ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchPrizes();
        setShowForm(false);
        setEditingPrize(null);
        resetForm();
        alert(editingPrize ? 'Prize updated successfully!' : 'Prize created successfully!');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to save prize');
      }
    } catch (error) {
      console.error('Error saving prize:', error);
      alert('Error saving prize');
    }
  };

  const handleEdit = (prize) => {
    setEditingPrize(prize);
    setFormData({
      name: prize.name,
      description: prize.description,
      image: prize.image,
      points: prize.points,
      stock: prize.stock,
      category: prize.category,
      isActive: prize.isActive
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this prize?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/prizes/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchPrizes();
        alert('Prize deleted successfully!');
      } else {
        alert('Failed to delete prize');
      }
    } catch (error) {
      console.error('Error deleting prize:', error);
      alert('Error deleting prize');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image: '',
      points: 100,
      stock: 10,
      category: 'other',
      isActive: true
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPrize(null);
    resetForm();
  };

  const getCategoryIcon = (category) => {
    const icons = {
      toys: '🧸',
      books: '📚',
      clothing: '👕',
      accessories: '⌚',
      other: '🎁'
    };
    return icons[category] || '🎁';
  };

  return (
    <div className="prize-manager-container">
      <div className="prize-manager-header">
        <button className="back-button" onClick={() => navigate('/admin/dashboard')}>
          <FaArrowLeft /> Back to Dashboard
        </button>
        <h1><FaBox /> Prize Manager</h1>
        <button className="add-prize-btn" onClick={() => setShowForm(true)}>
          <FaPlus /> Add Prize
        </button>
      </div>

      {showForm && (
        <div className="prize-form-overlay">
          <div className="prize-form-card">
            <h2>{editingPrize ? 'Edit Prize' : 'Add New Prize'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Prize Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Points Required *</label>
                  <input
                    type="number"
                    value={formData.points}
                    onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) })}
                    min="1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Stock *</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {getCategoryIcon(cat)} {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  Active (visible in shop)
                </label>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingPrize ? 'Update Prize' : 'Add Prize'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="prizes-grid">
        {prizes.length === 0 ? (
          <p className="no-prizes">No prizes added yet. Click "Add Prize" to create one!</p>
        ) : (
          prizes.map((prize) => (
            <div key={prize._id} className={`prize-card ${!prize.isActive ? 'inactive' : ''}`}>
              {prize.image && (
                <div className="prize-image">
                  <img src={prize.image} alt={prize.name} />
                </div>
              )}
              <div className="prize-category">
                {getCategoryIcon(prize.category)} {prize.category}
              </div>
              <h3>{prize.name}</h3>
              {prize.description && (
                <p className="prize-description">{prize.description}</p>
              )}
              <div className="prize-info">
                <span className="prize-points">
                  <FaCoins /> {prize.points} pts
                </span>
                <span className={`prize-stock ${prize.stock <= 0 ? 'out-of-stock' : ''}`}>
                  <FaWarehouse /> {prize.stock} left
                </span>
              </div>
              <div className="prize-status">
                <span className={`status-badge ${prize.isActive ? 'active' : 'inactive'}`}>
                  {prize.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="prize-actions">
                <button className="edit-btn" onClick={() => handleEdit(prize)}>
                  <FaEdit /> Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(prize._id)}>
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PrizeManager;
