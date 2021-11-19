/* Filename: FullStory.js; Last Updated: 10/23/2021
 * FullStory.js sets up the page to display all words in the blockchain.
 */
import './FullStory.css';
import Header from '../components/Header.jsx'
import DisplayFullStory from '../components/DisplayFullStory.jsx';

function FullStory(props) {

    return (
        <div className="FullStory">
            <Header/>
            <div id="text">
                <h1 id="header">Full Story</h1>
                <DisplayFullStory gameID = {props.gameID} setGameID = {props.setGameID} />
            </div>
        </div>
    );
}

export default FullStory;
