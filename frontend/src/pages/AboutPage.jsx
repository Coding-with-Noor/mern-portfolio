import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page-container">
      
      {/* HERO HEADER */}
      <section className="hero-section">
        <span className="about-tag">Software Engineer-in-Training</span>
        <h1 className="hero-title">
          Hi, I'm <span className="highlight">Noor</span>
        </h1>
        <p className="hero-subtitle">BS Computer Science Student — 6th Semester</p>
        <p className="hero-bio">
          I am an adaptable Computer Science student focused on building cross-platform software solutions, 
          managing database systems, and implementing data science workflows. I specialize in picking up 
          technical concepts quickly and applying them to interactive frontend interfaces and data classifiers.
        </p>
      </section>

      <hr className="divider" />

     
      {/* CORE SKILL STACK ARCHITECTURE */}
      <section className="skills-section">
        <h2 className="section-title">Technical Competencies</h2>
        <div className="skills-grid">
          
          {/* CATEGORY 1: FRONTEND WEB */}
          <div className="skill-card">
            <h3 className="category-title">Core Web & UI Design</h3>
            <ul className="skill-list">
              <li className="skill-item"><span className="skill-dot">■</span> HTML5 & CSS3 Architecture</li>
              <li className="skill-item"><span className="skill-dot">■</span> JavaScript (ES6+ Logic)</li>
              <li className="skill-item"><span className="skill-dot">■</span> Bootstrap Responsive Grid</li>
              <li className="skill-item"><span className="skill-dot">■</span> Canva UI/UX Asset Wireframing</li>
            </ul>
          </div>

          {/* CATEGORY 2: THE MERN ECOSYSTEM */}
          <div className="skill-card">
            <h3 className="category-title">MERN Stack & Databases</h3>
            <ul className="skill-list">
              <li className="skill-item"><span className="skill-dot">■</span> React.js Component State</li>
              <li className="skill-item"><span className="skill-dot">■</span> Node.js / Express Servers</li>
              <li className="skill-item"><span className="skill-dot">■</span> MongoDB NoSQL Modeling</li>
              <li className="skill-item"><span className="skill-dot">■</span> Relational SQL Database Logic</li>
            </ul>
          </div>

          {/* CATEGORY 3: ADVANCED APPLIED SCIENCE */}
          <div className="skill-card">
            <h3 className="category-title">Applied AI & Development</h3>
            <ul className="skill-list">
              <li className="skill-item"><span className="skill-dot">■</span> Mobile App Development Basics</li>
              <li className="skill-item"><span className="skill-dot">■</span> Python Engineering</li>
              <li className="skill-item"><span className="skill-dot">■</span> Machine Learning Pipelines</li>
              <li className="skill-item"><span className="skill-dot">■</span> Git & GitHub Version Control</li>
            </ul>
          </div>

        </div>
      </section>

    </div>
  );
};

export default AboutPage;