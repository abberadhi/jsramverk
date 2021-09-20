import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Loader from '../components/Loader';

function Create () {
    let history = useHistory();
    useEffect(() => {
        // axios.post('https://localhost:1337/findall').then((data) => console.log(data));
        axios.post('/update', {name: "Untitled", content:""})
        .then(response => history.push("/editor/" + response.data.insertedId));
    }, [])

    return (
        <div className="Create">
            <div className="fullscreen-loading">
                    <Loader></Loader> 
            </div>
        </div>
    );
}

export default Create;

