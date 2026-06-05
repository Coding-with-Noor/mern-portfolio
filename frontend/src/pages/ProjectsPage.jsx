import React, { useState, useEffect } from 'react';
import './ProjectsPage.css';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // DYNAMIC URL FIX: Fallback to localhost if the environment variable doesn't exist yet
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        
        //  Updated the fetch endpoint using template literals
        const response = await fetch(`${API_BASE_URL}/api/projects`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects from server');
        }
        
        const data = await response.json();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []); 

  if (loading) {
    return <div className="loading-state">Fetching amazing things from the database...</div>;
  }

  if (error) {
    return <div className="error-state">Oops! {error}. Connection failed.</div>;
  }

  return (
    <div className="projects-page-container">
      <header className="projects-header">
        <h1 className="projects-title">My Created Projects</h1>
        <p className="projects-subtitle">Real-world built Systems.</p>
      </header>

      {projects.length === 0 ? (
        <p className="no-projects">No projects found. Add one using the Admin Dashboard!</p>
      ) : (
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project._id} className="project-card">
              <h2 className="project-title-card">{project.title}</h2>
              <p className="project-desc">{project.description}</p>
              
              <div className="tech-badges">
                {project.techStack.map((tech, idx) => (
                  <span key={idx} className="tech-badge">{tech}</span>
                ))}
              </div>

              <a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="github-btn"
              >
                View Repository Code →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;