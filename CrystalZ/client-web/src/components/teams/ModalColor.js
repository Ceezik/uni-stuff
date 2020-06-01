import React, { useState } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { SketchPicker } from 'react-color';

/**
 * Composant ModalColor :
 * Modal de création d'une couleur personnalisée
 *
 * props :
 *   - show : Booleen à true si la modal est ouverte
 *   - setShow : Setter de la variable show
 *   - colorChange : Liste des changements de couleurs
 *   - setColorChange : Setter de la variable colorChange
 *   - setColor : Setter de la variable indiquant la couleur sélectionnée
 */
const ModalColor = ({
    show,
    setShow,
    colorChange,
    setColorChange,
    setColor
}) => {
    const [c, setC] = useState('#ff0000');
    const handleClose = () => setShow(false);
    const handleAdd = () => {
        setColorChange([...colorChange, c]);
        setColor(c);
        setShow(false);
    };
    return (
        <Modal centered show={show} onHide={handleClose} animation size="sm">
            <Modal.Body>
                <Container>
                    <Row className="justify-content-center">
                        <Col xs="auto">
                            <SketchPicker
                                color={c}
                                onChangeComplete={color => setC(color.hex)}
                            />
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="light" onClick={handleClose}>
                    Annuler
                </Button>
                <Button
                    variant="success"
                    className="btn-primary"
                    onClick={handleAdd}
                >
                    Choisir
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalColor;
