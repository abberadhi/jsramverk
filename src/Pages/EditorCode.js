import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import Overlay from '../components/Overlay';
import Loader from '../components/Loader';
import autoSaveTimer from '../utils/autoSaveTimer';

import html2pdf from 'html2pdf.js';

import { base64encode, base64decode } from 'nodejs-base64';

// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


import axios from 'axios';
import socketIOClient from "socket.io-client";
import { UserContext } from '../utils/UserContext';

import CEditor from "@monaco-editor/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const ENDPOINT = "http://127.0.0.1:1337";
// const ENDPOINT = "https://jsramverk-editor-abra19.azurewebsites.net";

const socket = socketIOClient(ENDPOINT);

function Editor() {
    const { id } = useParams();
    const [myEditor, setMyEditor] = useState(null);

    // only stores the inital document, used to solve issue
    // used to solve issue where rerenders are infinite because of `document` change.
    const [initialDocument, setInitialDocument] = useState(null);

    // stores new document everytime it changes. Used to send post req
    const [document, setDocument] = useState(null);

    // bool value for when loading animation for the entire page
    const [isLoading, setIsLoading] = useState(false);

    // bool for when saving animation is triggered for last updated section
    const [isSaving, setIsSaving] = useState(false);

    // stores autosavetimer object to be used for autosave
    const [timeoutSave, setTimeoutSave] = useState(false);

    // used to avoid doc from saving on first load
    const [initiated, setInitiated] = useState(false);

    // state for when an syncing is occuring - to avoid false onchange events
    const [isSyncing, setIsSyncing] = useState(false);

    const [outputLog, setOutputLog] = useState("");

    const { user, setUser } = useContext(UserContext);


    useEffect(() => {
        axios.post(
            '/graphql',
            JSON.stringify({ query: `{ getDocumentById(id: "${id}") { id, name, content, type, updated, created }}` }),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            },
        )
            .then(response => {
                setDocument(response.data.data.getDocumentById);
                setInitialDocument(response.data.data.getDocumentById);
            });

        setTimeoutSave(new autoSaveTimer());

    }, []);

    useEffect(() => {

        if (initialDocument && myEditor) {
            setIsSyncing(true);

            myEditor.getModel().setValue(document.content)
            socket.emit('create', document.id);


            socket.on('doc', function (data) {
                setIsSyncing(true);

                const temp = {
                    updated: new Date(),
                    content: data.content,
                    name: data.name,
                }
                setDocument({ ...document, ...temp });

                myEditor.getModel().setValue(data.content);
                setIsSyncing(false);
            });

            setIsLoading(false);
            setInitiated(true);
            setIsSyncing(false);

            console.log(myEditor)

        }
    }, [initialDocument, myEditor]);

    function saveDocument(text) {

        document.content = myEditor.getValue();

        socket.emit('sync', { id: document.id, name: text ?? document.name, content: document.content });
        timeoutSave.save(() => {
            const temp = {
                updated: Date.now(),
                content: myEditor.getValue(),
                name: text ?? document.name,
                id: document.id,
            }
            setDocument({ ...document, ...temp });
            // axios.post('/update', {...document, ...temp});

            axios({
                url: "/graphql",
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                data: {
                    query: `mutation editDocument($id:String!, $content:String!, $name:String!) { 
                        editDocument(id:$id, content:$content, name:$name) { id, name, content, updated, created }
                    }`,
                    variables: {
                        id: temp.id,
                        content: temp.content,
                        name: temp.name
                    }
                },
            }).then(response => {
                console.log(response)
            });

        }, setIsSaving);

    }

    function toCode() {
        // html2pdf(myEditor.getValue());

        setOutputLog("Sent request...");

        var data = {
            code: base64encode(myEditor.getValue())
        };
        
        fetch("https://execjs.emilfolino.se/code", {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
        .then(function (response) {
            return response.json();
        })
        .then(function(result) {
            let decodedOutput = base64decode(result.data);
            setOutputLog(decodedOutput);
        });

    }

    return (
        <div className="Editor" data-testid="test-editor">
            {isLoading ?
                (<div className="fullscreen-loading">
                    <Loader></Loader>
                </div>) : null
            }


            {document ?
                <Overlay
                    name={document.name}
                    created={document.created}
                    updated={document.updated}
                    isSaving={isSaving}
                    saveDocument={saveDocument}
                    execFunc={toCode}
                    icon={faPlay}
                    buttonText={" Run"}
                ></Overlay> : null}

            <div className="blankSpace">

            </div>
            <CEditor
                height="500px"
                defaultValue="// some comment"
                defaultLanguage="javascript"
                options={{
                  quickSuggestions: {
                    other: false,
                    comments: false,
                    strings: false
                  },
                  parameterHints: {
                    enabled: false
                  },
                  suggestOnTriggerCharacters: false,
                  acceptSuggestionOnEnter: "off",
                  tabCompletion: "off",
                  wordBasedSuggestions: false
                }}
              
                onMount={editor => {
                    setMyEditor(editor);
                }}
                onChange={() => {
                    if (isSyncing) return;

                    if (initiated) {
                        saveDocument();
                    }
                }}
            />
            <div class="outputlog">
                <h2>Output: </h2>
                {outputLog}
            </div>



        </div>
    );
}

export default Editor;
