import React from 'react';
import { AuthProvider } from './utils/auth';
import { Router, Switch, Route } from 'react-router-dom';
import Menu from './components/utils/Menu';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Home from './components/utils/Home';
import { history } from './utils/utils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profil from './components/user/Profil';
import PrivateRoute from './components/auth/PrivateRoute';
import ColocationsWrapper from './components/colocations/ColocationsWrapper';
import ColocationWrapper from './components/colocations/ColocationWrapper';
import MessagesWrapper from './components/messages/MessagesWrapper';
import InvitationsWrapepr from './components/invitations/InvitationsWrapper';
import Messagerie from './components/messages/Messagerie';

toast.configure({
    hideProgressBar: true,
    pauseOnHover: false
});

function App() {
    return (
        <AuthProvider>
            <Router history={history}>
                <>
                    <Menu />

                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/signin" component={Signin} />

                        <PrivateRoute
                            exact
                            path="/invitations"
                            component={InvitationsWrapepr}
                        />

                        <PrivateRoute
                            exact
                            path="/colocations"
                            component={ColocationsWrapper}
                        />

                        <PrivateRoute
                            exact
                            path="/account"
                            component={Profil}
                        />

                        <PrivateRoute
                            exact
                            path={`/colocations/:colocationId`}
                            component={ColocationWrapper}
                        />

                        <PrivateRoute
                            exact
                            path={`/colocations/:colocationId/messages`}
                            component={MessagesWrapper}
                        />

                        <PrivateRoute
                            exact
                            path={`/messages`}
                            component={Messagerie}
                        />
                    </Switch>
                </>
            </Router>
        </AuthProvider>
    );
}

export default App;
