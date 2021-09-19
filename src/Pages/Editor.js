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
                // onClick={ () => console.log(myEditor.getData())}

    useEffect(() => {
        axios.post('/find', {"id": id})
        .then(response => {
            setDocument(response.data);
        });
    }, [])

    return (
        <div className="Editor">
            {document ? 
            <Overlay
                title={document.title}
                created={document.created}
                updated={document.updated}
            ></Overlay> : null
            }
            <CKEditor
                editor={ ClassicEditor }
                data="<p>Hello from CKEditor 5!</p>"
                onReady={ editor => {
                    console.log( 'Editor is ready to use!', editor );
                    setMyEditor(editor);
                } }
            />
        </div>
    );
}

export default Editor;

