import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DateUtils from '../utils/DateUtils';
import Loader from '../components/Loader';
import url from '../utils/url';
import auth from '../utils/auth';


function SignIn (props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState(null);
    
    function handleSubmit(event) {
        event.preventDefault();
        

    }

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    return (
        <div className="signin">
            <h1>Sign in</h1>
            <div className="errMsg"><h4>Error</h4>
            <p>Something happened</p>
            </div>

            <form onSubmit={handleSubmit}> 
                <div className="container">
                    <label for="uname"><b>Email</b></label>
                    <input autoFocus onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Username" name="uname" required></input>
                    
                    <label for="psw"><b>Password</b></label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" name="psw" required></input>

                    <button type="submit" disabled={!validateForm()}>Login</button>
                </div>
                <div class="container">
                    {/* <button type="button" class="cancelbtn">Cancel</button> */}
                    <span class="psw">Not registered? <a href="#">Click here</a></span>
                </div>
            </form>            

        </div>
    );
}

export default SignIn;
