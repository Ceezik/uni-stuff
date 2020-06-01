import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import ControlledForm from '../forms/ControlledForm';
import { _create } from '../../services/invitation';
import { toast } from 'react-toastify';
import { MemberInput } from '../forms/MemberInputs';
import { useParams } from 'react-router-dom';
import { _getUsers } from '../../services/user';

function AddMemberForm() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState('');
    const [cleared, setCleared] = useState(false);
    const { colocationId } = useParams();

    useEffect(() => {
        _getUsers(colocationId).then(res => {
            setUsers(res);
        });
    }, [colocationId]);

    const create = login => {
        _create(colocationId, { login })
            .then(() => {
                setUser('');
                setCleared(true);
                toast.success('Invitation envoyée');
            })
            .catch(err => {
                if (err === 409)
                    toast.error(
                        'Cet utilisateur fait déjà partie de la colocation'
                    );
                else toast.error("Impossible d'ajouter l'utilisateur");
            });
    };

    return (
        <>
            <Col md={6}>
                <ControlledForm onSubmit={() => create(user)}>
                    <Form.Row className="mb-3">
                        <Col>
                            <Form.Group className="mb-0" md="6">
                                <MemberInput
                                    users={users}
                                    member={user}
                                    setMember={setUser}
                                    cleared={cleared}
                                    setCleared={setCleared}
                                />
                            </Form.Group>
                        </Col>

                        <Button type="submit">Inviter</Button>
                    </Form.Row>
                </ControlledForm>
            </Col>
        </>
    );
}

export default AddMemberForm;
