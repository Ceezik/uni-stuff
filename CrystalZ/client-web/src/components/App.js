import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthProvider } from '../utils/auth';
import Menu from './Menu';
import Signin from './authentification/Signin';
import Signup from './authentification/Signup';
import PrivateRoute from './authentification/PrivateRoute';
import ConfigsWrapper from './configuration/ConfigsWrapper';
import Settings from './user/Settings';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConfigForm from './configuration/ConfigForm';
import ConfigLoader from './configuration/ConfigLoader';
import Error from './Error';
import Home from './Home';
import ProfilWrapper from './user/ProfilWrapper';
import LeaderboardWrapper from './leaderboard/LeaderboardWrapper';
import GamesWrapper from './games/GamesWrapper';
import GameWrapper from './games/GameWrapper';

toast.configure({
    hideProgressBar: true,
    pauseOnHover: false
});

/**
 * Composant App :
 * Point d'entrée de l'application CrystalZ, liste les routes générales
 */
const App = () => {
    return (
        <AuthProvider>
            <Menu />
            <Switch>
                <Route exact path="/" component={Home} />

                <Route exact path="/signin" component={Signin} />
                <Route exact path="/signup" component={Signup} />
                <PrivateRoute
                    exact
                    path="/users/:userId"
                    component={ProfilWrapper}
                />
                <PrivateRoute exact path="/settings" component={Settings} />

                <PrivateRoute
                    exact
                    path="/configs"
                    component={ConfigsWrapper}
                />
                <PrivateRoute
                    exact
                    path="/configs/create"
                    component={ConfigForm}
                />

                <PrivateRoute
                    path="/configs/:configurationId"
                    component={ConfigLoader}
                />

                <PrivateRoute
                    exact
                    path="/leaderboard"
                    component={LeaderboardWrapper}
                />

                <PrivateRoute exact path="/games" component={GamesWrapper} />
                <PrivateRoute
                    exact
                    path="/games/:gameId"
                    component={GameWrapper}
                />

                <Route component={Error} />
            </Switch>
        </AuthProvider>
    );
};

export default App;
