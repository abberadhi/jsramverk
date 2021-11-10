import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faList, faDoorOpen, faCode } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import url from '../utils/url';
import auth from '../utils/auth';
import { UserContext } from '../utils/UserContext';

function Nav (data) {
    const { user, setUser } = useContext(UserContext)


    return (
        <header>
            {user ? <nav className="navbar1">

                <ul className="navbar1-nav">
                    <li className="nav-item add" >
                        <Link to={url("/createdocument")}>
                            <div className="nav-link" data-testid="add-document">
                            <FontAwesomeIcon size="lg" icon={faFile} />
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item add" >
                        <Link to={url("/createcode")}>
                            <div className="nav-link" data-testid="add-code">
                                <FontAwesomeIcon size="lg" icon={faCode} />
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
                    <li className="nav-item">
                            <div className="nav-link" onClick={() => setUser(null)} data-testid="docs-link">
                                <FontAwesomeIcon size="lg" icon={faDoorOpen} />
                            </div>
                    </li>
                </ul>
            </nav> : null}
        </header>    
    );
}

export default Nav;