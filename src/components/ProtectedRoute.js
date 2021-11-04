import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import url from '../utils/url';
import { UserContext } from '../utils/UserContext';


function ProtectedRoute ({component: Component, ...rest}) {

    const { user, setUser } = useContext(UserContext)

    return (
        <Route
          {...rest}
          render={(props) => user
            ? <Component {...props} />
            : <Redirect to={{pathname: url('/signin'), state: {from: props.location}}} />}
        />)
}

export default ProtectedRoute;
