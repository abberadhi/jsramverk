import React from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faList } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

function Nav (data) {
    return (
        <header>
            <nav className="navbar">

                <ul className="navbar-nav">
                    <li className="nav-item add">
                        <Link to="/create">
                            <div className="nav-link">
                                <FontAwesomeIcon size="lg" icon={faPlus} />
                            </div>
                        </Link>

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
