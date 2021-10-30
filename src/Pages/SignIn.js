import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DateUtils from '../utils/DateUtils';
import Loader from '../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faFile } from '@fortawesome/free-solid-svg-icons'
import url from '../utils/url';
import auth from '../utils/auth';


function SignIn (props) {
    return (
        <div className="Home">
            <h1>Documents</h1>
            <button onClick={
                () => {
                    auth.login()
                    props.history.push("/")
                }
            }> text</button>
        </div>
    );
}

export default SignIn;
