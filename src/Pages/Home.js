import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DateUtils from '../utils/DateUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function Home () {
    const [myEditor, setMyEditor] = useState(null);
                // onClick={ () => console.log(myEditor.getData())}

    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        // axios.post('https://localhost:1337/findall').then((data) => console.log(data));
        axios.post('/findall')
        .then(response => {setDocuments(response.data); console.log(response)});
    }, [])
    
        

    return (
        <div className="Home">
            <h1>Documents</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Created</th>
                        <th>Last updated</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    documents.map(function(doc, index){
                        return (
                            <tr>
                                <td><Link to={"/editor/" + doc._id}>{doc.name}</Link></td>
                                <td>{new Date(doc.created).toLocaleString()}</td>
                                <td>{DateUtils.relativeSinceDate(doc.updated)}</td>
                                <td><FontAwesomeIcon onClick={() => {
                                    axios.post('/delete', {"id": doc._id});
                                    setDocuments(documents.slice(0, index).concat(documents.slice(index + 1)));
                                }} className="deleteBtn" size="lg" icon={faTrash} /></td>
                            </tr>);
                    })}
                </tbody>
            </table>


        </div>
    );
}

export default Home;

