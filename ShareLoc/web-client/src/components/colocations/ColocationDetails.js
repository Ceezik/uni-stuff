import React, { useState, useEffect } from 'react';
import MembersList from '../members/MembersList';
import ServicesList from '../services/ServicesList';
import Container from 'react-bootstrap/Container';
import { Link, useRouteMatch } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots } from '@fortawesome/free-solid-svg-icons';
import AchievedServicesList from '../achievedServices/AchievedServicesList';
import { _getAll } from '../../services/achievedService';
import { _getColocation } from '../../services/colocation';

function ColocationDetails({ colocation }) {
    const [members, setMembers] = useState(colocation.membres);
    const [services, setServices] = useState(colocation.services);
    const [achievedServices, setAchievedServices] = useState([]);
    const { url } = useRouteMatch();

    const sortMembersByLogin = members => {
        return members.sort((a, b) =>
            a.membre.login.localeCompare(b.membre.login)
        );
    };

    const getColocation = () => {
        _getColocation(colocation.id).then(res => {
            setMembers(res.membres);
        });
        _getAll(colocation.id).then(res =>
            setAchievedServices(
                res.filter(r => r.service.colocation.id === colocation.id)
            )
        );
    };

    useEffect(() => {
        _getAll(colocation.id).then(res => setAchievedServices(res));
    }, [colocation]);

    return (
        <Container className="mt-5">
            <h1 className="mb-3">{colocation.name}</h1>

            <MembersList members={sortMembersByLogin(members)} />

            <ServicesList
                services={services}
                setServices={setServices}
                refreshColocation={getColocation}
            />
            <AchievedServicesList
                achievedServices={achievedServices}
                setAchievedServices={setAchievedServices}
                refreshColocation={getColocation}
            />
            <Link to={`${url}/messages`}>
                <div className="btn-messages">
                    <FontAwesomeIcon
                        icon={faCommentDots}
                        size="2x"
                        color="white"
                    />
                </div>
            </Link>
        </Container>
    );
}

export default ColocationDetails;
