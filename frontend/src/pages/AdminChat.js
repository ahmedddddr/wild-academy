import React, { useState, useEffect } from 'react';
import './AdminChat.css';

const AdminChatV2 = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchUsers();
    // Poll for new users every 5 seconds
    const usersInterval = setInterval(fetchUsers, 5000);
    return () => clearInterval(usersInterval);
  }, []);

  // Poll for new messages when a user is selected
  useEffect(() => {
    let messageInterval;
    if (selectedUser) {
      messageInterval = setInterval(() => {
        fetchMessages(selectedUser.username);
      }, 3000);
    }
    return () => clearInterval(messageInterval);
  }, [selectedUser]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/messages/users');
      const data = await response.json();
      setUsers(data.map(username => ({ username })));
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchMessages = async (username) => {
    try {
      const response = await fetch(`http://localhost:3001/api/messages/chat/${username}`);
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSelectUser = async (user) => {
    setSelectedUser(user);
    fetchMessages(user.username);
  };

  const handleReply = async () => {
    if (!reply.trim()) return;

    try {
      const response = await fetch('http://localhost:3001/api/messages/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: selectedUser.username,
          sender: 'admin',
          text: reply
        })
      });

      if (response.ok) {
        setReply('');
        fetchMessages(selectedUser.username);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const filteredUsers = users.filter(
    (u) => u.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-chat-container">
      <div className="sidebar">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="user-list">
          {filteredUsers.map((user, i) => (
            <div
              key={i}
              className={`user-item ${selectedUser?.username === user.username ? 'active' : ''}`}
              onClick={() => handleSelectUser(user)}
            >
              {user.username}
            </div>
          ))}

          {filteredUsers.length === 0 && <p>No users found.</p>}
        </div>
      </div>

      <div className="chat-window">
        {selectedUser ? (
          <>
            <h3>Chat with: {selectedUser.username}</h3>
            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`chat-message ${msg.sender}`}>
                  <strong>{msg.sender === 'admin' ? 'Wild Academy:' : 'Parent:'}</strong> {msg.text}
                </div>
              ))}
            </div>

            <div className="chat-input">
              <input
                type="text"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type your reply..."
              />
              <button onClick={handleReply}>Send</button>
            </div>
          </>
        ) : (
          <div className="empty-chat">Select a user to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default AdminChatV2;
