import React, { useEffect, useState  } from 'react';
import { Route, BrowserRouter as Router} from "react-router-dom";
import Nav from './components/Nav';
import Editor from './Pages/Editor';
import Home from './Pages/Home';
import Create from './Pages/Create';
import SignIn from './Pages/SignIn';
import ProtectedRoute from './components/ProtectedRoute';
import url from './utils/url';
import auth from './utils/auth';
import axios from 'axios';



function App () {
    // axios.defaults.baseURL = 'https://jsramverk-editor-abra19.azurewebsites.net';
    axios.defaults.baseURL = 'http://localhost:1337';

    return (
        <Router>
            {auth.isAuthenticated() ? <Nav 
            ></Nav> : null}
            
            <Route path={url("/signin")} exact component={SignIn}></Route> :  
            <ProtectedRoute path={url("/")} exact component={Home}></ProtectedRoute>
            <ProtectedRoute path={url("/editor/:id")} component={Editor}></ProtectedRoute>
            <ProtectedRoute path={url("/create")} component={Create}></ProtectedRoute>
            
        </Router>
    );
}

export default App;
