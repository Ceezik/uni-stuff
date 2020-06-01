import React from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Link, useRouteMatch } from 'react-router-dom';

function ColocationsListItem({ colocation }) {
    const nbMembers = colocation.membres.length;
    const { url } = useRouteMatch();

    return (
        <Col className="mb-4" md={4}>
            <Link to={`${url}/${colocation.id}`}>
                <Card>
                    <Card.Body>
                        <Card.Title>{colocation.name}</Card.Title>
                        <Card.Subtitle className="text-muted">
                            {nbMembers} membre{nbMembers > 1 && 's'}
                        </Card.Subtitle>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    );
}

export default ColocationsListItem;
