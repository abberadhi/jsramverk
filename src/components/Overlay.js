import React from 'react';


function Overlay (data) {
    return (
        <div className="overlay" onClick={() => console.log("Remove Overlay")}>
            <h1>Content</h1>
        </div>
    );
}

export default Overlay;

