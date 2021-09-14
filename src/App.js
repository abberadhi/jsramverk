import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFileWord } from '@fortawesome/free-solid-svg-icons'




function App () {
    const [myEditor, setMyEditor] = useState(null);
                // onClick={ () => console.log(myEditor.getData())}
    return (
        <div className="App">
            <nav className="navbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a href="" className="nav-link">
                            {/* <span class="link-text">Abbe</span> */}
                            <FontAwesomeIcon size="lg" icon={faPlus} />
                        </a>
                    </li>

                    <li className="nav-item">
                        <a href="" className="nav-link">
                            {/* <span class="link-text">Abbe</span> */}
                            <FontAwesomeIcon size="lg" icon={faFileWord} />
                        </a>
                    </li>

                                        <li className="nav-item">
                        <a href="" className="nav-link">
                            {/* <span class="link-text">Abbe</span> */}
                            <FontAwesomeIcon size="lg" icon={faFileWord} />
                        </a>
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

