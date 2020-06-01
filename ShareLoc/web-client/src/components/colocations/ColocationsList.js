import React from 'react';
import ColocationsListItem from './ColocationsListItem';
import Row from 'react-bootstrap/Row';

function ColocationsList({ colocations }) {
    return (
        <Row>
            {colocations.map(colocation => {
                return (
                    <ColocationsListItem
                        key={colocation.id}
                        colocation={colocation}
                    />
                );
            })}
        </Row>
    );
}

export default ColocationsList;
