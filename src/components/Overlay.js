import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt } from '@fortawesome/free-solid-svg-icons'

function Overlay (data) {
    return (
        <div className="overlay" onClick={() => console.log("Remove Overlay")}>
            <div class="left">
            <p style={{display: "inline-block"}}>Title: </p>
            <input type="text" className="input"></input>
            <p className="created">Created: 2020-09-18</p>
            </div>

            <p className="edited">Last updated: 5 min ago</p>
        </div>
    );
}

export default Overlay;

