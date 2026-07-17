import React from 'react';

import './Home.css';
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
    summary: 'Sparkly pools, fast tracks and giant indoor arenas for all-out fun.',
    image: '/locations/madinaty.png',
    url: 'https://maps.app.goo.gl/WffUixPHUFycP4Dq5'
  },
  {
    name: 'MILS – Madinaty',
    summary: 'Cool multi-sport domes that flip from futsal to volleyball to tag time.',
    image: '/locations/mils.png',
    url: 'https://maps.app.goo.gl/jE4j7WEeSGHFeBXE7'
  },
  {
    name: 'MIOLS – Madinaty',
    summary: 'Climbing walls, ninja courses and training labs that feel like an adventure movie.',
    image: '/locations/miols.png',
    url: 'https://maps.app.goo.gl/RQL5VMBARtVy8iKdA'
  },
  {
    name: 'Othman Bin Affan – El Rehab',
    summary: 'Big green fields, bright gyms and a cheering crowd for every goal.',
    image: '/locations/othman.png',
    url: 'https://maps.app.goo.gl/XUh71W4xnedy6HRC9'
  },
  {
    name: 'French-german future school – El Rehab',
    summary: 'Big green fields, bright gyms and a cheering crowd for every goal.',
    image: '/locations/french.png',
    url: 'https://maps.app.goo.gl/ox4Zy3KD8XV2DHyD7'
  },
  {
    name: 'Carleton College Egypt – El Shorouk',
    summary: 'Outdoor courts, skate bowls and mega fun for every weekend warrior.',
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
  { label: 'Instagram', icon: FaInstagram, url: '#!' },
  { label: 'Facebook', icon: FaFacebookF, url: '#!' },
  { label: 'WhatsApp', icon: FaWhatsapp, url: 'https://wa.me/201022763887' }
];

function Home() {
  return (
    <div className="home">
      <header className="top-nav" id="home">
        <a className="nav-brand" href="#home">
          <img src="/wild_logo.png" alt="Wild Academy" />
          <span>Wild Academy</span>
        </a>
        <nav className="nav-menu">
          <a href="#about">About</a>
          <a href="#locations">Locations</a>
          <a href="#activities">Activities</a>
        </nav>
        <div className="nav-actions">
          <a href="tel:+201022763887" className="btn btn-ghost">Call us</a>
          <a href="/apply" className="btn btn-primary">Apply now</a>
          <a href="/login" className="btn btn-outline">Login</a>
        </div>
      </header>

      <main>
        <section className="hero">
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

        <section className="section features" id="about">
          <div className="section-header">
            <span className="eyebrow">Why camp with us?</span>
            <h2>Kids smile, sweat and shine here</h2>
            <p className="section-lead">
              We bring music, cheering squads and super coaches to every session. Every camper leaves stronger and happier.
            </p>
          </div>
          <div className="feature-grid">
            {features.map(feature => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="feature-card">
                  <span className="feature-icon"><Icon /></span>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section locations" id="locations">
          <div className="section-header">
            <span className="eyebrow">Camp zones</span>
            <h2>Epic spaces to run, splash and soar</h2>
            <p className="section-lead">From giant fields to indoor arenas, every zone feels like a sports dream.</p>
          </div>
          <div className="card-grid">
            {locations.map(location => (
              <a
                key={location.name}
                href={location.url}
                target="_blank"
                rel="noopener noreferrer"
                className="location-card"
              >
                <div className="image-frame">
                  <img src={location.image} alt={location.name} />
                </div>
                <div className="card-body">
                  <h3>{location.name}</h3>
                  <p>{location.summary}</p>
                  <span className="click-hint">📍 Click to view location</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="section activities" id="activities">
          <div className="section-header">
            <span className="eyebrow">Daily adventures</span>
            <h2>Every day is action, music and teamwork</h2>
            <p className="section-lead">Short bursts of coaching, colourful challenges and team cheers keep the fun rolling.</p>
          </div>
          <div className="activity-grid">
            {activities.map(activity => (
              <div key={activity} className="activity-card">
                <span className="activity-marker" />
                <span>{activity}</span>
              </div>
            ))}
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
