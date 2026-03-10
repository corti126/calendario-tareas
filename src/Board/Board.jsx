import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase'; 
import Column from '../Column/Column';
import TaskModal from '../TaskModal/TaskModal';
import './Board.css';

const Board = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "task"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(taskData);
      setLoading(false);
    }, (error) => {
      console.error("Error al traer tareas: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const columns = [
    { id: 'todo', title: 'Tareas por hacer' },
    { id: 'in-progress', title: 'En curso' },
    { id: 'paused', title: 'En pausa' },
    { id: 'done', title: 'Finalizada' },
    { id: 'dismissed', title: 'Desestimadas' },
  ];

  if (loading) return <div className="loading">Cargando tablero...</div>;

  return (
    <main className="board-wrapper">
      <header className="board-header">
        <h2>Tablero Kanban Personal</h2>
      </header>
      
      <div className="board">
        {columns.map(col => (
          <Column 
            key={col.id} 
            title={col.title} 
            tasks={tasks.filter(t => t.status === col.id)} 
            statusId={col.id}
            onTaskClick={(task) => setSelectedTask(task)} 
          />
        ))}
      </div>

      {selectedTask && (
        <TaskModal 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
        />
      )}
    </main>
  );
};

export default Board;