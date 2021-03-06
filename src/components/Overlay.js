import React from 'react';
import DateUtils from '../utils/DateUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Loader from '../components/Loader';

function Overlay (data) {
    return (
        <div className="overlay" onClick={() => console.log("Remove Overlay")}>
            <div className="left">
                <p style={{display: "inline-block"}}>Title: </p>
                <input 
                onChange={
                    (event) => {
                        data.saveDocument(event.target.value);
                    }
                }

                defaultValue={data.name ?? "Untitled"} type="text" className="input"></input>
                <p className="created">Created: {DateUtils.relativeSinceDate(parseInt(data.created)) ?? "Untitled"}</p>
            </div>
            <p className="edited">Last updated: {data.isSaving ? <Loader></Loader> : (DateUtils.relativeSinceDate(parseInt(data.updated)) ?? "Untitled")}</p>
            <button onClick={() => data.execFunc()} className="btn btn-success" data-testid="actionBtn"><FontAwesomeIcon size="lg" icon={data.icon} /> {data.buttonText}</button>

        </div>
    );
}

export default Overlay;
