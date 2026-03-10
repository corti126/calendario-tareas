import React, {useState} from 'react';
import Board from './Board/Board';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import CreateTaskModal from './CreateTaskModal/CreateTaskModal';
import './App.css';

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="app-container">
      <Navbar onCreateClick={() => setIsModalOpen(true)} />
      <div className="main-layout">
        <Sidebar />
        <section className="content-area">
          <Board />
        </section>
      </div>
      {isModalOpen && (
        <CreateTaskModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

export default App;