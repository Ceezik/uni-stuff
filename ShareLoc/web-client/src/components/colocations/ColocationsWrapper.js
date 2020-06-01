import React, { useState } from 'react';
import { useDataFromUrl } from '../../utils/request';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import ColocationsList from './ColocationsList';
import AddColocationForm from './AddColocationForm';
import SearchColocations from './SearchColocations';
import { Container } from 'react-bootstrap';
import { sortColocationsByName } from '../../utils/utils';

function ColocationsWrapper() {
    const { loading, data: colocations } = useDataFromUrl('/colocation');
    const [filteredColocations, setFilteredColocations] = useState([]);

    const addColocation = colocation => {
        setFilteredColocations([...filteredColocations, colocation]);
    };

    return (
        <Container className="mt-5">
            <h1 className="mb-3">Mes colocations</h1>

            {loading ? (
                <Spinner />
            ) : (
                <>
                    <Row className="mb-5">
                        <SearchColocations
                            colocations={colocations}
                            filterColocations={setFilteredColocations}
                        />
                        <AddColocationForm addColocation={addColocation} />
                    </Row>

                    {filteredColocations.length > 0 ? (
                        <ColocationsList
                            colocations={sortColocationsByName(
                                filteredColocations
                            )}
                        />
                    ) : (
                        <p>Aucune colocation à afficher.</p>
                    )}
                </>
            )}
        </Container>
    );
}

export default ColocationsWrapper;
