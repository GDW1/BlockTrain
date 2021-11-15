/* Filename: AboutUs.js; Last Updated: 10/23/2021
 * AboutUs.js sets up the page that is about us.
 */
import './AboutUs.css';
import Header from '../components/Header.jsx'
import Profile from '../components/Profile.js'
import daryl from '../images/daryl.png'
import david from '../images/david.png'
import guy from '../images/guy.png'
import ryan from '../images/ryan.png'
import kyle from '../images/kyle.png'
import rohan from '../images/rohan.png'

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
                        <div>
                            <img class = "ProfilePic" src = {daryl} alt = " "/>
                            <h2 class = "ProfileName">{"Daryl"}</h2>
                            <p class = "ProfileDescription">{"1st Year CS"}</p>
                        </div>
                                 
                    </td>
                    <td>
                        <div>
                            <img class = "ProfilePic" src = {david} alt = " "/>
                            <h2 class = "ProfileName">{"David"}</h2>
                            <p class = "ProfileDescription">{"1st Year CS"}</p>
                        </div>
                    </td>
                    <td>
                        <div>
                            <img class = "ProfilePic" src = {guy} alt = " "/>
                            <h2 class = "ProfileName">{"Guy"}</h2>
                            <p class = "ProfileDescription">{"1st Year Computing"}</p>
                        </div>
                    </td>
                    <td>
                        <div>
                            <img class = "ProfilePic" src = {kyle} alt = " "/>
                            <h2 class = "ProfileName">{"Kyle"}</h2>
                            <p class = "ProfileDescription">{"1st Year CS"}</p>
                        </div>
                    </td>
                    <td>
                        <div>
                            <img class = "ProfilePic" src = {ryan} alt = " "/>
                            <h2 class = "ProfileName">{"Ryan"}</h2>
                            <p class = "ProfileDescription">{"1st Year Computing"}</p>
                        </div>
                    </td>
                    <td>
                    <   div>
                            <img class = "ProfilePic" src = {rohan} alt = " "/>
                            <h2 class = "ProfileName">{"Rohan"}</h2>
                            <p class = "ProfileDescription">{"1st Year CE"}</p>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    );
}

export default AboutUs;
