import React, { useState } from 'react';
import Overlay from '../components/Overlay';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Editor () {
    const [myEditor, setMyEditor] = useState(null);
                // onClick={ () => console.log(myEditor.getData())}

    return (
        <div className="Editor">
            <Overlay></Overlay>
            <CKEditor
                editor={ ClassicEditor }
                data="<p>Hello from CKEditor 5!</p>"
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                    setMyEditor(editor);
                } }
            />
        </div>
    );
}

export default Editor;
