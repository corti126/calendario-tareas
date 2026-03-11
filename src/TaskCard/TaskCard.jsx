import React from 'react';
import { Calendar } from 'lucide-react';
import './TaskCard.css';

const TaskCard = ({ task, onClick }) => {
  
  const formatDate = (timestamp) => {
    if (!timestamp) return 'Sin fecha';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('es-AR', { day: '2-digit', month: 'short' });
  };

  const getDeadlineStatus = (endDateTimestamp) => {
    if (task.status === 'done' || task.status === 'finalizada') {
      return 'completed'; 
    }

    if (!endDateTimestamp) return 'normal';

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const deadline = endDateTimestamp.toDate ? endDateTimestamp.toDate() : new Date(endDateTimestamp);
    deadline.setHours(0, 0, 0, 0);

    const diffTime = deadline - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) return 'danger';    
    if (diffDays <= 3) return 'warning';   
    
    return 'normal';
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData("taskId", task.id);
    e.dataTransfer.effectAllowed = "move";
    e.currentTarget.classList.add('dragging');
    e.stopPropagation(); 
  };

  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('dragging');
  };

  const deadlineClass = getDeadlineStatus(task.endDate);

  return (
    <div 
      className={`task-card priority-${task.priority}`} 
      onClick={onClick}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >

      <div className="task-title">{task.title}</div>
      <div className="task-info">
        <span className={`task-date ${deadlineClass}`}>
          <Calendar size={12} /> {formatDate(task.endDate)}
        </span>
        <span className={`priority-tag ${task.priority}`}>
          {task.priority?.toUpperCase()}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;