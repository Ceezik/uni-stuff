import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../utils/auth';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { userChecked, user } = useAuth();

    return (
        userChecked && (
            <Route
                {...rest}
                render={props =>
                    user ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/signin',
                                state: { from: props.location }
                            }}
                        />
                    )
                }
            />
        )
    );
};

export default PrivateRoute;
