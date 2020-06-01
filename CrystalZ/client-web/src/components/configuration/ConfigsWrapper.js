import React, { useState, useEffect } from 'react';
import { Row, Col, Container, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import { removeConfiguration, getAll } from '../../service/configuration';
import { getConfigs } from '../../service/user';
import ConfigsListItem from './ConfigsListItem';
import ConfigsButtons from './ConfigsButtons';
import ConfigsFilter from './ConfigsFilter';

const PAGE_SIZE = 15;
const GAMEMODES = ['FLAG', 'TIME', 'SUPREMACY'];

/**
 * Composant ConfigsWrapper :
 * Composant permettant de récupérer les configurations à afficher
 */
const ConfigsWrapper = () => {
    const [community, setCommunity] = useState(false);
    const [nameFilter, setNameFilter] = useState('');
    const [gameModeFilter, setGameModeFilter] = useState(GAMEMODES);
    const [hasMore, setHasMore] = useState(true);
    const [configurations, setConfigurations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setHasMore(true);
        fetchConfigs([])
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, [nameFilter, gameModeFilter, community]);

    const fetchConfigs = configurations => {
        const p = community
            ? getAll(
                  configurations.length / PAGE_SIZE,
                  PAGE_SIZE,
                  nameFilter,
                  gameModeFilter
              )
            : getConfigs(
                  configurations.length / PAGE_SIZE,
                  PAGE_SIZE,
                  nameFilter,
                  gameModeFilter
              );

        return p.then(res => {
            if (res.data.length < PAGE_SIZE) {
                setHasMore(false);
            }
            setConfigurations([...configurations, ...res.data]);
        });
    };

    const deleteConfig = configId => {
        removeConfiguration(configId)
            .then(() =>
                setConfigurations(configurations.filter(c => c.id !== configId))
            )
            .catch(() =>
                toast.error('Impossible de supprimer la configuration')
            );
    };

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={10}>
                    <ConfigsButtons
                        community={community}
                        setCommunity={setCommunity}
                    />

                    <ConfigsFilter
                        setName={setNameFilter}
                        gameModes={GAMEMODES}
                        gameModeFilter={gameModeFilter}
                        setGameModeFilter={setGameModeFilter}
                    />

                    {loading ? (
                        <Row className="justify-content-center">
                            <Col xs="auto">
                                <Spinner animation="border" variant="light" />
                            </Col>
                        </Row>
                    ) : error ? (
                        <p>Une erreur est survenue.</p>
                    ) : configurations.length === 0 ? (
                        <p className="text-center">
                            Aucune configuration à afficher.
                        </p>
                    ) : (
                        <InfiniteScroll
                            dataLength={configurations.length}
                            next={() => fetchConfigs(configurations)}
                            hasMore={hasMore}
                            loader={
                                <Row className="mt-3 justify-content-center">
                                    <Col xs="auto">
                                        <Spinner
                                            animation="border"
                                            variant="light"
                                        />
                                    </Col>
                                </Row>
                            }
                        >
                            {configurations.map(config => (
                                <ConfigsListItem
                                    key={config.id}
                                    configuration={config}
                                    community={community}
                                    deleteConfig={deleteConfig}
                                />
                            ))}
                        </InfiniteScroll>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ConfigsWrapper;
