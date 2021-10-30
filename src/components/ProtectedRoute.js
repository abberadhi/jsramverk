import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import auth from '../utils/auth';


function ProtectedRoute ({component: Component, ...rest}) {
    return (
        <Route
          {...rest}
          render={(props) => auth.isAuthenticated() === true
            ? <Component {...props} />
            : <Redirect to={{pathname: '/signin', state: {from: props.location}}} />}
        />)
}

export default ProtectedRoute;
