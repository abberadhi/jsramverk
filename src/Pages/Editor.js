import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Overlay from '../components/Overlay';
import Loader from '../components/Loader';
import autoSaveTimer from '../utils/autoSaveTimer';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import socketIOClient from "socket.io-client";
// import { emit } from '../../../editorAPI/src/app';

const ENDPOINT = "http://127.0.0.1:1337";
// const ENDPOINT = "https://jsramverk-editor-abra19.azurewebsites.net";

const socket = socketIOClient(ENDPOINT);

function Editor () {
    const { id } = useParams();
    const [myEditor, setMyEditor] = useState(null);
    
    // only stores the inital document, used to solve issue
    // used to solve issue where rerenders are infinite because of `document` change.
    const [initialDocument, setInitialDocument] = useState(null); 

    // stores new document everytime it changes. Used to send post req
    const [document, setDocument] = useState(null);

    // bool value for when loading animation for the entire page
    const [isLoading, setIsLoading] = useState(true);

    // bool for when saving animation is triggered for last updated section
    const [isSaving, setIsSaving] = useState(false); 

    // stores autosavetimer object to be used for autosave
    const [timeoutSave, setTimeoutSave] = useState(false);

    // used to avoid doc from saving on first load
    const [initiated, setInitiated] = useState(false);

    // state for when an syncing is occuring - to avoid false onchange events
    const [isSyncing, setIsSyncing] = useState(false);

    useEffect(() => {
            axios.post('/find', {"id": id})
            .then(response => {
                setDocument(response.data);
                setInitialDocument(response.data);
            });
            setTimeoutSave(new autoSaveTimer());
    }, []);

    useEffect(() => {
        if(initialDocument && myEditor) {
            setIsSyncing(true);

            myEditor.setData(document.content)
            socket.emit('create', document._id);

            socket.on('doc', function(data) {
                setIsSyncing(true);
                
                const temp = {
                    updated: new Date(),
                    content: data.content,
                    name: data.name,
                }
                setDocument({...document, ...temp});

                myEditor.setData(data.content);
                setIsSyncing(false);
            });

            setIsLoading(false);
            setInitiated(true);
            setIsSyncing(false);
        }
    }, [initialDocument, myEditor]);

    function saveDocument(text) {
        document.content = myEditor.getData();
        socket.emit('sync', {id: document._id, name: text ?? document.name, content: document.content});
        timeoutSave.save(() => {
            const temp = {
                updated: new Date(),
                content: myEditor.getData(),
                name: text ?? document.name,
                id: document._id,
            }
            setDocument({...document, ...temp});
            axios.post('/update', {...document, ...temp});
        }, setIsSaving);
    }

    return (
        <div className="Editor" data-testid="test-editor">
            {isLoading ?
                (<div className="fullscreen-loading">
                    <Loader></Loader> 
                </div>): null
            }
            {document ? 
            <Overlay
                name={document.name}
                created={document.created}
                updated={document.updated}
                isSaving={isSaving}
                saveDocument={saveDocument}
            ></Overlay> : null}

            <CKEditor
                data-testid="theEditor"
                editor={ ClassicEditor }
                onReady={ editor => {
                    setMyEditor(editor);
                } }
                onChange={ () => {
                    if (isSyncing) return;

                    if (initiated) {
                        saveDocument();
                    }
                }}
            />
        </div>
    );
}

export default Editor;
