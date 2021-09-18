import React, { useState } from 'react';
import Nav from './components/Nav';
import Overlay from './components/Overlay';
import Editor from './pages/Editor';
import NewDocumentPrompt from './components/popups/NewDocumentPrompt';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function App () {
    const [myEditor, setMyEditor] = useState(null);
                // onClick={ () => console.log(myEditor.getData())}

    return (
        <div className="App">
                <Nav 
                    myEditor={myEditor}
                ></Nav>
            <Editor></Editor>
        </div>
    );
}

export default App;

