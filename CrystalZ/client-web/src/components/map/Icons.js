import L from 'leaflet';

/**
 * Icone d'un cristal
 */
const iconWhiteFlag = new L.Icon({
    iconUrl: require('../../img/cristal.png'),
    iconRetinaUrl: require('../../img/cristal.png'),
    iconAnchor: [24, 48], // A modifier pour centrer le cristal
    popupAnchor: [-3, -38],
    iconSize: new L.Point(48, 48),
    className: 'leaflet-div-icon'
});

/**
 * Icone de délimitation de la zone de jeu
 */
const iconGameArea = new L.Icon({
    iconUrl: require('../../img/gameArea.png'),
    iconRetinaUrl: require('../../img/gameArea.png'),
    iconAnchor: [6, 43], // A modifier pour centrer les points de zone
    popupAnchor: [0, -40],
    iconSize: new L.Point(13, 43),
    className: 'leaflet-div-icon'
});

/**
 * Icone de délimitation d'une zone interdite
 */
const iconForbiddenArea = new L.Icon({
    iconUrl: require('../../img/forbiddenArea.png'),
    iconRetinaUrl: require('../../img/forbiddenArea.png'),
    iconAnchor: [6, 43], // A modifier pour centrer les points de zone
    popupAnchor: [0, -40],
    iconSize: new L.Point(13, 43),
    className: 'leaflet-div-icon'
});

/**
 * Fonction getItemIcon :
 * Retourne l'icone d'un item
 *
 * @param item Item dont on cherche l'icone
 */
const getItemIcon = item => {
    if (!item) return iconWhiteFlag;

    switch (item.name) {
        case 'Sentinelle':
            return iconSentinelle;
        case 'Canon à photons':
            return iconCanonPhotons;
        case 'Antenne':
            return iconAntenne;
        case 'Sonde':
            return iconSonde;
        case 'Portail de transfert':
            return iconPortail;
        case 'Disloqueur':
            return iconDisloqueur;
        case 'Intercepteur':
            return iconIntercepteur;
        case 'Noyau protecteur':
            return iconNoyau;
        case 'Oracle':
            return iconOracle;
        case 'Tempête':
            return iconTempete;
        case 'Transducteur':
            return iconTransducteur;
        case 'Transporteur':
            return iconTransporteur;
        default:
            return iconWhiteFlag;
    }
};

const iconTransporteur = new L.Icon({
    iconUrl: require('../../img/transporteur.png'),
    iconRetinaUrl: require('../../img/transporteur.png'),
    iconAnchor: [25, 50], // A modifier pour centrer les points de zone
    popupAnchor: [0, -40],
    iconSize: new L.Point(50, 50),
    className: 'leaflet-div-icon'
});

const iconTransducteur = new L.Icon({
    iconUrl: require('../../img/transducteur.gif'),
    iconRetinaUrl: require('../../img/transducteur.gif'),
    iconAnchor: [17, 39], // A modifier pour centrer les points de zone
    popupAnchor: [0, 0],
    iconSize: new L.Point(35, 39),
    className: 'leaflet-div-icon'
});

const iconTempete = new L.Icon({
    iconUrl: require('../../img/tempete.png'),
    iconRetinaUrl: require('../../img/tempete.png'),
    iconAnchor: [33, 64], // A modifier pour centrer les points de zone
    popupAnchor: [-10, -55],
    iconSize: new L.Point(47, 66),
    className: 'leaflet-div-icon'
});

const iconOracle = new L.Icon({
    iconUrl: require('../../img/oracle.png'),
    iconRetinaUrl: require('../../img/oracle.png'),
    iconAnchor: [21, 59], // A modifier pour centrer les points de zone
    popupAnchor: [0, -50],
    iconSize: new L.Point(42, 59),
    className: 'leaflet-div-icon'
});

const iconNoyau = new L.Icon({
    iconUrl: require('../../img/noyau.png'),
    iconRetinaUrl: require('../../img/noyau.png'),
    iconAnchor: [17, 18], // A modifier pour centrer les points de zone
    popupAnchor: [0, -10],
    iconSize: new L.Point(34, 36),
    className: 'leaflet-div-icon'
});

const iconCanonPhotons = new L.Icon({
    iconUrl: require('../../img/canonPhotons.gif'),
    iconRetinaUrl: require('../../img/canonPhotons.gif'),
    iconAnchor: [11, 33], // A modifier pour centrer les points de zone
    popupAnchor: [0, -30],
    iconSize: new L.Point(22, 33),
    className: 'leaflet-div-icon'
});

const iconAntenne = new L.Icon({
    iconUrl: require('../../img/antenne.png'),
    iconRetinaUrl: require('../../img/antenne.png'),
    iconAnchor: [14, 47], // A modifier pour centrer les points de zone
    popupAnchor: [0, -40],
    iconSize: new L.Point(28, 47),
    className: 'leaflet-div-icon'
});

const iconDisloqueur = new L.Icon({
    iconUrl: require('../../img/disloqueur.png'),
    iconRetinaUrl: require('../../img/disloqueur.png'),
    iconAnchor: [32, 64], // A modifier pour centrer les points de zone
    popupAnchor: [0, -55],
    iconSize: new L.Point(64, 64),
    className: 'leaflet-div-icon'
});

const iconIntercepteur = new L.Icon({
    iconUrl: require('../../img/intercepteur.gif'),
    iconRetinaUrl: require('../../img/intercepteur.gif'),
    iconAnchor: [23, 14], // A modifier pour centrer les points de zone
    popupAnchor: [0, -5],
    iconSize: new L.Point(46, 28),
    className: 'leaflet-div-icon'
});

const iconPortail = new L.Icon({
    iconUrl: require('../../img/portail.png'),
    iconRetinaUrl: require('../../img/portail.png'),
    iconAnchor: [12, 48], // A modifier pour centrer les points de zone
    popupAnchor: [0, -45],
    iconSize: new L.Point(24, 48),
    className: 'leaflet-div-icon'
});

const iconSentinelle = new L.Icon({
    iconUrl: require('../../img/sentinelle.png'),
    iconRetinaUrl: require('../../img/sentinelle.png'),
    iconAnchor: [9, 10], // A modifier pour centrer les points de zone
    popupAnchor: [0, -5],
    iconSize: new L.Point(18, 20),
    className: 'leaflet-div-icon'
});

const iconSonde = new L.Icon({
    iconUrl: require('../../img/sonde.png'),
    iconRetinaUrl: require('../../img/sonde.png'),
    iconAnchor: [26, 36], // A modifier pour centrer les points de zone
    popupAnchor: [0, -25],
    iconSize: new L.Point(52, 36),
    className: 'leaflet-div-icon'
});

export { getItemIcon, iconWhiteFlag, iconGameArea, iconForbiddenArea };
