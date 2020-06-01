import React from 'react';
import Form from 'react-bootstrap/Form';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

export const ConcernedMembersInput = ({
    members,
    selectedMembers,
    setSelectedMembers,
    isInvalid
}) => {
    return (
        <>
            <Typeahead
                id="concerned_member_typehead"
                multiple
                isInvalid={isInvalid}
                labelKey={member =>
                    `${member.membre.firstname} ${member.membre.lastname} <${member.membre.login}>`
                }
                options={members}
                value={selectedMembers}
                minLength={2}
                maxResults={5}
                onChange={e => e.length > 0 && setSelectedMembers(e)}
                placeholder="Sélectionnez un ou plusieurs membres"
            />

            <Form.Control.Feedback type="invalid">
                Veuillez choisir au minimum un membre
            </Form.Control.Feedback>
        </>
    );
};
