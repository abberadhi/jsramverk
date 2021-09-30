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

const socket = socketIOClient(ENDPOINT);

function Editor () {
    const { id } = useParams();
    const [myEditor, setMyEditor] = useState(null);
    
    // only stores the inital document, used to solve issue
    // used to solve issue where rerenders are infinite because of `document` change.
    const [initialDocument, setInitialDocument] = useState(null); 

    // stores new document everytime it changes. Used to send post req
    const [document, setDocument] = useState(null);

    const [name, setName] = useState(null);
    const [content, setContent] = useState(null);
    const [updated, setUpdated] = useState(null);
    const [created, setCreated] = useState(null);

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
                
                setName(response.data.name);
                setContent(response.data.content);
                setUpdated(response.data.updated);
                setCreated(response.data.created);

                setInitialDocument(response.data);
            });
            setTimeoutSave(new autoSaveTimer());
    }, []);

    useEffect(() => {
        if(initialDocument && myEditor) {
            setIsSyncing(true);

            myEditor.setData(content);
            // socket.emit('create', initialDocument._id);

            // socket.on('doc', function(data) {
            //     // setIsSyncing(true);
            //     console.log("doc before", document);
                
            //     // setDocument({...document, ...temp});

            //     setName(data.name);
            //     setContent(data.content);
            //     setUpdated(new Date());
            //     setCreated(data.created);

            //     myEditor.setData(data.content);

            //     setIsSyncing(false);
            // });

            console.log("youre fucked")

            setIsLoading(false);
            setInitiated(true);
            setIsSyncing(false);
        }

        return () => socket.disconnect();
    }, [initialDocument, myEditor]);

    useEffect(() => console)

    function saveDocument(text) {

        setName(text ?? name);
        setContent(myEditor.getData());
        setUpdated(new Date());

        // socket.emit('sync', {id: initialDocument._id, name: text ?? name, content: content});
        
        timeoutSave.save(() => {
            axios.post('/update', {
                id: initialDocument._id,
                name,
                content,
                updated,
                created
            });
        }, setIsSaving);
    }

    return (
        <div className="Editor" data-testid="test-editor">
            {isLoading ?
                (<div className="fullscreen-loading">
                    <Loader></Loader> 
                </div>): null
            }
            {initialDocument ? 
            <Overlay
                name={name}
                created={created}
                updated={updated}
                isSaving={isSaving}
                setName={setName}
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
