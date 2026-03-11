import React, { useState } from 'react';
import { X, Save, AlertOctagon, PlusCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp, doc, runTransaction } from 'firebase/firestore';
import { db } from '../firebase';
import './CreateTaskModal.css';

const CreateTaskModal = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('todo');
  const [priority, setPriority] = useState('medium');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const counterRef = doc(db, "metadata", "taskCounter");

    try {
      await runTransaction(db, async (transaction) => {
        const counterDoc = await transaction.get(counterRef);
        
        if (!counterDoc.exists()) {
          throw new Error("El documento contador 'metadata/taskCounter' no existe.");
        }

        const nextValue = counterDoc.data().currentValue + 1;
        const customId = `TKP-${nextValue.toString().padStart(2, '0')}`;

        const taskCollectionRef = collection(db, "task");
        await addDoc(taskCollectionRef, {
          title,
          status,
          priority,
          customId,
          startDate: startDate ? new Date(startDate) : null,
          endDate: endDate ? new Date(endDate) : null,
          createdAt: serverTimestamp(),
          orderIndex: Date.now()
        });

        transaction.update(counterRef, { currentValue: nextValue });
      });

      onClose();
    } catch (error) {
      console.error("Error al crear tarea:", error);
    }
  };

  const getPriorityColor = (p) => {
    switch(p) {
      case 'high': return '#FF8F83';
      case 'medium': return '#FFE7A1';
      default: return '#A2FFDA';
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <header className="modal-header">
          <div className="modal-header-title">
            <PlusCircle size={18} className="title-icon" />
            <h3>Create Tarea</h3>
          </div>
          <button className="btn-close" onClick={onClose}><X size={20} /></button>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título</label>
            <input 
              type="text" 
              placeholder="E.g., Implement Firebase Auth" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required 
            />
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label>Fecha Inicio</label>
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="form-group flex-1">
              <label>Fecha Fin</label>
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label>Estado</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="todo">Tareas por hacer</option>
                <option value="in-progress">En curso</option>
                <option value="paused">En pausa</option>
                <option value="done">Finalizada</option>
                <option value="dismissed">Desestimada</option>
              </select>
            </div>

            <div className="form-group flex-1 priority-group">
              <label>Priority</label>
              <div className="custom-select-wrapper">
                <AlertOctagon size={16} className="priority-icon" style={{color: getPriorityColor(priority)}} />
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </div>

          <footer className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-save">
              <Save size={16} /> Create
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;