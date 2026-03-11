import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import TaskCard from '../TaskCard/TaskCard';
import './Column.css';

const Column = ({ title, tasks, statusId, onTaskClick }) => {
  const [isOver, setIsOver] = useState(false);

  const sortedTasks = [...tasks].sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0));

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsOver(true);
  };

  const handleDropOnColumn = async (e) => {
    e.preventDefault();
    setIsOver(false);
    const taskId = e.dataTransfer.getData("taskId");
    
    const lastTask = sortedTasks[sortedTasks.length - 1];
    const newIndex = lastTask ? (lastTask.orderIndex + 1000) : Date.now();

    await updateDoc(doc(db, "task", taskId), {
      status: statusId,
      orderIndex: newIndex
    });
  };

  const handleDropOnTask = async (e, targetTask, index) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOver(false);

    const draggedTaskId = e.dataTransfer.getData("taskId");
    if (draggedTaskId === targetTask.id) return;

    let newIndex;
    const prevTask = sortedTasks[index - 1];

    if (!prevTask) {
      newIndex = targetTask.orderIndex / 2;
    } else {
      newIndex = (prevTask.orderIndex + targetTask.orderIndex) / 2;
    }

    await updateDoc(doc(db, "task", draggedTaskId), {
      status: statusId,
      orderIndex: newIndex
    });
  };

  return (
    <div 
      className={`column ${isOver ? 'column-drag-over' : ''}`}
      onDragOver={handleDragOver}
      onDragEnter={(e) => e.preventDefault()}
      onDragLeave={() => setIsOver(false)}
      onDrop={handleDropOnColumn}
    >
      <div className="column-header">
        <h3>{title}</h3>
        <span className="task-count">{tasks.length}</span>
      </div>
      <div className="task-list">
        {sortedTasks.map((task, index) => (
          <div 
            key={task.id} 
            onDrop={(e) => handleDropOnTask(e, task, index)}
            onDragOver={(e) => e.preventDefault()}
            className="drop-zone"
          >
            <TaskCard task={task} onClick={() => onTaskClick(task)} />
          </div>
        ))}
        
        {tasks.length === 0 && isOver && (
          <div className="column-empty-msg">Suelta para mover aquí</div>
        )}
      </div>
    </div>
  );
};

export default Column;