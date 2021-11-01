import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import auth from '../utils/auth';
import { UserContext } from '../utils/UserContext';


function ProtectedRoute ({component: Component, ...rest}) {

    const { user, setUser } = useContext(UserContext)

    return (
        <Route
          {...rest}
          render={(props) => user
            ? <Component {...props} />
            : <Redirect to={{pathname: '/signin', state: {from: props.location}}} />}
        />)
}

export default ProtectedRoute;
