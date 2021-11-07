import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Loader from '../components/Loader';
import url from '../utils/url';
import { UserContext } from '../utils/UserContext';

function CodeEditor () {

    return (
        <div className="Create fullscreen-loading">
            <Loader></Loader> 
        </div>
    );
}

export default CodeEditor;