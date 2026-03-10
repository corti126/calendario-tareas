import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <p className="sidebar-label">PROYECTO</p>
        <div className="sidebar-item active">📋 Tablero Kanban</div>
        <div className="sidebar-item">🚀 Backlog</div>
        <div className="sidebar-item">📊 Reportes</div>
      </div>
      <hr />
      <div className="sidebar-section">
        <p className="sidebar-label">FILTROS</p>
        <div className="sidebar-item">⚠️ Prioridad Alta</div>
        <div className="sidebar-item">✅ Mis Tareas</div>
      </div>
    </aside>
  );
};

export default Sidebar;