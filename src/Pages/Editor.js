import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Overlay from '../components/Overlay';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

function Editor () {
    const { id } = useParams();
    const [myEditor, setMyEditor] = useState(null);
    const [document, setDocument] = useState(null);

    useEffect(() => {
            axios.post('/find', {"id": id})
            .then(response => {
                setDocument(response.data);
                // myEditor.setData(document.content);
            });
    }, [])

    useEffect(() => {
        if(document && myEditor) {
            myEditor.setData(document.content)
        }
    }, [document, myEditor])

    return (
        <div className="Editor">
            {document ? 
            <Overlay
                name={document.name}
                created={document.created}
                updated={document.updated}
            ></Overlay> : null
            }
            <CKEditor
                editor={ ClassicEditor }
                onReady={ editor => {
                    setMyEditor(editor);
                } }
            />
        </div>
    );
}

export default Editor;

