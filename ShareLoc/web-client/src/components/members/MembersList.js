import React from 'react';
import Row from 'react-bootstrap/Row';
import MembersListItem from './MembersListItem';
import AddMemberForm from './AddMemberForm';
import { useAuth } from '../../utils/auth';

function MembersList({ members }) {
    const { user } = useAuth();

    const isGestionnaire =
        members.filter(
            member =>
                user.login === member.membre.login && member.estGestionnaire
        ).length > 0;

    return (
        <>
            <h3 className="mb-3">Membres</h3>

            {isGestionnaire && (
                <Row className="mb-5">
                    <AddMemberForm />
                </Row>
            )}

            <Row>
                {members.map(member => {
                    return <MembersListItem key={member.id} member={member} />;
                })}
            </Row>
        </>
    );
}

export default MembersList;
