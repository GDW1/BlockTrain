import logo from './logo.svg';
import './App.css';
import Header from './components/Header.jsx'
import Display from './components/Display.jsx'
import InputBox from './components/InputBox';
import TrainController from './components/TrainController';
import axios from 'axios';


      
function App() {
  return (
    <div className="App">
        <Header/>
        <TrainController/>
    </div>
  );
}

export default App;
