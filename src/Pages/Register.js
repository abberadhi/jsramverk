import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import DateUtils from '../utils/DateUtils';
import Loader from '../components/Loader';
import url from '../utils/url';
import auth from '../utils/auth';
import { UserContext } from '../utils/UserContext';


function SignIn (props) {
    let history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const { user, setUser } = useContext(UserContext)
    
    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);


        axios({
            url: "/graphql",
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            data: {
                query: `mutation { registerUser(email: "${email}", password: "${password}") {  id, email, token, msg }}`}
        }).then((response => {
            let res = response.data.data.registerUser;
            setLoading(false);

            if (res.msg) { 
                setErrMsg(res.msg);
                return;
            }

            setUser({
                id: res.id,
                email: res.email,
                token: res.token
            });

            history.push(url("/" ));

        }))

        

        // auth.login(email, password, setLoading, setErrMsg).then(() => history.push(url("/" )));
    }

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    return (
        <div className="signin">
            <h1>Register</h1>
            {!loading ? (<div>
                {errMsg ? <div className="errMsg"><h4>Error</h4>
                <p>{errMsg}</p>
                </div> : null}
                

                <form onSubmit={handleSubmit}> 
                    <div className="container">
                        <label for="uname"><b>Email</b></label>
                        <input autoFocus onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter Username" name="uname" required></input>
                        
                        <label for="psw"><b>Password</b></label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" name="psw" required></input>

                        <button type="submit" disabled={!validateForm()}>Login</button>
                    </div>
                    <div class="container">
                        <span class="psw">Already have an account? <Link to={url("/signin")}>Click here</Link></span>
                    </div>
                </form>            
            </div>) : <Loader></Loader>}
        </div>
    );
}

export default SignIn;
