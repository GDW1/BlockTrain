/* Filename: FullStory.js; Last Updated: 10/23/2021
 * FullStory.js sets up the page to display all words in the blockchain.
 */
import './FullStory.css';
import Header from '../components/Header.jsx'
import DisplayFullStory from '../components/DisplayFullStory.jsx';

function FullStory() {
    return (
        <div className="FullStory">
            <Header/>
            <h1>Full Story</h1>
            <DisplayFullStory />
        </div>
    );
}

export default FullStory;
