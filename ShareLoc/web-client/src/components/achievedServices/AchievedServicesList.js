import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { _getAll } from '../../services/achievedService';
import { useParams } from 'react-router-dom';
import AchievedServicesListItem from './AchievedServicesListItem';
import { compareValues } from '../../utils/utils';
import AchievedServicesFilterForm from './AchievedServicesFilterForm';
import moment from 'moment';

function AchievedServicesList({
    achievedServices,
    setAchievedServices,
    refreshColocation
}) {
    const { colocationId } = useParams();
    const [waitingAchievedServices, setWaitingAchievedServices] = useState([]);
    const [validatedAchievedServices, setValidatedAchievedServices] = useState(
        []
    );
    const [refusedAchievedServices, setRefusedAchievedServices] = useState([]);
    const [filter, setFilter] = useState('none');

    const getAchievedServices = () => {
        _getAll(colocationId).then(achievedServices =>
            setAchievedServices(achievedServices)
        );
        refreshColocation();
    };

    const filterAchievedServices = achievedServices => {
        return sortAchievedServicesByDate(achievedServices).filter(
            service =>
                filter === 'none' ||
                moment(service.doneAt, 'yyyy-MM-DDThh:mm:ssZ[UTC]').isAfter(
                    moment().add(-1, filter)
                )
        );
    };

    const sortAchievedServicesByDate = achievedServices => {
        return achievedServices.sort(compareValues('doneAt', 'desc'));
    };

    useEffect(() => {
        setWaitingAchievedServices(
            achievedServices.filter(s => s.valid === undefined)
        );
        setValidatedAchievedServices(
            achievedServices.filter(s => s.valid === true)
        );
        setRefusedAchievedServices(
            achievedServices.filter(s => s.valid === false)
        );
    }, [achievedServices]);

    const renderAchievedServicesList = services => {
        return services.length === 0 ? (
            <p className="mt-3 mb-3">Aucun service à afficher.</p>
        ) : (
            <Row className="mt-3 mb-3">
                {services.map(service => {
                    return (
                        <AchievedServicesListItem
                            key={service.id}
                            achievedService={service}
                            refreshAchievedServices={getAchievedServices}
                        />
                    );
                })}
            </Row>
        );
    };

    return (
        <>
            <Row>
                <Col>
                    <h3 className="mb-3">Services effectués</h3>
                </Col>

                <Col xs={3}>
                    <AchievedServicesFilterForm
                        setFilter={setFilter}
                        className="filter"
                    />
                </Col>
            </Row>
            <h4 className="waiting">En attente de validation</h4>
            {renderAchievedServicesList(
                filterAchievedServices(waitingAchievedServices)
            )}

            <h4 className="validated">Validés</h4>
            {renderAchievedServicesList(
                filterAchievedServices(validatedAchievedServices)
            )}

            <h4 className="refused">Refusés</h4>
            {renderAchievedServicesList(
                filterAchievedServices(refusedAchievedServices)
            )}
        </>
    );
}

export default AchievedServicesList;
