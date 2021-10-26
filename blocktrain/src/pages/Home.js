/* Filename: Home.js; Last Updated: 10/23/2021
 * Home.js sets up the homepage which contains the header, display, and input box
 */
import './Home.css';
import Header from '../components/Header.jsx'
import TrainController from '../components/TrainController';

function Home() {
    return (
        <div className="Home">
            <Header/>
            <TrainController/>
        </div>
    );
}

export default Home;
