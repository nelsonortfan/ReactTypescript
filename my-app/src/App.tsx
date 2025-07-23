import './App.css'
import Greeting from './components/Greetings';

function App() {
  return (
    <div>
      <h1>Mi primera App usando TypeScript</h1>
      <Greeting name="Nelson" age={37} />
    </div>
  );
}

export default App
