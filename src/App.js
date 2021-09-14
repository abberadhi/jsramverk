import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


function App () {
  const [myEditor, setMyEditor] = useState(null);

  return (
    <div className="App">

        <nav className="navbar">
            <div>
                GENERIC EDITOR
            </div>
            <ul className="list">
                <li className="save-button"
                onClick={ () => console.log(myEditor.getData())}>
                    <p>Save</p>
                    {/* <a href="#">Contact</a> */}
                </li>
            </ul>
        </nav>        
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

export default App;
