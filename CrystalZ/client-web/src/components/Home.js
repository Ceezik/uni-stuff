import React from 'react';
import { Container, Row, Col, Image, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/**
 * Composant Home :
 * Accueil du site avec explications du jeu
 */
function Home() {
    const landing = require('../img/landing.svg');
    const settings = require('../img/settings.svg');
    const map = require('../img/map.svg');
    const mdj = require('../img/mdj.png');
    const mobile = require('../img/mobile.png');
    const download = require('../img/download.svg');

    return (
        <Container className="mt-5 mb-5">
            <Row className="justify-content-between align-items-center">
                <Col md="5">
                    <Image style={{ maxWidth: '100%' }} src={landing} />{' '}
                </Col>
                <Col md="6">
                    <h2>
                        <span style={{ fontWeight: '700' }}>
                            Crystal<span style={{ color: '#68b684' }}>Z</span>
                        </span>
                        , mine them all
                    </h2>
                    <p className="mt-3 mb-5">
                        Le nouveau jeu multijoueur temps réel et grandeur nature
                        dans lequel plusieurs équipes s’affrontent pour la
                        domination d’un territoire.
                    </p>

                    <Link to="/crystalz.apk" target="_blank" download>
                        <Button variant="success" className="btn-primary">
                            Télécharger l'application Android
                        </Button>
                    </Link>
                </Col>
            </Row>

            <Row
                style={{ marginTop: '7rem' }}
                className="justify-content-center"
            >
                <Col xs="auto">
                    <h2 className="landing-title">
                        Créez une partie en seulement trois étapes :
                    </h2>
                </Col>
            </Row>

            <Row className="mt-5">
                <Col xs="12">
                    <Card>
                        <Card.Body>
                            <Row className="align-items-center justify-content-between">
                                <Col xs="8" md="3" className="mb-3 mb-md-0">
                                    <Image
                                        style={{ maxWidth: '100%' }}
                                        src={settings}
                                    />
                                </Col>
                                <Col md="8">
                                    <Card.Title>
                                        Paramétrage de la partie
                                    </Card.Title>
                                    <Card.Subtitle className="mt-4 subtitle">
                                        Choississez la durée de la partie, son
                                        mode de jeu, la visibilité des joueurs
                                        et de nombreux autres paramètres.
                                    </Card.Subtitle>
                                    <Card.Subtitle className="mt-1 subtitle">
                                        C'est également à ce moment-là que vous
                                        pouvez créer des équipes, y ajouter vos
                                        amis et choisir quels objets seront
                                        présents au cours de la partie.
                                    </Card.Subtitle>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col xs="12">
                    <Card>
                        <Card.Body>
                            <Row className="align-items-center justify-content-between flex-column-reverse flex-md-row">
                                <Col md="8">
                                    <Card.Title>
                                        Configuration de la carte
                                    </Card.Title>
                                    <Card.Subtitle className="mt-4 subtitle">
                                        Définissez une zone de jeu et plusieurs
                                        zones interdites où les joueurs n'auront
                                        pas besoin d'aller.
                                    </Card.Subtitle>
                                    <Card.Subtitle className="mt-1 subtitle">
                                        Placez des objets pour que les joueurs
                                        puissent les ramasser au cours de la
                                        partie, mais surtout n'oubliez pas de
                                        poser des cristaux à capturer !
                                    </Card.Subtitle>
                                </Col>
                                <Col xs="8" md="3" className="mb-3 mb-md-0">
                                    <Image
                                        style={{ maxWidth: '100%' }}
                                        src={map}
                                    />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col xs="12">
                    <Card>
                        <Card.Body>
                            <Row className="align-items-center justify-content-between">
                                <Col xs="8" md="3" className="mb-3 mb-md-0">
                                    <Image
                                        style={{ maxWidth: '100%' }}
                                        src={download}
                                    />
                                </Col>
                                <Col md="8">
                                    <Card.Title>
                                        Téléchargement du serveur
                                    </Card.Title>
                                    <Card.Subtitle className="mt-4 subtitle">
                                        Téléchargez le serveur jeu et ouvrez le
                                        port sur lequel il sera lancé pour que
                                        les joueurs puissent s'y connecter avec
                                        leur smartphone.
                                    </Card.Subtitle>
                                    <Card.Subtitle className="mt-1 subtitle">
                                        Une interface d'administration de la
                                        partie sera également lancée si vous
                                        désirez suivre l'avancement de la partie
                                        ou agir sur son déroulement.
                                    </Card.Subtitle>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row
                style={{ marginTop: '7rem' }}
                className="justify-content-center"
            >
                <Col xs="auto">
                    <h2 className="landing-title">
                        Jouez de deux manières différentes :
                    </h2>
                </Col>
            </Row>

            <Row className="mt-5 justify-content-between align-items-center">
                <Col md="6">
                    <Image
                        style={{
                            maxWidth: '100%',
                            borderRadius: '6px',
                            boxShadow: '0px 0px 10px rgb(0, 0, 0, 0.15)'
                        }}
                        src={mdj}
                    />{' '}
                </Col>
                <Col md="5">
                    <h2>Maître du jeu</h2>
                    <p className="mt-4 mb-0">
                        La personne ayant téléchargé le serveur de jeu dispose
                        d'une interface web permettant de voir tout ce qu'il
                        passe en temps réel dans la partie.
                    </p>
                    <p className="mt-2">
                        S'il le désire, il peut aussi rajouter des objets sur la
                        carte ou déplacer des cristaux afin de changer
                        totalement le cours de la partie.
                    </p>
                </Col>
            </Row>

            <Row className="mt-5 justify-content-between align-items-center flex-column-reverse flex-md-row">
                <Col md="5">
                    <h2>Joueur lambda</h2>
                    <p className="mt-4 mb-0">
                        Une application mobile disponible sur Android permet de
                        se connecter à un serveur et de jouer.
                    </p>
                    <p className="mt-2">
                        Le but est simple : capturer le plus de cristaux
                        possibles afin de gagner la partie !
                    </p>
                </Col>
                <Col md="6">
                    <Row className="justify-content-center">
                        <Col xs="auto">
                            <Image
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '350px',
                                    borderRadius: '6px',
                                    boxShadow: '0px 0px 10px rgb(0, 0, 0, 0.15)'
                                }}
                                src={mobile}
                            />{' '}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
