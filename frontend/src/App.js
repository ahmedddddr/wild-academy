import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Contact from './pages/Contact';
import ApplyForm from './pages/ApplyForm';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import UserGenerator from './pages/UserGenerator';
import TimetableManager from './pages/TimetableManager';
import Applications from './pages/Applications';  // NEW - for handling submitted applications
import 'leaflet/dist/leaflet.css';
import MediaCenter from './pages/MediaCenter';
import ChatPage from './pages/ChatPage';
import AdminMediaManager from './pages/AdminMediaManager';
import AdminChat from './pages/AdminChat';
import SchedulePage from './pages/SchedulePage';
import NotificationsPage from './pages/NotificationsPage';
import AdminNotifications from './pages/AdminNotifications';
import Leaderboard from './pages/Leaderboard';
import Achievements from './pages/Achievements';
import BadgeManager from './pages/BadgeManager';
import LeaderboardManager from './pages/LeaderboardManager';
import AchievementManager from './pages/AchievementManager';
import Shop from './pages/Shop';
import PrizeManager from './pages/PrizeManager';
import AdManager from './pages/AdManager';
import Profile from './pages/Profile';
function App() {
  // Keep kid login persistent
 
const [user, setUser] = useState(() => {
  const saved = localStorage.getItem("loggedUser");
  return saved ? JSON.parse(saved) : null;
});

  return (
    <Router>
      <Routes>

        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/apply" element={<ApplyForm />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />

        {/* Kid dashboard route (protected) */}
        <Route path="/dashboard" element={
          user ? <MainPage user={user} /> : <Navigate to="/login" />
        } />
        <Route path="/main" element={
          user ? <MainPage user={user} /> : <Navigate to="/login" />
        } />
        <Route path="/media" element={<MediaCenter user={user} />} />
        <Route path="/schedule" element={<SchedulePage user={user} />} />
        <Route path="/notifications" element={<NotificationsPage user={user} />} />
        <Route path="/chat" element={<ChatPage user={user} />} />
        <Route path="/leaderboard" element={<Leaderboard user={user} />} />
        <Route path="/achievements" element={<Achievements user={user} />} />
        <Route path="/shop" element={<Shop user={user} />} />
        <Route path="/profile" element={<Profile user={user} />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/timetable" element={<TimetableManager />} />
         <Route path="/admin/applications" element={<Applications />} />
         <Route path="/admin/users" element={<UserGenerator />} />
         <Route path="/admin/media" element={<AdminMediaManager />} />
<Route path="/admin/chat" element={<AdminChat />} />
<Route path="/admin/notifications" element={<AdminNotifications />} />
<Route path="/admin/badges" element={<BadgeManager />} />
<Route path="/admin/leaderboard" element={<LeaderboardManager />} />
<Route path="/admin/achievements" element={<AchievementManager />} />
<Route path="/admin/prizes" element={<PrizeManager />} />
<Route path="/admin/ads" element={<AdManager />} />



      </Routes>
    </Router>
  );
}

export default App;
