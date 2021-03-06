import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DateUtils from '../utils/DateUtils';
import Loader from '../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faFile, faCode } from '@fortawesome/free-solid-svg-icons'
import url from '../utils/url';
import { UserContext } from '../utils/UserContext';


function Home() {
    const [myEditor, setMyEditor] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentDocId, setCurrentDocId] = useState(true);
    const [flip, setFlip] = useState(true);

    const { user, setUser } = useContext(UserContext);

    // useEffect(() => {
    //     axios.post('/findall')
    //     .then(response => {setDocuments(response.data); setIsLoading(false)});
    // }, [])

    useEffect(() => {
        loadDocs();
    }, [])

    function loadDocs() {
        axios.post(
            '/graphql',
            JSON.stringify({ query: "{ getAllDocuments { id, name, updated, type, created, creator }}" }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            },
        )
            .then(response => {
                setDocuments(response.data.data.getAllDocuments);
                setIsLoading(false)
            });
    }

    function addGuest(e) {
        e.preventDefault();

        let email = e.target[0].value

        axios({
            url: "/graphql",
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            data: {
                query: `mutation { addUser(id: "${currentDocId}", email: "${email}") { id }}`
            }
        }).then(response => {
            console.log(response)
        });

        axios({
            url: "/graphql",
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            data: {
                query: `mutation { sendMail(id: "${currentDocId}", to: "${email}") { id }}`
            }
        }).then(response => {
            console.log(response)
        });



        e.target[0].value = ""
    }


    return (
        <div className="Home">
            <h1>Documents</h1>
            <button style={{"float": "right"}} type="button" className="btn btn-success" onClick={() => {
                setIsLoading(true);
                loadDocs();
            }}>Refresh</button>
            {isLoading ? (
                <div className="table-load">
                    <Loader></Loader>
                </div>
            ) :
                (<table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Created</th>
                            <th>Owner</th>
                            <th>Last updated</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody data-testid="documents-table">
                        {documents.length == 0 ? <tr><td>Can't find any documents</td></tr> : <tr><td>Here is what we found:</td></tr>}
                        {
                            documents.map(function (doc, index) {
                                return (
                                    <tr key={doc.id}>
                                        <td><Link to={url(doc.type == "code" ? "/editorcode/" + doc.id : "/editordocument/" + doc.id)}>{doc.type == "code" ? <FontAwesomeIcon size="lg" icon={faCode}></FontAwesomeIcon> : <FontAwesomeIcon size="lg" icon={faFile}></FontAwesomeIcon>}  {doc.name}</Link></td>
                                        <td>{new Date(parseInt(doc.created)).toLocaleString()}</td>
                                        <td>{doc.creator}</td>
                                        <td>{DateUtils.relativeSinceDate(parseInt(doc.updated))}</td>
                                        <td>

                                            <div className="dropdown show">
                                                <a onClick={() => setCurrentDocId(doc.id)} className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                                </a>

                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                                    <Link className="dropdown-item" to={url(doc.type == "code" ? "/editorcode/" + doc.id : "/editordocument/" + doc.id)}>Edit</Link>
                                                    <div className="dropdown-item" data-toggle="modal" data-target="#shareModal" href="#" style={{ cursor: "pointer" }}>Share</div>
                                                    <div className="dropdown-item" style={{ color: "red", cursor: "pointer" }}
                                                        onClick={() => {
                                                            axios({
                                                                url: "/graphql",
                                                                method: "post",
                                                                headers: {
                                                                    'Content-Type': 'application/json',
                                                                    'Accept': 'application/json',
                                                                    'Authorization': `Bearer ${user.token}`
                                                                },
                                                                data: {
                                                                    query: `mutation { deleteDocument(id: "${doc.id}") { id, name, content, updated, created }}`
                                                                }
                                                            }).then(response => {
                                                                console.log(response)
                                                            });

                                                            setDocuments(documents.slice(0, index).concat(documents.slice(index + 1)));
                                                        }}>Delete</div>
                                                </div>
                                            </div>

                                        </td>
                                    </tr>);
                            })}
                    </tbody>
                </table>)}

            <div className="modal fade" id="shareModal" tabIndex="-1" role="dialog" aria-labelledby="shareModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">

                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="shareModalLabel">Share this document {currentDocId}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={addGuest}>
                            <div className="modal-body">
                                <label> Share this document with:<br></br>
                                    <input type="email" placeholder="john@doe.xyz"></input>
                                </label>
                            </div>


                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Add</button>
                            </div>
                        </form>
                        <div className="modal-body">
                            <hr></hr>
                            <h5>People invited to this document:</h5>
                            <p>No one</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
