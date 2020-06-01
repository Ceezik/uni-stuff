import React from 'react';
import { Row, Col } from 'react-bootstrap';

function UserInformations({ user }) {
    return (
        <>
            <h3 className="mb-5">Informations</h3>
            <Row className="mb-3">
                <Col md={6}>
                    <p>
                        <strong>Prénom : </strong>
                        {user.firstname}
                    </p>
                </Col>
                <Col md={6}>
                    <p>
                        <strong>Nom : </strong>
                        {user.lastname}
                    </p>
                </Col>
                <Col md={6}>
                    <p>
                        <strong>Adresse mail : </strong>
                        {user.login}
                    </p>
                </Col>
            </Row>
        </>
    );
}

export default UserInformations;
