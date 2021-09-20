import React, { useState  } from 'react';
import { Route, BrowserRouter as Router} from "react-router-dom";
import Nav from './components/Nav';
import Editor from './Pages/Editor';
import Home from './Pages/Home';
import Create from './Pages/Create';
import url from './utils/url';

function App () {
    return (
        <Router>
            <Nav 
            ></Nav>
            <Route path={url("/")} exact component={Home}></Route>
            <Route path={url("/editor/:id")} component={Editor}></Route>
            <Route path={url("/create")} component={Create}></Route>
        </Router>
    );
}

export default App;
