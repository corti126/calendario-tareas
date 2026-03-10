import React from 'react';
import { Search, Bell, Settings, ChevronDown, Grid } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ onCreateClick }) => {
  return (
    <nav className="navbar">
      {/* Lado Izquierdo */}
      <div className="nav-left">
        <div className="nav-icon-btn">
          <Grid size={20} />
        </div>
        <div className="jira-logo">
          <img src="/SC-logo.png" alt="Logo" />
        </div>
        <span className="brand-name">Santi OS</span>
        
        <div className="nav-links">
          <div className="nav-item">Your work <ChevronDown size={14} /></div>
          <div className="nav-item">Backlog <ChevronDown size={14} /></div>
          <div className="nav-item">Filters <ChevronDown size={14} /></div>
        </div>

        <button className="btn-create" onClick={onCreateClick}>Create</button>
      </div>

      {/* Lado Derecho */}
      <div className="nav-right">
        <div className="search-container">
          <div className="search-wrapper">
            <Search className="search-icon" size={16} />
            <input type="text" placeholder="Search" />
          </div>
        </div>
        
        <div className="nav-actions">
          <div className="icon-badge-container">
            <Bell size={20} className="nav-icon" />
            <span className="badge">9+</span>
          </div>
          <Settings size={20} className="nav-icon" />
          <div className="user-avatar">TU</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;