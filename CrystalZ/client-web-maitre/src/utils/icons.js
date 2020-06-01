import L from 'leaflet';

/**
 * Renvoie l'icône d'un item à partir de son nom
 *
 * @param string name Nom de l'item
 */
export const getItemIcon = (name) => {
    switch (name) {
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
            return iconGameArea;
    }
};

export const iconGameArea = new L.Icon({
    iconUrl: require('../icons/gameArea.png'),
    iconRetinaUrl: require('../icons/gameArea.png'),
    iconAnchor: [6, 43],
    popupAnchor: [0, -40],
    iconSize: new L.Point(13, 43),
    className: 'leaflet-div-icon',
});

export const iconForbiddenArea = new L.Icon({
    iconUrl: require('../icons/forbiddenArea.png'),
    iconRetinaUrl: require('../icons/forbiddenArea.png'),
    iconAnchor: [6, 43],
    popupAnchor: [0, -40],
    iconSize: new L.Point(13, 43),
    className: 'leaflet-div-icon',
});

export const iconPlayer = (color) =>
    new L.divIcon({
        className: 'leaflet-div-icon',
        iconSize: new L.Point(30, 30),
        html: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" ><path fill=${color} d="M444.52 3.52L28.74 195.42c-47.97 22.39-31.98 92.75 19.19 92.75h175.91v175.91c0 51.17 70.36 67.17 92.75 19.19l191.9-415.78c15.99-38.39-25.59-79.97-63.97-63.97z"></path></svg>`,
    });

export const iconFlag = (color) =>
    new L.divIcon({
        className: 'leaflet-div-icon',
        iconSize: new L.Point(60, 60),
        iconAnchor: [25, 60],
        popupAnchor: [0, -50],
        html: `<svg role="img" version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)" fill=${color} stroke="none"><path d="M245 560 c-4 -7 -32 -74 -61 -148 l-53 -136 71 -123 c39 -68 72 -123 74 -123 1 0 32 56 68 124 l66 123 -30 98 c-26 88 -35 104 -78 148 -35 35 -52 46 -57 37z m31 -52 c9 -29 18 -55 20 -57 2 -2 14 4 26 15 l23 19 -22 -25 c-18 -21 -73 -201 -73 -239 0 -6 32 5 71 25 39 19 73 34 75 31 2 -2 -28 -19 -67 -38 l-71 -34 6 -50 c3 -28 8 -67 11 -86 5 -32 5 -33 -4 -5 -6 15 -13 52 -16 80 -6 43 -12 56 -33 69 -15 9 -40 28 -57 42 -18 17 -10 13 21 -9 l50 -35 27 112 28 112 -21 59 c-22 64 -22 66 -16 66 3 0 12 -24 22 -52z"/></g></svg>`,
    });

export const iconMarkerPositive = (color) =>
    new L.divIcon({
        className: 'leaflet-div-icon',
        iconSize: new L.Point(30, 30),
        iconAnchor: [15, 30],
        popupAnchor: [0, -25],
        html: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill=${color} d="M192 0C86.4 0 0 86.4 0 192c0 76.8 25.6 99.2 172.8 310.4 9.6 12.8 28.8 12.8 38.4 0C358.4 291.2 384 268.8 384 192 384 86.4 297.6 0 192 0zm112 200c0 8.84-7.16 16-16 16h-72v72c0 8.84-7.16 16-16 16h-16c-8.84 0-16-7.16-16-16v-72H96c-8.84 0-16-7.16-16-16v-16c0-8.84 7.16-16 16-16h72V96c0-8.84 7.16-16 16-16h16c8.84 0 16 7.16 16 16v72h72c8.84 0 16 7.16 16 16v16z"></path></svg>`,
    });

export const iconMarkerNegative = (color) =>
    new L.divIcon({
        className: 'leaflet-div-icon',
        iconSize: new L.Point(30, 30),
        iconAnchor: [15, 30],
        popupAnchor: [0, -25],
        html: `<svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill=${color} d="M192 0C86.4 0 0 86.4 0 192c0 76.8 25.6 99.2 172.8 310.4 9.6 12.8 28.8 12.8 38.4 0C358.4 291.2 384 268.8 384 192 384 86.4 297.6 0 192 0zm112 200c0 8.84-7.16 16-16 16H96c-8.84 0-16-7.16-16-16v-16c0-8.84 7.16-16 16-16h192c8.84 0 16 7.16 16 16v16z"></path></svg>`,
    });

export const iconTransporteur = new L.Icon({
    iconUrl: require('../icons/transporteur.png'),
    iconRetinaUrl: require('../icons/transporteur.png'),
    iconAnchor: [25, 50],
    popupAnchor: [0, -40],
    iconSize: new L.Point(50, 50),
    className: 'leaflet-div-icon',
});

export const iconTransducteur = new L.Icon({
    iconUrl: require('../icons/transducteur.gif'),
    iconRetinaUrl: require('../icons/transducteur.gif'),
    iconAnchor: [17, 39],
    popupAnchor: [0, 0],
    iconSize: new L.Point(35, 39),
    className: 'leaflet-div-icon',
});

export const iconTempete = new L.Icon({
    iconUrl: require('../icons/tempete.png'),
    iconRetinaUrl: require('../icons/tempete.png'),
    iconAnchor: [33, 64],
    popupAnchor: [-10, -55],
    iconSize: new L.Point(47, 66),
    className: 'leaflet-div-icon',
});

export const iconOracle = new L.Icon({
    iconUrl: require('../icons/oracle.png'),
    iconRetinaUrl: require('../icons/oracle.png'),
    iconAnchor: [21, 59],
    popupAnchor: [0, -50],
    iconSize: new L.Point(42, 59),
    className: 'leaflet-div-icon',
});

export const iconNoyau = new L.Icon({
    iconUrl: require('../icons/noyau.png'),
    iconRetinaUrl: require('../icons/noyau.png'),
    iconAnchor: [17, 18],
    popupAnchor: [0, -10],
    iconSize: new L.Point(34, 36),
    className: 'leaflet-div-icon',
});

export const iconCanonPhotons = new L.Icon({
    iconUrl: require('../icons/canonPhotons.gif'),
    iconRetinaUrl: require('../icons/canonPhotons.gif'),
    iconAnchor: [11, 33],
    popupAnchor: [0, -30],
    iconSize: new L.Point(22, 33),
    className: 'leaflet-div-icon',
});

export const iconAntenne = new L.Icon({
    iconUrl: require('../icons/antenne.png'),
    iconRetinaUrl: require('../icons/antenne.png'),
    iconAnchor: [14, 47],
    popupAnchor: [0, -40],
    iconSize: new L.Point(28, 47),
    className: 'leaflet-div-icon',
});

export const iconDisloqueur = new L.Icon({
    iconUrl: require('../icons/disloqueur.png'),
    iconRetinaUrl: require('../icons/disloqueur.png'),
    iconAnchor: [32, 64],
    popupAnchor: [0, -55],
    iconSize: new L.Point(64, 64),
    className: 'leaflet-div-icon',
});

export const iconIntercepteur = new L.Icon({
    iconUrl: require('../icons/intercepteur.gif'),
    iconRetinaUrl: require('../icons/intercepteur.gif'),
    iconAnchor: [23, 14],
    popupAnchor: [0, -5],
    iconSize: new L.Point(46, 28),
    className: 'leaflet-div-icon',
});

export const iconPortail = new L.Icon({
    iconUrl: require('../icons/portail.png'),
    iconRetinaUrl: require('../icons/portail.png'),
    iconAnchor: [12, 48],
    popupAnchor: [0, -45],
    iconSize: new L.Point(24, 48),
    className: 'leaflet-div-icon',
});

export const iconSentinelle = new L.Icon({
    iconUrl: require('../icons/sentinelle.png'),
    iconRetinaUrl: require('../icons/sentinelle.png'),
    iconAnchor: [9, 10],
    popupAnchor: [0, -5],
    iconSize: new L.Point(18, 20),
    className: 'leaflet-div-icon',
});

export const iconSonde = new L.Icon({
    iconUrl: require('../icons/sonde.png'),
    iconRetinaUrl: require('../icons/sonde.png'),
    iconAnchor: [26, 36],
    popupAnchor: [0, -25],
    iconSize: new L.Point(52, 36),
    className: 'leaflet-div-icon',
});
