import logo from './logo.svg';
import './App.css';
import Header from './components/Header.jsx'
import Display from './components/Display.jsx'
import InputBox from './components/InputBox';
import axios from 'axios';


      
function App() {
  return (
    <div className="App">
        <Header/>
        <InputBox/>
        <Display/>
    </div>
  );
}

export default App;
