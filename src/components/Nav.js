import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFileWord, faList } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

function Nav (data) {
    return (
        <header>
            <nav className="navbar">

                <ul className="navbar-nav">
                    <li
                    onClick={ () => {
                        console.log(data.myEditor.getData());
                    }} 
                    className="nav-item add"
                    >
                        <div className="nav-link">
                            <FontAwesomeIcon size="lg" icon={faPlus} />
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link to="/">
                        <div className="nav-link">
                            <FontAwesomeIcon size="lg" icon={faList} />
                        </div>
                        </Link>
                    </li>
                </ul>
            </nav>    
        </header>    
    );
}

export default Nav;
