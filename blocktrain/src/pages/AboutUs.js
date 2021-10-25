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
            <h1>About Us</h1>
            <table id = "profiles">
                <tr>
                    <td>
                        <Profile profilePic = ""
                                 name = "Daryl Ou"
                                 description = ""/>
                    </td>
                    <td>
                        <Profile profilePic = ""
                                 name = "David Wang"
                                 description = ""/>
                    </td>
                    <td>
                        <Profile profilePic = ""
                                 name = "Guy Wilks"
                                 description = ""/>
                    </td>
                    <td>
                        <Profile profilePic = ""
                                 name = "Kyle Wong"
                                 description = ""/>
                    </td>
                    <td>
                        <Profile profilePic = ""
                                 name = "Ryan He"
                                 description = ""/>
                    </td>
                    <td>
                        <Profile profilePic = ""
                                 name = "Rohan Marangoly"
                                 description = ""/>
                    </td>
                </tr>
            </table>
        </div>
    );
}

export default AboutUs;
