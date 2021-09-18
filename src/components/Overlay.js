import React from 'react';


function Overlay (data) {
    return (
        <div className="overlay" onClick={() => console.log("Remove Overlay")}>
            <p>Content</p>
        </div>
    );
}

export default Overlay;

