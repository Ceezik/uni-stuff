import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import GamesListItem from './GamesListItem';
import { getGames } from '../../service/user';
import GamesFilter from './GamesFilter';

const PAGE_SIZE = 15;

/**
 * Composant GamesWrapper :
 * Récupère l'historiques des parties de l'utilisateur connecté
 */
function GamesWrapper() {
    const [hasMore, setHasMore] = useState(true);
    const [games, setGames] = useState([]);
    const [dateFilter, setDateFilter] = useState('w');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setHasMore(true);
        fetchGames([])
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, [dateFilter]);

    const fetchGames = games => {
        return getGames(games.length / PAGE_SIZE, PAGE_SIZE, dateFilter).then(
            res => {
                if (res.data.length < PAGE_SIZE) {
                    setHasMore(false);
                }
                setGames([...games, ...res.data]);
            }
        );
    };

    return (
        <Container className="my-5">
            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <h3 className="mb-5">Historique des parties</h3>
                    <GamesFilter
                        filter={dateFilter}
                        setFilter={setDateFilter}
                    />

                    {loading ? (
                        <Row className="justify-content-center">
                            <Col xs="auto">
                                <Spinner animation="border" variant="light" />
                            </Col>
                        </Row>
                    ) : error ? (
                        <p className="text-center">Une erreur est survenue.</p>
                    ) : games.length === 0 ? (
                        <p className="text-center">Aucune partie à afficher.</p>
                    ) : (
                        <InfiniteScroll
                            dataLength={games.length}
                            next={() => fetchGames(games)}
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
                            {games.map(game => (
                                <GamesListItem key={game.id} game={game} />
                            ))}
                        </InfiniteScroll>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default GamesWrapper;
