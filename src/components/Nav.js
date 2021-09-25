import React from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faList } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import url from '../utils/url';

function Nav (data) {
    return (
        <header>
            <nav className="navbar">

                <ul className="navbar-nav">
                    <li className="nav-item add" >
                        <Link to={url("/create")}>
                            <div className="nav-link" data-testid="add-link">
                                <FontAwesomeIcon size="lg" icon={faPlus} />
                            </div>
                        </Link>

                    </li>
                    <li className="nav-item">
                        <Link to={url("/")}>
                            <div className="nav-link" data-testid="docs-link">
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
