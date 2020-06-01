import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import { Typeahead } from 'react-bootstrap-typeahead';

export class MemberInput extends Component {
    render() {
        const { users, member, setMember, cleared, setCleared } = this.props;

        if (cleared) {
            this._typeahead.getInstance().clear();
            setCleared(false);
        }

        return (
            <>
                <Typeahead
                    id="member_typehead"
                    labelKey={user =>
                        `${user.firstname} ${user.lastname} <${user.login}>`
                    }
                    options={users}
                    value={member}
                    onChange={e => (e.length > 0 ? setMember(e[0].login) : '')}
                    placeholder="Sélectionnez un utilisateur"
                    minLength={2}
                    maxResults={5}
                    onBlur={this.handleBlur}
                    ref={ref => (this._typeahead = ref)}
                />

                <Form.Control.Feedback type="invalid">
                    Veuillez choisir un utilisateur
                </Form.Control.Feedback>
            </>
        );
    }
}
