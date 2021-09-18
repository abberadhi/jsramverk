import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFileWord, faFileAlt } from '@fortawesome/free-solid-svg-icons'

function Nav (data) {
    return (
        <nav className="navbar">

            <ul className="navbar-nav">
                <li
                onClick={ () => {
                    console.log(data.myEditor.getData());
                }} 
                className="nav-item add"
                >
                    <div className="nav-link">
                        {/* <span class="link-text">Abbe</span> */}
                        <FontAwesomeIcon size="lg" icon={faPlus} />
                    </div>
                </li>

                <li className="nav-item">
                    <div className="nav-link">
                        {/* <span class="link-text">Abbe</span> */}
                        <FontAwesomeIcon size="lg" icon={faFileWord} />
                    </div>
                </li>

                {/* <li className="nav-item title">
                    <div className="nav-title">
                        <FontAwesomeIcon size="3x" icon={faFileAlt} />
                        <input className="input" type="text" placeholder="Untitled"></input>
                    </div>
                </li> */}
            </ul>
        </nav>        
    );
}

export default Nav;

