import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../utils/auth';
import UserInformations from './UserInformations';
import Parameters from './Parameters';

function Profil() {
    const { signout, user } = useAuth();

    return (
        <Container className="mt-5">
            <Row className="justify-content-between mb-3">
                <Col>
                    <h1>Mon compte</h1>
                </Col>
                <Col className="row justify-content-end align-items-center">
                    <h6 className="mb-0 danger" onClick={signout}>
                        Déconnexion
                        <FontAwesomeIcon
                            className="ml-2"
                            size="lg"
                            icon={faSignOutAlt}
                        />
                    </h6>
                </Col>
            </Row>

            <UserInformations user={user} />

            <Parameters user={user} />
        </Container>
    );
}

export default Profil;
