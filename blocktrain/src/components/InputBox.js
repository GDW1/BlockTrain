import React, {useState} from 'react';
import './InputBox.css';
import validator from 'validator';
import axios from 'axios';
const Filter = require('bad-words');
const filter = new Filter();

function validate(rules, stringField){
    //rules are conditions to be checked and accompanying messages
    //rules should have func and message properties
    let isValid = true;
    let message = [];
    rules.forEach(
        rule => {
            if (!rule.func(stringField)){
                isValid = false;
                message.push(rule.message);
            }
        }
    );
    return {isValid: isValid, message: message};
}
//slightly improve filter.isProfane to block more bad words
function isProfanity(word) {
    if(filter.isProfane(word))
        return true;
    if(filter.isProfane(word.substring(0,4)))
        return true;
    if(filter.isProfane(word.substring(word.length-4, word.length)))
        return true;
    return false;
}

function InputBox(props){
    const [next_word, setWord] = useState("");

    const handleSubmit = (event) =>{
        event.preventDefault();
        //client side validation
        const validation = validate(
            [
                {func: validator.isAlpha, message: "Input must contain only letters"},
                {func: (inp) => !validator.isEmpty(inp), message: "Input cannot be empty"},
                {func: (inp) => !isProfanity(inp), message: "Input cannot contain profanity"}
                
            ],
            next_word.toString()
        );
        if (validation.isValid){
            //setting update to true causes Display to refresh instantly
            //alert(`The word you entered is: ${next_word.toString()}`)
            props.setUpdate(true);

            /*== This section posts the next word to the backend --*/
            // NOTE: NEED BACKEND FOR ACTUAL TESTING
            axios.post("http://localhost:3000/trainwords", {
                "word": next_word.toString()
            })
            .then(res => console.log(res))
            .catch(err => console.log(err))
            /* End of Section */

            /*== This section delays the user from entering another word for 1 second ==*/
            var elemSubmit = document.getElementById('next_word');
            elemSubmit.setAttribute("disabled", "disabled");

            // Removes disabling after 1 second. TODO CHANGE WHEN DEPLOYING SITE!!!!!
            window.setTimeout(function() {
                elemSubmit.removeAttribute("disabled");
            }, 10e3);
            /* End of section */
        }
        else{
            /*== This section alerts the user that the input is invalid ==*/
            let bigMessage = "";
            validation.message.forEach(
                part => bigMessage += `-${part}\n`
            );
            alert("Input Invalid\n" + bigMessage);
            /* End of Section */
        }
        setWord("");
    }

    return (
        <div className = {"InputField"}>
            <form onSubmit={handleSubmit}>
                <input 
                id="next_word"
                name="next_word" 
                className = "InputBox"
                placeholder="Enter your word" 
                type = "text" 
                minLength = "1" 
                maxLength = "13"
                autocomplete="off"
                value = {next_word}
                onChange = {(e) => setWord(e.target.value)}/>
                <input  type = "submit" id = "InputSubmitButton" /*style = {{position: 'relative', left: '100px'}}*/></input>
            </form>
        </div> 
    )

}

export default InputBox