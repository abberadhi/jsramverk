import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Loader from '../components/Loader';
import url from '../utils/url';
import { UserContext } from '../utils/UserContext';

function Create () {
    let history = useHistory();

    const { user, setUser } = useContext(UserContext);

    useEffect(() => {


        axios({
            url: "/graphql",
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            data: {
                query: `mutation { editDocument(content: "", name: "Untitled") { id, name, content, updated, created }}`}
        }).then(response => {
            history.push(url("/editor/" + response.data.data.editDocument.id));
        });

        // axios.post('/update', {name: "Untitled", content:""})
        // .then(response => {history.push(url("/editor/" + response.data.insertedId));})
        // .catch(error => console.log("Something went wrong: ", error));
    }, [])

    return (
        <div className="Create fullscreen-loading">
            <Loader></Loader> 
        </div>
    );
}

export default Create;