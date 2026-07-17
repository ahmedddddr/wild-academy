import React, { useState, useEffect } from 'react';
import './AdminMediaManager.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

function AdminMediaManager() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  const fetchPhotos = async () => {
    if (!selectedBranch || !selectedAge) return;
    try {
      const response = await fetch(`${API_URL}/api/media/${selectedBranch}/${selectedAge}`);
      const data = await response.json();
      setUploadedPhotos(data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [selectedBranch, selectedAge]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile || !selectedBranch || !selectedAge) {
      alert('Please select all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('photo', selectedFile);

    try {
      const uploadResponse = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (uploadResponse.ok) {
        const mediaResponse = await fetch(`${API_URL}/api/media`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            branch: selectedBranch,
            ageGroup: selectedAge,
            photoUrl: uploadData.fileUrl
          })
        });

        if (mediaResponse.ok) {
          alert('Upload successful');
          fetchPhotos();
        } else {
          alert('Failed to save media reference');
        }
      } else {
        alert('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading:', error);
      alert('An error occurred');
    }
  };

  const handleDeletePhoto = async (index) => {
    try {
      // Find the media document by URL
      const response = await fetch(`${API_URL}/api/media`);
      const allMedia = await response.json();
      
      const mediaToDelete = allMedia.find(m => m.photoUrl === uploadedPhotos[index]);
      
      if (mediaToDelete) {
        const deleteResponse = await fetch(`${API_URL}/api/media/${mediaToDelete._id}`, {
          method: 'DELETE'
        });

        if (deleteResponse.ok) {
          fetchPhotos();
        }
      }
    } catch (error) {
      console.error('Error deleting photo:', error);
      alert('Failed to delete photo');
    }
  };

  return (
    <div className="media-container">
      <h2 className="media-title">📷 Admin Media Manager</h2>

      <div className="media-form">
        <input type="file" onChange={handleFileChange} />
        <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
          <option value="">Select Branch</option>
          <option value="German future school">German future school – Rehab</option>
          <option value="Othman Bin affan school">Othman Bin affan school – Rehab</option>
          <option value="Madinaty">Madinaty Sports Club</option>
          <option value="MILS">MILS – Madinaty</option>
          <option value="MIOLS">MIOLS – Madinaty</option>
          <option value="Carleton College">Carleton College – El Shorouk</option>
        </select>
        <select value={selectedAge} onChange={(e) => setSelectedAge(e.target.value)}>
          <option value="">Select Age Group</option>
          <option value="4-6">4–6</option>
          <option value="7-9">7–9</option>
          <option value="10-14">10–14</option>
        </select>
        <button onClick={handleUpload} className="upload-btn">Upload Photo</button>
      </div>

      <h3 className="preview-label">Preview:</h3>
      <div className="photo-grid">
        {uploadedPhotos.map((url, index) => (
          <div key={index} className="photo-item">
            <img src={url} alt={`Uploaded ${index}`} className="media-photo" />
            <button className="delete-btn" onClick={() => handleDeletePhoto(index)}>❌ Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminMediaManager;
