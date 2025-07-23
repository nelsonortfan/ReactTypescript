import './App.css'
import Greeting from './components/Greetings';
import React from 'react';
import UserFormModal from './components/UseFormModal';

function App() {

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div>
      <h1>Mi primera App usando TypeScript</h1>
      <Greeting name="Nelson" age={37} />
       <button onClick={() => setIsModalOpen(true)}>Abrir formulario</button>
       <UserFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App
