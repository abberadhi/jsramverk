import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home () {
    const [myEditor, setMyEditor] = useState(null);
                // onClick={ () => console.log(myEditor.getData())}

    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        // axios.post('https://localhost:1337/findall').then((data) => console.log(data));
        axios.post('http://localhost:1337/findall')
        .then(response => setDocuments(response.data));
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
                        return (<tr>
                            <td>{doc.name}</td>
                            <td>{new Date(doc.created).toLocaleString()}</td>
                            <td>{new Date(doc.updated).toLocaleString()}</td>
                            <td>{doc.updated}</td>
                            </tr>);
                    })}
                </tbody>
            </table>


        </div>
    );
}

export default Home;

