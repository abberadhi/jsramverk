import React from 'react';

function Popup (data) {
    return (
        <div className="overlay" onClick={() => console.log("Remove popup")}>
            <data.reqDialog></data.reqDialog>
        </div>
    );
}

export default Popup;

