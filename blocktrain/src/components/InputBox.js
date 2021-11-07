import React, {useState} from 'react';
import './InputBox.css';
import validator from 'validator';
import axios from 'axios';

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

function InputBox(props){
    const [next_word, setWord] = useState("");
    const [user_key, setUserKey] = useState("");
    const [userValid, setUserValid] = useState(false);

    const handleSubmit = (event) =>{
        event.preventDefault();
        //client side validation
        const validationUserString = validate(
            [
                {func: validator.isAlpha, message: "Input must contain only letters"},
                {func: (inp) => !validator.isEmpty(inp), message: "Input cannot be empty"}
            ],
            next_word.toString()
        );
        if (validationUserString.isValid){
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

            // Removes disabling after 10 second.
            window.setTimeout(function() {
                elemSubmit.removeAttribute("disabled");
            }, 10e3);
            /* End of section */
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
            const url = "http://localhost:3000/userkeys";
            /*== This section gets the keys from backend and checks userKey with them ==*/
            // NOTE: NEED BACKEND FOR ACTUAL TESTING
            console.log("HERE")
            axios.get(url)
                .then(
                    (res) => {
                        // let rawData = JSON.parse(JSON.stringify(res.data));
                        // for (let i = 0; i < rawData.length - 1; i++){
                        //     console.log(rawData[i])
                        //     if (rawData[i] == user_key){
                        //
                        //         setUserValid(true);
                        //         break;
                        //     }
                        // }
                        let rawData = JSON.parse(JSON.stringify(res.data));
                        let newData = [];
                        for (let i = 0; i < rawData.length; i++){
                            console.log(rawData[i])
                            newData.push(rawData[i].key);
                        }
                        for (let i = 0; i < newData.length; i++){
                            console.log(newData[i])
                            console.log(user_key)
                            if (newData[i] === user_key){
                                setUserValid(true);
                                break;
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

        /*== This section sends a GET request to the backend to verify user_key is valid ==*/

        /* End of Section */
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
                        placeholder="Enter your user key"
                        type="text"
                        minLength="1"
                        maxLength="32"
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
                        placeholder="Enter your word"
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