/* Filename: AboutUs.js; Last Updated: 10/23/2021
 * AboutUs.js sets up the page that is about us.
 */
import './AboutUs.css';
import Header from '../components/Header.jsx'

function AboutUs() {
    return (
        <div className="AboutUs">
            <Header/>
            <div id="text">
                <h1>THIS IS THE ABOUT US PAGE</h1>
            </div>
        </div>
    );
}

export default AboutUs;
