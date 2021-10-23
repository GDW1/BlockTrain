import React, { useState } from 'react';
import './Profile.css';

function Profile(props){
    const[name, setName] = useState(props.name.toString());
    const[description, setDescription] = useState(props.description.toString());
    const[profilePic, setPic] = useState("https://as2.ftcdn.net/v2/jpg/00/64/67/63/1000_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg");
    return (
        <div>
            <img class = "ProfilePic" src = {profilePic}/>
            <h2 class = "ProfileName">{name}</h2>
            <p class = "ProfileDescription">{description}</p>
        </div>
    )


}
export default Profile