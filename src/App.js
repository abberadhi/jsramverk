import React, { useState  } from 'react';
import { Route, BrowserRouter as Router} from "react-router-dom";
import Nav from './components/Nav';
import Editor from './Pages/Editor';

function App () {
    const [myEditor, setMyEditor] = useState(null);
                // onClick={ () => console.log(myEditor.getData())}

    return (
        <Router>
            <Nav 
                myEditor={myEditor}
            ></Nav>
            <Route path="/" exact component={null}></Route>
            <Route path="/editor" component={Editor}></Route>
            
        </Router>
    );
}

export default App;

