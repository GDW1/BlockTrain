/* Filename: App.js; Last Updated: 10/23/2021
 * App.js sets up the router to all the pages.
 */
import './App.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import react, { useState } from 'react'
import Home from './pages/Home.js'
import AboutUs from './pages/AboutUs.js'
import FullStory from './pages/FullStory.js'

function App() {
  const [gameID, setGameID] = useState(0);
  return (
    <div className="App">
        
        
        <Router>
            <Switch>
                <Route path="/" exact component={() => <Home gameID = {gameID} setGameID = {setGameID}/>} />
                <Route path="/about-us" exact component={() => <AboutUs />} />
                <Route path="/full-story" exact component={() => <FullStory gameID = {gameID} setGameID = {setGameID}/>} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
