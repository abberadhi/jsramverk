import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Loader from '../components/Loader';
import url from '../utils/url';

function Create () {
    let history = useHistory();
    useEffect(() => {
        axios.post('/update', {name: "Untitled", content:""})
        .then(response => {history.push(url("/editor/" + response.data.insertedId));})
        .catch(error => console.log("Something went wrong: ", error));
    }, [])

    return (
        <div className="Create fullscreen-loading">
            <Loader></Loader> 
        </div>
    );
}

export default Create;