import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import our new Navbar component
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import our custom pages
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />

        <main style={{ flex: '1 0 auto' }}>
        {/* Route Definitions */}
        <Routes>
          <Route path="/" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;