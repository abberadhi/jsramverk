import React, { useState  } from 'react';
import { Route, BrowserRouter as Router} from "react-router-dom";
import Nav from './components/Nav';
import Editor from './Pages/Editor';
import Home from './Pages/Home';
import Create from './Pages/Create';

function App () {
    return (
        <Router>
            <Nav 
            ></Nav>
            <Route path="/" exact component={Home}></Route>
            <Route path="/editor/:id" component={Editor}></Route>
            <Route path="/create" component={Create}></Route>
        </Router>
    );
}

export default App;
