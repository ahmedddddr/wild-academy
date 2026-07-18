import React from 'react';

import './Home.css';
import backgroundImage from '../background.png';
import {
  FaAward,
  FaFacebookF,
  FaInstagram,
  FaLeaf,
  FaUsers,
  FaWhatsapp
} from 'react-icons/fa';

const stats = [
  { label: 'Happy campers', value: '500+' },
  { label: 'Sports & games', value: '24+' },
  { label: 'Super coaches', value: '100+' }
];

const features = [
  {
    title: '🏆 Pro coach energy',
    description: 'Our friendly coaches cheer, teach and celebrate every win with big high-fives.',
    icon: FaLeaf
  },
  {
    title: '🎯 Squads by age',
    description: 'Explorers (4-6), Strikers (7-9) and Champions (10-14) enjoy games made just for them.',
    icon: FaUsers
  },
  {
    title: '🎉 Big camp moments',
    description: 'Mini tournaments, glow-in-the-dark games and medal days keep the smiles huge.',
    icon: FaAward
  }
];

const locations = [
  {
    name: 'Madinaty Sports Club',
    image: '/locations/madinaty.png',
    url: 'https://maps.app.goo.gl/WffUixPHUFycP4Dq5'
  },
  {
    name: 'MILS – Madinaty',
    image: '/locations/mils.png',
    url: 'https://maps.app.goo.gl/jE4j7WEeSGHFeBXE7'
  },
  {
    name: 'MIOLS – Madinaty',
    image: '/locations/miols.png',
    url: 'https://maps.app.goo.gl/RQL5VMBARtVy8iKdA'
  },
  {
    name: 'Othman Bin Affan – El Rehab',
    image: '/locations/othman.png',
    url: 'https://maps.app.goo.gl/XUh71W4xnedy6HRC9'
  },
  {
    name: 'French-german future school – El Rehab',
    image: '/locations/french.png',
    url: 'https://maps.app.goo.gl/ox4Zy3KD8XV2DHyD7'
  },
  {
    name: 'Carleton College Egypt – El Shorouk',
    image: '/locations/carleton.png',
    url: 'https://maps.app.goo.gl/tLGXb243YZoEUgHF7'
  }
];

const activities = [
  '⚽ Football',
  '🏀 Basketball',
  '🤾 Handball',
  '🎯 Dodge Ball',
  '🏒 Hockey',
  '🏊 Swimming',
  '📚 Story Telling',
  '🥋 Kick Boxing',
  '🎨 Arts and Craft',
  '🖍️ Drawing and Coloring',
  '🏕️ Scouting',
  '🎮 Fun Games',
  '🏊 Water Games',
  '🍳 Cooking',
  '🕌 Quran',
  '🤖 AI',
  '🏗️ Foundation',
  '🗺️ Treasure Hunt',
  '💃 Zumba',
  '🏐 Volleyball',
  '💪 Fitness',
  '🥋 Martial Arts',
  '🏹 Archery',
  '🔬 Science'
];

const socials = [
  { label: 'Instagram', icon: FaInstagram, url: 'https://www.instagram.com/wildacademy.camps/' },
  { label: 'Facebook', icon: FaFacebookF, url: 'https://www.facebook.com/Wildacademyegypt?locale=ar_AR' },
  { label: 'WhatsApp', icon: FaWhatsapp, url: 'https://wa.me/201044505147' }
];

function Home() {
  return (
    <div className="home">
      <header className="top-nav" id="home">
        <a className="nav-brand" href="#home">
          <img src="/wild_logo.png" alt="Wild Academy" />
          <span>Wild Academy</span>
        </a>
        <div className="nav-actions">
          <a href="tel:+201044505147" className="btn btn-ghost">Call us</a>
          <a href="/apply" className="btn btn-primary">Apply now</a>
          <a href="/login" className="btn btn-outline">Login</a>
        </div>
      </header>

      <main>
        <section className="hero" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <div className="hero-overlay" />
          <div className="hero-content">
            <span className="eyebrow">Super fun sports camps & weekend leagues</span>
            <h1>Move, play and cheer all day long 🏃‍♂️🎉</h1>
            <p>
              Wild Academy Camps mix fun drills, challenge quests and happy team spirit. Kids jump in, level up and leave
              with epic stories.
            </p>
            <div className="hero-actions">
              <a href="/apply" className="btn btn-primary">Grab a camp spot</a>
              <a href="#locations" className="btn btn-ghost">See cool venues</a>
            </div>
            <div className="hero-stats">
              {stats.map(stat => (
                <div key={stat.label} className="stat-card">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-banner">
          <div className="cta-content">
            <h2>Ready for your kid&rsquo;s best camp story?</h2>
            <p>Join Wild Academy Camps for big games, happy memories and new superstar moves.</p>
          </div>
          <div className="cta-actions">
            <a href="/apply" className="btn btn-primary">Save a spot now</a>
            <a href="/contact" className="btn btn-outline">Talk with our camp team</a>
          </div>
        </section>
      </main>

      <div className="slider-bar">
        <div className="slider-content">
          <div className="slider-section" id="about-slider">
            <h3>About</h3>
            <div className="slider-features">
              {features.map(feature => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="slider-feature-card">
                    <span className="slider-feature-icon"><Icon /></span>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="slider-section" id="locations-slider">
            <h3>Locations</h3>
            <div className="slider-locations">
              {locations.map(location => (
                <a
                  key={location.name}
                  href={location.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="slider-location-card"
                >
                  <img src={location.image} alt={location.name} />
                  <span>{location.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="slider-section" id="activities-slider">
            <h3>Activities</h3>
            <div className="slider-activities">
              {activities.map(activity => (
                <div key={activity} className="slider-activity-item">
                  <span>{activity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-brand">
          <img src="/wild_logo.png" alt="Wild Academy" />
          <p>Wild, friendly and safe sports camps that spark happy champions across Egypt.</p>
        </div>
        <div className="footer-columns">
          <div className="footer-column">
            <span className="footer-title">Visit</span>
            <p>New Cairo &amp; Madinaty play hubs</p>
          </div>
          <div className="footer-column">
            <span className="footer-title">Contact</span>
            <a href="tel:+201044505147">+201044505147</a>
            <a href="https://wa.me/201044505147" target="_blank" rel="noopener noreferrer">WhatsApp our camp helpers</a>
          </div>
          <div className="footer-column">
            <span className="footer-title">Connect</span>
            <div className="footer-socials">
              {socials.map(social => {
                const Icon = social.icon;
                return (
                  <a key={social.label} href={social.url} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <p className="footer-note">© 2025 Wild Academy. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
