import React from 'react';
import DateUtils from '../utils/DateUtils';

function Overlay (data) {
    return (
        <div className="overlay" onClick={() => console.log("Remove Overlay")}>
            <div className="left">
                <p style={{display: "inline-block"}}>Title: </p>
                <input defaultValue={data.name ?? "Untitled"} type="text" className="input"></input>
                <p className="created">Created: {data.created ?? "Untitled"}</p>
            </div>

            <p className="edited">Last updated: {DateUtils.relativeSinceDate(data.updated) ?? "Untitled"}</p>
        </div>
    );
}

export default Overlay;
