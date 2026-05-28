import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  // Array mapping our tools to official Devicon class names for SVGs
  const skillLogos = [
    { name: "Python", iconClass: "devicon-python-plain colored" },
    { name: "Machine Learning", iconClass: "devicon-scikit-learn-plain colored" },
    { name: "MongoDB", iconClass: "devicon-mongodb-plain colored" },
    { name: "Express.js", iconClass: "devicon-express-original white" },
    { name: "React.js", iconClass: "devicon-react-original colored" },
    { name: "Node.js", iconClass: "devicon-nodejs-plain colored" },
    { name: "HTML5", iconClass: "devicon-html5-plain colored" },
    { name: "CSS3", iconClass: "devicon-css3-plain colored" },
    { name: "JavaScript", iconClass: "devicon-javascript-plain colored" },
    { name: "Bootstrap", iconClass: "devicon-bootstrap-plain colored" },
    { name: "SQL", iconClass: "devicon-azuresqldatabase-plain colored" },
    { name: "Mobile Development", iconClass: "devicon-android-plain colored" },
    { name: "Canva UI", iconClass: "devicon-canva-original colored" },
    { name: "Git & GitHub", iconClass: "devicon-github-original white" }
  ];

  // Double the array to make the infinite scrolling infinite & seamless
  const marqueeItems = [...skillLogos, ...skillLogos];

  return (
    <div className="about-page-container">
      
      {/* HERO SECTION */}
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

      {/* INFINITE MOVING SKILLS MARQUEE LINE */}
      <section className="marquee-section">
        <div className="section-header-centered">
          <span className="skills-tag">Core Stack Automation</span>
          <h2 className="marquee-section-title">Skills</h2>
        </div>

        <div className="marquee-wrapper">
          <div className="marquee-track">
            {marqueeItems.map((skill, index) => (
              <div className="marquee-card" key={index}>
                <div className="icon-wrapper">
                  <i className={skill.iconClass}></i>
                </div>
                <span className="marquee-card-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM INTERNSHIP HIGHLIGHT BANNER */}
      <section className="internship-section">
        <div className="internship-highlight-panel">
          <div className="highlight-content">
            <div className="live-indicator-box">
              <span className="pulse-dot"></span>
              <span className="indicator-text">Active Professional Engagement</span>
            </div>
            <h2>Currently Immersed in Full-Stack Development</h2>
            <p>
              I am actively undergoing an intensive engineering internship focused on <strong>MERN Stack Architecture</strong>. 
              This engagement involves scaling backend route infrastructure, handling complex schema integrations within MongoDB, 
              and learning how to bridge enterprise-level data layers with responsive, dynamic React components.
            </p>
          </div>
          <div className="highlight-badge">
            <span className="mern-text">MERN</span>
            <span className="intern-tag">Internship '26</span>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;