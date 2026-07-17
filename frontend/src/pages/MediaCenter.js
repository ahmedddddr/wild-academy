import React, { useEffect, useState } from 'react';
import './MediaCenter.css';

const MediaCenter = ({ user }) => {
  const [photos, setPhotos] = useState([]);
  const [lightboxUrl, setLightboxUrl] = useState(null);

  const fetchPhotos = async () => {
    if (!user) return;
    try {
      const response = await fetch(`http://192.168.100.7:3001/api/media/${user.branch}/${user.ageGroup}`);
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [user]);

  if (!user) return <p>Loading user data...</p>;

  return (
    <div className="media-page-container">
      <h2 className="media-title">📸 Media Center for {user.branch} – Age {user.ageGroup}</h2>

      <div className="media-gallery">
        {photos.length === 0 ? (
          <p>No media uploaded yet.</p>
        ) : (
          photos.map((url, i) => (
            <img
              key={i}
              src={url}
              alt="activity"
              className="media-image"
              onClick={() => setLightboxUrl(url)}
            />
          ))
        )}
      </div>

      {/* Lightbox */}
      {lightboxUrl && (
        <div className="lightbox-overlay" onClick={() => setLightboxUrl(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxUrl} alt="Preview" />
            <a href={lightboxUrl} download className="download-btn">⬇ Download</a>
            <button className="close-btn" onClick={() => setLightboxUrl(null)}>✖</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaCenter;
