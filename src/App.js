import React, { useEffect, useState, useMemo  } from 'react';
import { Route, BrowserRouter as Router} from "react-router-dom";
import Nav from './components/Nav';
import Editor from './Pages/Editor';
import Home from './Pages/Home';
import CreateDocument from './Pages/CreateDocument';
import CreateCode from './Pages/CreateCode';
import SignIn from './Pages/SignIn';
import Register from './Pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import url from './utils/url';
import axios from 'axios';
import { UserContext } from './utils/UserContext';


function App () {
    const [user, setUser] = useState(null);

    const value = useMemo(() => ({user, setUser}), [user, setUser])

    // axios.defaults.baseURL = 'https://jsramverk-editor-abra19.azurewebsites.net';
    axios.defaults.baseURL = 'http://localhost:1337';

    return (
        <Router>            
            <UserContext.Provider value={value}>
                <Nav></Nav>
                <Route path={url("/signin")} exact component={SignIn}></Route>

                <Route path={url("/register")} exact component={Register}></Route>
                <ProtectedRoute path={url("/")} exact component={Home}></ProtectedRoute>
                <ProtectedRoute path={url("/editor/:id")} component={Editor}></ProtectedRoute>
                <ProtectedRoute path={url("/createdocument")} component={CreateDocument}></ProtectedRoute>
                <ProtectedRoute path={url("/createcode")} component={CreateCode}></ProtectedRoute>
            </UserContext.Provider>
        </Router>
    );
}

export default App;
