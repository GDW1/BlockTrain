/* Filename: AboutUs.js; Last Updated: 10/23/2021
 * AboutUs.js sets up the page that is about us.
 */
import './AboutUs.css';
import Header from '../components/Header.jsx'
import Profile from '../components/Profile.js'

function AboutUs() {
    return (
        <div className="AboutUs">
            <Header/>
            <div id="textAboutUs">
                <h1>About Us</h1>
            </div>

            
            <table id = "profiles">
                <tr>
                    <td>
                        <Profile profilePic = ""
                                 name = "Daryl"
                                 description = ""/>
                    </td>
                    <td>
                        <Profile profilePic = ""
                                 name = "David"
                                 description = ""/>
                    </td>
                    <td>
                        <Profile profilePic = ""
                                 name = "Guy"
                                 description = ""/>
                    </td>
                    <td>
                        <Profile profilePic = ""
                                 name = "Kyle"
                                 description = ""/>
                    </td>
                    <td>
                        <Profile profilePic = ""
                                 name = "Ryan"
                                 description = ""/>
                    </td>
                    <td>
                        <Profile profilePic = ""
                                 name = "Rohan"
                                 description = ""/>
                    </td>
                </tr>
            </table>
        </div>
    );
}

export default AboutUs;
