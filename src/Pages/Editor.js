import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Overlay from '../components/Overlay';
import Loader from '../components/Loader';
import autoSaveTimer from '../utils/autoSaveTimer';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

function Editor () {
    const { id } = useParams();
    const [myEditor, setMyEditor] = useState(null);
    const [initialDocument, setInitialDocument] = useState(null);
    const [document, setDocument] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isTimeout, setIsTimeout] = useState(false);

    useEffect(() => {
            axios.post('/find', {"id": id})
            .then(response => {
                setDocument(response.data);
                setInitialDocument(response.data);
            });
            setIsTimeout(new autoSaveTimer);
    }, [])

    useEffect(() => {
        if(initialDocument && myEditor) {
            myEditor.setData(document.content)
            setIsLoading(false);
        }
    }, [initialDocument, myEditor])

    return (
        <div className="Editor">
            {isLoading ?
                (<div class="fullscreen-loading">
                    <Loader></Loader> 
                </div>): null
            }
            {document ? 
            <Overlay
                name={document.name}
                created={document.created}
                updated={document.updated}
                isSaving={isSaving}
            ></Overlay> : null}

            <CKEditor
                editor={ ClassicEditor }
                onReady={ editor => {
                    setMyEditor(editor);
                } }
                onChange={ () => {
                    isTimeout.save(() => {
                        const temp = {
                            updated: new Date(),
                            content: myEditor.getData(),
                            id: document._id
                        }
                        setDocument({...document, ...temp});
                        axios.post('/update', {...document, ...temp});
                    }, setIsSaving);
                }}
            />
        </div>
    );
}

export default Editor;
