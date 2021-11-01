import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DateUtils from '../utils/DateUtils';
import Loader from '../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faFile } from '@fortawesome/free-solid-svg-icons'
import url from '../utils/url';
import { UserContext } from '../utils/UserContext';


function Home () {
    const [myEditor, setMyEditor] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { user, setUser } = useContext(UserContext);

    // useEffect(() => {
    //     axios.post('/findall')
    //     .then(response => {setDocuments(response.data); setIsLoading(false)});
    // }, [])

    useEffect(() => {

        axios.post(
            '/graphql', 
            JSON.stringify({ query: "{ getAllDocuments { id, name, updated, created }}"}),
            {headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }},
        )
        .then(response => {
            setDocuments(response.data.data.getAllDocuments);
            setIsLoading(false)});
    }, [])

    return (
        <div className="Home">
            <h1>Documents</h1>
            {isLoading ? (
                        <div className="table-load">
                            <Loader></Loader>
                        </div>
            ) :
(            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Created</th>
                        <th>Last updated</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody data-testid="documents-table">
                    {documents.length == 0 ? <tr><td>Can't find any documents</td></tr> : <tr><td>Here is what we found:</td></tr> }
                    {
                    documents.map(function(doc, index){
                        return (
                            <tr key={doc.id}>
                                <td><Link to={url("/editor/" + doc.id)}><FontAwesomeIcon size="lg" icon={faFile}></FontAwesomeIcon>  {doc.name}</Link></td>
                                <td>{new Date(parseInt(doc.created)).toLocaleString()}</td>
                                <td>{DateUtils.relativeSinceDate(parseInt(doc.updated))}</td>
                                <td><FontAwesomeIcon onClick={() => {




                                    axios({
                                        url: "/graphql",
                                        method: "post",
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Accept': 'application/json',
                                            'Authorization': `Bearer ${user.token}`
                                        },
                                        data: {
                                            query: `mutation { deleteDocument(id: "${doc.id}") { id, name, content, updated, created }}`}
                                    }).then(response => {
                                        console.log(response)
                                    });


                                    setDocuments(documents.slice(0, index).concat(documents.slice(index + 1)));
                                }} className="deleteBtn" size="lg" icon={faTrash} /></td>
                            </tr>);
                    })}
                </tbody>
            </table>)}


        </div>
    );
}

export default Home;
