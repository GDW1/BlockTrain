/* Filename: Home.js; Last Updated: 10/23/2021
 * Home.js sets up the homepage which contains the header, display, and input box
 */
import './Home.css';
import Header from '../components/Header.jsx'
import Instructions from '../components/Instructions.jsx'
import TrainController from '../components/TrainController';
import React, {useState} from 'react';

function Home() {
    const[currentID, setCurrentID] = useState(0);
    return (
        <div className="Home">
            <Header/>
            <div className="body">
                <Instructions id="background"/>
                <TrainController id="foreground"/>
            </div>
        </div>
    );
}

export default Home;
