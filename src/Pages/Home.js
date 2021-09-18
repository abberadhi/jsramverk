import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Home () {
    const [myEditor, setMyEditor] = useState(null);
                // onClick={ () => console.log(myEditor.getData())}

    return (
        <div className="Home">
            <h1>Documents</h1>
        </div>
    );
}

export default Home;

