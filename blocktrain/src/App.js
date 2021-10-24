import logo from './logo.svg';
import './App.css';
import Header from './components/Header.jsx'
import Display from './components/Display.jsx'
import InputBox from './components/InputBox';

function App() {
  
  return (
    <div className="App">
        <Header/>
        <Display/>
        <InputBox/>
    </div>
  );
}

export default App;
