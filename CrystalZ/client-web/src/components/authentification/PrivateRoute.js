import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../utils/auth';

/**
 * Composant PrivateRoute :
 * Route uniquement accessible si l'utilisateur est authentifié
 *
 * props :
 *   - Component : Composant à rendre
 *   - rest : Autres props du composant Route
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useAuth();

    return (
        <Route
            {...rest}
            render={props =>
                user ? <Component {...props} /> : <Redirect to="/signin" />
            }
        />
    );
};

export default PrivateRoute;
