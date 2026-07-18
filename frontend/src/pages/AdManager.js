import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus, FaEdit, FaTrash, FaImage, FaLink, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import './AdManager.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function AdManager() {
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAd, setEditingAd] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    isActive: true,
    order: 0
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      const response = await fetch(`${API_URL}/api/ads/all`);
      const data = await response.json();
      setAds(data);
    } catch (error) {
      console.error('Error fetching ads:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('link', formData.link);
      formDataToSend.append('isActive', formData.isActive);
      formDataToSend.append('order', formData.order);

      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      const url = editingAd
        ? `${API_URL}/api/ads/${editingAd._id}`
        : `${API_URL}/api/ads`;

      const method = editingAd ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataToSend
      });

      if (response.ok) {
        fetchAds();
        setShowForm(false);
        setEditingAd(null);
        resetForm();
        setImageFile(null);
        alert(editingAd ? 'Ad updated successfully!' : 'Ad created successfully!');
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to save ad');
      }
    } catch (error) {
      console.error('Error saving ad:', error);
      alert('Error saving ad');
    }
  };

  const handleEdit = (ad) => {
    setEditingAd(ad);
    setFormData({
      title: ad.title,
      description: ad.description,
      image: ad.image,
      link: ad.link,
      isActive: ad.isActive,
      order: ad.order
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this ad?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/ads/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchAds();
        alert('Ad deleted successfully!');
      } else {
        alert('Failed to delete ad');
      }
    } catch (error) {
      console.error('Error deleting ad:', error);
      alert('Error deleting ad');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      link: '',
      isActive: true,
      order: 0
    });
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAd(null);
    resetForm();
    setImageFile(null);
  };

  return (
    <div className="ad-manager">
      <div className="ad-manager-header">
        <button className="back-btn" onClick={() => navigate('/admin/dashboard')}>
          <FaArrowLeft />
        </button>
        <h1>Ad Manager</h1>
        <button className="add-btn" onClick={() => setShowForm(true)}>
          <FaPlus />
          Add Ad
        </button>
      </div>

      {showForm && (
        <div className="ad-form-overlay">
          <div className="ad-form">
            <h2>{editingAd ? 'Edit Ad' : 'Create New Ad'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                <label>Image *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  required={!editingAd}
                />
                {formData.image && !imageFile && (
                  <img src={`${API_URL}${formData.image}`} alt="Current" className="preview-image" />
                )}
              </div>

              <div className="form-group">
                <label>Link URL</label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>

              <div className="form-group">
                <label>Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                  min="0"
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  />
                  Active
                </label>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  {editingAd ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="ads-grid">
        {ads.map((ad) => (
          <div key={ad._id} className="ad-card">
            <div className="ad-image">
              <img src={`${API_URL}${ad.image}`} alt={ad.title} />
              <div className="ad-status">
                {ad.isActive ? (
                  <FaToggleOn className="status-icon active" />
                ) : (
                  <FaToggleOff className="status-icon inactive" />
                )}
              </div>
            </div>
            <div className="ad-info">
              <h3>{ad.title}</h3>
              <p>{ad.description}</p>
              {ad.link && (
                <a href={ad.link} target="_blank" rel="noopener noreferrer" className="ad-link">
                  <FaLink /> {ad.link}
                </a>
              )}
              <div className="ad-meta">
                <span>Order: {ad.order}</span>
              </div>
            </div>
            <div className="ad-actions">
              <button className="edit-btn" onClick={() => handleEdit(ad)}>
                <FaEdit />
              </button>
              <button className="delete-btn" onClick={() => handleDelete(ad._id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {ads.length === 0 && (
        <div className="empty-state">
          <FaImage />
          <p>No ads yet. Click "Add Ad" to create your first ad.</p>
        </div>
      )}
    </div>
  );
}

export default AdManager;
