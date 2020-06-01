import React from 'react';
import { OverlayTrigger, Tooltip, Image, Row, Col } from 'react-bootstrap';
import {
    CONFIG_TIPS,
    ITEMS_TIPS,
    GENERAL_TIPS,
    GAME_TIPS
} from '../utils/tips';
import { getItemImage } from '../utils/utils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Composant HelpButton :
 * Point d'aide à survoler
 *
 * props :
 *   - tipKey : Clé de l'aide
 */
export function HelpButton({ tipKey }) {
    const tip = CONFIG_TIPS[tipKey];

    return (
        <>
            <OverlayTrigger
                placement={tip.placement}
                overlay={<Tooltip>{tip.tip}</Tooltip>}
            >
                <FontAwesomeIcon
                    className="ml-2"
                    icon={faQuestionCircle}
                    size="sm"
                />
            </OverlayTrigger>{' '}
        </>
    );
}

/**
 * Composant ItemOverlay :
 * Item avec explication de l'effet en overlay
 *
 * props :
 *   - item : Item survolé
 *   - setAction : Setter de la variable action
 *   - setSelectedModelItem : Setter de la variable selectedModelItem
 *   - setSleepingAction : Setter de la variable d'action dormante
 *   - action : Action en cours
 *   - selectedModelItem : Modele d'item sélectionné
 *   - index : Rang du modèle sélectionné
 *
 */
export function ItemOverlay({
    item,
    setAction,
    setSelectedModelItem,
    selectedModelItem,
    setSleepingAction,
    action,
    index
}) {
    const tip = ITEMS_TIPS[item.name];
    const iconUrl = getItemImage(item);

    return (
        <>
            {tip && (
                <OverlayTrigger
                    placement={tip.placement}
                    overlay={
                        <Tooltip>
                            <Row>
                                <Col md={{ offset: 1, span: 10 }}>
                                    {tip.tip}
                                </Col>
                            </Row>
                        </Tooltip>
                    }
                >
                    <Col
                        xs="auto"
                        className={`mr-3 mb-3 actions-item ${action ===
                            'items' &&
                            selectedModelItem === index &&
                            'actions-item-selected'}`}
                        onClick={() => {
                            action === 'showPopup'
                                ? setSleepingAction('items')
                                : setAction('items');
                            setSelectedModelItem(index);
                        }}
                    >
                        <Image
                            style={{
                                maxWidth: '25px',
                                maxHeight: '25px'
                            }}
                            src={iconUrl}
                        />
                    </Col>
                </OverlayTrigger>
            )}
        </>
    );
}

export function IconOverlay({ children, tipKey }) {
    const tip = GENERAL_TIPS[tipKey];

    return (
        <>
            <OverlayTrigger
                placement={tip.placement}
                overlay={<Tooltip>{tip.tip}</Tooltip>}
            >
                {children}
            </OverlayTrigger>{' '}
        </>
    );
}
