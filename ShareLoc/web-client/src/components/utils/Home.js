import React from 'react';
import { Container, Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Container className="mt-5">
            <Jumbotron>
                <h1>Bienvenue sur ShareLoc !</h1>

                <p>
                    ShareLoc est une plateforme d'échange de services réalisée par Clément KOENIG
                    et Thomas WAGNER dans le cadre de la LP CDAD.
                    <br />
                    Elle permet de se mettre facilement en relation avec d'autres personnes afin de créer
                    des colocations et d'y réaliser des services.
                </p>

                <p>
                    Vous êtes intéressé ? N'hésitez pas à vous <Link to="/signup">inscrire </Link>
                    ou à vous <Link to="/signin">connecter</Link> si vous possédez déjà un compte.
                </p>
            </Jumbotron>
        </Container>
    );
};

export default Home;
