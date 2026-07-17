import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaShoppingCart, FaCoins, FaBox } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Shop.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const Shop = ({ user }) => {
  const navigate = useNavigate();
  const [prizes, setPrizes] = useState([]);
  const [userPoints, setUserPoints] = useState(0);
  const [purchases, setPurchases] = useState([]);
  const [showPurchases, setShowPurchases] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrizes();
    fetchUserPoints();
    fetchPurchases();
  }, [user?.username]);

  const fetchPrizes = async () => {
    try {
      const response = await fetch(`${API_URL}/api/prizes`);
      const data = await response.json();
      setPrizes(data);
    } catch (error) {
      console.error('Error fetching prizes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPoints = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users`);
      const data = await response.json();
      const currentUser = data.find(u => u.username === user?.username);
      setUserPoints(currentUser?.points || 0);
    } catch (error) {
      console.error('Error fetching user points:', error);
    }
  };

  const fetchPurchases = async () => {
    try {
      const response = await fetch(`${API_URL}/api/prizes/purchases/${user?.username}`);
      const data = await response.json();
      setPurchases(data);
    } catch (error) {
      console.error('Error fetching purchases:', error);
    }
  };

  const handlePurchase = async (prize) => {
    if (userPoints < prize.points) {
      alert('Not enough points!');
      return;
    }

    if (prize.stock <= 0) {
      alert('This prize is out of stock!');
      return;
    }

    if (!window.confirm(`Purchase ${prize.name} for ${prize.points} points?`)) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/prizes/purchase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: user.username,
          prizeId: prize._id
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert(`🎉 Congratulations! You purchased ${prize.name}!`);
        setUserPoints(data.remainingPoints);
        fetchPrizes();
        fetchPurchases();
      } else {
        alert(data.error || 'Failed to purchase prize');
      }
    } catch (error) {
      console.error('Error purchasing prize:', error);
      alert('Error purchasing prize');
    }
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
    <div className="shop-container">
      <div className="shop-header">
        <button className="back-button" onClick={() => navigate('/main')}>
          <FaArrowLeft /> Back
        </button>
        <h1><FaShoppingCart /> Prize Shop</h1>
        <div className="points-display">
          <FaCoins /> {userPoints} Points
        </div>
      </div>

      <div className="shop-actions">
        <button 
          className="toggle-purchases-btn"
          onClick={() => setShowPurchases(!showPurchases)}
        >
          <FaBox /> {showPurchases ? 'View Prizes' : 'My Purchases'}
        </button>
      </div>

      {showPurchases ? (
        <div className="purchases-section">
          <h2>My Purchases</h2>
          {purchases.length === 0 ? (
            <p className="no-purchases">No purchases yet. Start earning points!</p>
          ) : (
            <div className="purchases-grid">
              {purchases.map((purchase, index) => (
                <div key={index} className="purchase-card">
                  <h3>{purchase.prizeName}</h3>
                  <p className="purchase-points">Cost: {purchase.points} points</p>
                  <p className="purchase-date">
                    Purchased: {new Date(purchase.purchaseDate).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="prizes-section">
          {loading ? (
            <p>Loading prizes...</p>
          ) : prizes.length === 0 ? (
            <p className="no-prizes">No prizes available right now.</p>
          ) : (
            <div className="prizes-grid">
              {prizes.map((prize) => (
                <div key={prize._id} className="prize-card">
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
                      {prize.stock} left
                    </span>
                  </div>
                  <button
                    className="purchase-btn"
                    onClick={() => handlePurchase(prize)}
                    disabled={userPoints < prize.points || prize.stock <= 0}
                  >
                    {prize.stock <= 0 ? 'Out of Stock' : 
                     userPoints < prize.points ? 'Not Enough Points' : 
                     'Purchase'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Shop;
