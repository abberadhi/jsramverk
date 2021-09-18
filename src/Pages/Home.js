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
            {
                documents.map(function(doc, index){
                    return <p>{doc.content}</p>;
                })}

        </div>
    );
}

export default Home;

