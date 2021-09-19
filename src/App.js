import React, { useState  } from 'react';
import { Route, BrowserRouter as Router} from "react-router-dom";
import Nav from './components/Nav';
import Editor from './Pages/Editor';
import Home from './Pages/Home';

function App () {
    const [myEditor, setMyEditor] = useState(null);
                // onClick={ () => console.log(myEditor.getData())}

    return (
        <Router>
            <Nav 
                myEditor={myEditor}
            ></Nav>
            <Route path="/" exact component={Home}></Route>
            <Route path="/editor/:id" component={Editor}></Route>
            
        </Router>
    );
}

export default App;

