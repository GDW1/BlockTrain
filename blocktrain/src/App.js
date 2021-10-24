import './App.css';
import Header from './components/Header.jsx'
import Display from './components/Display.jsx'
import InputBox from './components/InputBox';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './pages/Home.js'
import AboutUs from './pages/AboutUs.js'
import FullStory from './pages/FullStory.js'

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route path="/" exact component={() => <Home />} />
                <Route path="/about-us" exact component={() => <AboutUs />} />
                <Route path="/full-story" exact component={() => <FullStory />} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
