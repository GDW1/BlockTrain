/* Filename: App.js; Last Updated: 10/23/2021
 * App.js sets up the router to all the pages.
 */
import './App.css';
import Header from './components/Header.jsx'
import Display from './components/Display.jsx'
import InputBox from './components/InputBox';
import TrainController from './components/TrainController';
import axios from 'axios';

<<<<<<< HEAD

      
function App() {
  return (
    <div className="App">
        <Header/>
        <TrainController/>
=======
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
>>>>>>> e6c814c5a78a9530318dc99065211ccc8d378db6
    </div>
  );
}

export default App;
