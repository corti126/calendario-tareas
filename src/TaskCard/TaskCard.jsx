import React from 'react';
import './TaskCard.css';

const TaskCard = ({ task, onClick }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Sin fecha';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('es-AR', { day: '2-digit', month: 'short' });
  };

  return (
    <div 
      className={`task-card priority-${task.priority}`} 
      onClick={onClick}
      style={{ cursor: 'pointer' }} 
    >
      <div className="task-title">{task.title}</div>
      <div className="task-info">
        <span className="task-date">📅 {formatDate(task.createdAt || task.dueDate)}</span>
        <span className={`priority-tag ${task.priority}`}>
          {task.priority?.toUpperCase()}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;