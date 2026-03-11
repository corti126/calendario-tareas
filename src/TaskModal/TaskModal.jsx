import React, { useState } from 'react';
import { X, Trash2, AlignLeft, Clock } from 'lucide-react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './TaskModal.css';

const TaskModal = ({ task, onClose }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);

  const handleUpdate = async () => {
    try {
      const taskRef = doc(db, "task", task.id);
      await updateDoc(taskRef, {
        title,
        description,
        status,
        priority
      });
    } catch (error) {
      console.error("Error al actualizar:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
      await deleteDoc(doc(db, "task", task.id));
      onClose();
    }
  };

  return (
    <div className="task-modal-overlay" onClick={onClose}>
      <div className="task-modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="task-modal-header">
          <span className="task-id-tag">
            {task.customId ? task.customId : (task.id?.slice(0, 3).toUpperCase() || '---')}
          </span>
          
          <div className="task-modal-actions">
            <button className="btn-icon-delete" onClick={handleDelete} title="Eliminar tarea">
              <Trash2 size={18} />
            </button>
            <button className="btn-icon-close" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </header>

        <div className="task-modal-body">
          <div className="task-main-column">
            <div className="editable-title">
              <input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleUpdate}
                className="task-title-input"
              />
            </div>

            <div className="section-label">
              <AlignLeft size={16} /> <span>Descripción</span>
            </div>
            <textarea 
              placeholder="Añade una descripción más detallada..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={handleUpdate}
              className="task-desc-textarea"
            />
          </div>

          <div className="task-side-column">
            <div className="side-group">
              <label>ESTADO</label>
              <select value={status} onChange={(e) => { setStatus(e.target.value); handleUpdate(); }}>
                <option value="todo">Tareas por hacer</option>
                <option value="in-progress">En curso</option>
                <option value="paused">En pausa</option>
                <option value="done">Finalizada</option>
                <option value="dismissed">Desestimada</option>
              </select>
            </div>

            <div className="side-group">
              <label>PRIORIDAD</label>
              <select value={priority} onChange={(e) => { setPriority(e.target.value); handleUpdate(); }}>
                <option value="high">Alta</option>
                <option value="medium">Media</option>
                <option value="low">Baja</option>
              </select>
            </div>

            <div className="task-metadata">
              <div className="meta-item">
                <Clock size={14} /> <span>Creado: {task.createdAt?.toDate ? task.createdAt.toDate().toLocaleDateString() : 'Fecha no disponible'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;