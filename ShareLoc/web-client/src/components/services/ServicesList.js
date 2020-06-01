import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import ServicesListItem from './ServicesListItem';
import AddServiceForm from './AddServiceForm';
import { _getAll } from '../../services/service';
import { useParams } from 'react-router-dom';

function ServicesList({ services, setServices, refreshColocation }) {
    const [waitingServices, setWaitingServices] = useState([]);
    const [validatedServices, setValidatedServices] = useState([]);
    const [refusedServices, setRefusedServices] = useState([]);
    const { colocationId } = useParams();

    const addService = service => {
        setServices([...services, service]);
    };

    const getServices = () => {
        _getAll(colocationId).then(services => {
            setServices(services);
            refreshColocation();
        });
    };

    const renderServicesList = services => {
        return services.length === 0 ? (
            <p className="mt-3 mb-3">Aucun service à afficher.</p>
        ) : (
            <Row className="mt-3 mb-3">
                {services.map(service => {
                    return (
                        <ServicesListItem
                            key={service.id}
                            service={service}
                            refreshServices={getServices}
                        />
                    );
                })}
            </Row>
        );
    };

    useEffect(() => {
        setWaitingServices(
            services.filter(s => s.accepted === undefined && !s.achieved)
        );
        setValidatedServices(
            services.filter(s => s.accepted === true && !s.achieved)
        );
        setRefusedServices(
            services.filter(s => s.accepted === false && !s.achieved)
        );
    }, [services]);

    return (
        <>
            <h3 className="mb-3">Services</h3>

            <Row className="mb-5 ml-1">
                <AddServiceForm addService={addService} />
            </Row>

            <h4 className="waiting">En attente de votes</h4>
            {renderServicesList(waitingServices)}

            <h4 className="validated">Validés</h4>
            {renderServicesList(validatedServices)}

            <h4 className="refused">Refusés</h4>
            {renderServicesList(refusedServices)}
        </>
    );
}

export default ServicesList;
