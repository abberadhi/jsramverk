import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFileWord } from '@fortawesome/free-solid-svg-icons'

export default Nav => {
    return (
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
    );
}

// export default Nav;