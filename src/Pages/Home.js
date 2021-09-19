import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';

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
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    documents.map(function(doc, index){
                        return (
                            <tr>
                                <td><Link to={"/editor/" + doc._id}>{doc.name}</Link></td>
                                <td>{new Date(doc.created).toLocaleString()}</td>
                                <td>{moment(doc.updated).fromNow()}</td>
                                <td>{new Date(doc.updated).toLocaleString()}</td>
                            </tr>);
                    })}
                </tbody>
            </table>


        </div>
    );
}

export default Home;

