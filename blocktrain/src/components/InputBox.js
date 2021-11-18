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
//slightly improve filter.isProfane 
function isProfanity(word) {

    if(filter.isProfane(word))
        return true;
    for (let i=0; i<word.length-2; i++) 
        if (word.substring(i,i+3).toLowerCase() === 'fck' || word.substring(i,i+3).toLowerCase() === 'nlg' || word.substring(i,i+3).toLowerCase() === 'ngg' || word.substring(i,i+3).toLowerCase() === 'fgg') 
            return true;
    for (let i=0; i<word.length-3; i++) 
        if (word.substring(i,i+4).toLowerCase() === 'shit' || word.substring(i,i+4).toLowerCase() === 'shlt' || word.substring(i,i+4).toLowerCase() === 'shjt' || word.substring(i,i+4).toLowerCase() === 'iigg' || word.substring(i,i+4).toLowerCase() === 'nigg' || word.substring(i,i+4).toLowerCase() === 'nigl' || word.substring(i,i+4).toLowerCase() === 'njgg' || word.substring(i,i+4).toLowerCase() === 'nygg' || word.substring(i,i+4).toLowerCase() === 'nicg' || word.substring(i,i+4).toLowerCase() === 'fuck' || word.substring(i,i+4).toLowerCase() === 'dick' || word.substring(i,i+4).toLowerCase() === 'dlck' || word.substring(i,i+4).toLowerCase() === 'djck') 
            return true;
    for (let i=0; i<word.length-4; i++) 
        if (word.substring(i,i+5).toLowerCase() === 'bitch' || word.substring(i,i+5).toLowerCase() === 'bltch' || word.substring(i,i+5).toLowerCase() === 'bjtch') 
            return true;

    return false;
}

function InputBox(props){
    const [next_word, setWord] = useState("");
    const [user_key, setUserKey] = useState("");
    const [valid_user_key, setValidUserKey] = useState("");
    const [userValid, setUserValid] = useState(false);

    const urlKey = "https://blocktrain-backend.herokuapp.com/userkeys";
    const urlTrainWords = "https://blocktrain-backend.herokuapp.com/trainwords";

    const handleSubmit = (event) =>{
        event.preventDefault();
        //client side validation
        const validationUserString = validate(
            [
                {func: validator.isAlpha, message: "Input must contain only letters"},
                {func: (inp) => !validator.isEmpty(inp), message: "Input cannot be empty"},
                {func: (inp) => !isProfanity(inp), message: "Input cannot contain profanity"}

            ],
            next_word.toString()
        );
        if (validationUserString.isValid){
            //setting update to true causes Display to refresh instantly
            //alert(`The word you entered is: ${next_word.toString()}`)
            props.setUpdate(true);

            axios.get(urlKey)
                .then(
                    (res) => {
                        let rawData = JSON.parse(JSON.stringify(res.data));
                        let newData = [];
                        for (let i = 0; i < rawData.length; i++){
                            newData.push(rawData[i].key);
                        }
                        for (let i = 0; i < newData.length; i++){
                            if (newData[i] === valid_user_key){
                                /*== This section posts the next word to the backend --*/
                                // NOTE: NEED BACKEND FOR ACTUAL TESTING
                                axios.post(urlTrainWords, {
                                    "word": next_word.toString(),
                                    "user_key": valid_user_key.toString()
                                })
                                    .then(res => console.log(res))
                                    .catch(err => console.log(err))
                                /* End of Section */

                                /*== This section delays the user from entering another word for 1 second ==*/
                                var elemSubmit = document.getElementById('next_word');
                                elemSubmit.setAttribute("disabled", "disabled");

                                // Removes disabling after 10 second.
                                window.setTimeout(function() {
                                    elemSubmit.removeAttribute("disabled");
                                }, 10e3);
                                /* End of section */
                                break;
                            }
                            else if (i === newData.length - 1){
                                alert("USER KEY INVALID. DO NOT TRY TO GET AROUND THIS")
                            }
                        }
                    }
                )
        }
        else{
            /*== This section alerts the user that the input is invalid ==*/
            let bigMessage = "";
            validationUserString.message.forEach(
                part => bigMessage += `-${part}\n`
            );
            alert("Input Invalid\n" + bigMessage);
            /* End of Section */
        }
        setWord("");
    }

    const handleUserKey = (event) =>{
        event.preventDefault();
        /*== This section contains frontend verification rules for user key==*/
        const validationUserKey = validate(
            [
                {func: validator.isAlphanumeric, message: "Input must contain only letters and numbers"},
                {func: (inp) => !validator.isEmpty(inp), message: "Input cannot be empty"}
            ],
            user_key.toString()
        );
        /* End of section */

        if (validationUserKey.isValid){ // Checks if userKey is valid
            props.setUpdate(true);

            /*== This section gets the keys from backend and checks userKey with them ==*/
            // NOTE: NEED BACKEND FOR ACTUAL TESTING
            axios.get(urlKey)
                .then(
                    (res) => {
                        let rawData = JSON.parse(JSON.stringify(res.data));
                        let newData = [];
                        for (let i = 0; i < rawData.length; i++){
                            newData.push(rawData[i].key);
                        }
                        for (let i = 0; i < newData.length; i++){
                            if (newData[i] === user_key){
                                alert("Success! You may now enter words.")
                                setUserValid(true);
                                setValidUserKey(user_key);
                                break;
                            }
                            else if (i === newData.length - 1){
                                alert("User key invalid. Contact admin for key.")
                            }
                        }
                    }
                )
            /* End of Section */
        }
        else{
            /*== This section alerts the user that the input is invalid ==*/
            let bigMessage = "";
            validationUserKey.message.forEach(
                part => bigMessage += `-${part}\n`
            );
            alert("Input Invalid\n" + bigMessage);
            /* End of Section */
        }
        setUserKey("");
    }

    if (!userValid) { //CHANGE TO !userValid
        return (
            <div className={"InputField"}>
                <h1>Enter Your User Key</h1>
                <form onSubmit={handleUserKey}>
                    <input
                        id="user_key"
                        name="user_key"
                        className="InputBox"
                        placeholder=""
                        type="text"
                        minLength="1"
                        maxLength="16"
                        autoComplete="off"
                        value={user_key}
                        onChange={(e) => setUserKey(e.target.value)}/>
                    <input type="submit"
                           id="InputSubmitButton" /*style = {{position: 'relative', left: '100px'}}*/></input>
                </form>
            </div>
        )
    }
    else {
        return (
            <div className={"InputField"}>
                <h1>Enter Your Word</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        id="next_word"
                        name="next_word"
                        className="InputBox"
                        placeholder=""
                        type="text"
                        minLength="1"
                        maxLength="13"
                        autocomplete="off"
                        value={next_word}
                        onChange={(e) => setWord(e.target.value)}/>
                    <input type="submit"
                           id="InputSubmitButton" /*style = {{position: 'relative', left: '100px'}}*/></input>
                </form>
            </div>
        )
    }
}

export default InputBox
