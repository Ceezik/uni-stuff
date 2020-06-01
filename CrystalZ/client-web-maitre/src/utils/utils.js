/**
 * Convertit une durée exprimée en secondes en uen durée au format hh:mm:ss
 *
 * @param int seconds Durée à convertir
 */
export const secondsToDuration = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor((seconds % 3600) % 60);

    return `${h <= 0 ? '00' : ('0' + h).slice(-2)}:${
        m <= 0 ? '00' : ('0' + m).slice(-2)
    }:${s <= 0 ? '00' : ('0' + s).slice(-2)}`;
};

/**
 * Compare si un cristal a été modifié entre 2 rendus
 *
 * @param object prevProps L'ancien cristal
 * @param object nextProps Le nouveau cristal
 */
export const areFlagEqual = (prevProps, nextProps) => {
    return prevProps.flag.nbUpdates === nextProps.flag.nbUpdates;
};

/**
 * Compare si un point d'intérêt a été modifié entre 2 rendus
 *
 * @param object prevProps L'ancien point d'intérêt
 * @param object nextProps Le nouveau point d'intérêt
 */
export const areMarkerEqual = (prevProps, nextProps) => {
    return prevProps.marker.nbUpdates === nextProps.marker.nbUpdates;
};

/**
 * Compare si un item a été modifié entre 2 rendus
 *
 * @param object prevProps L'ancien item
 * @param object nextProps Le nouvel item
 */
export const areItemEqual = (prevProps, nextProps) => {
    return prevProps.item.nbUpdates === nextProps.item.nbUpdates;
};

/**
 * Compare si un piège a été modifié entre 2 rendus
 *
 * @param object prevProps L'ancien piège
 * @param object nextProps Le nouveau piège
 */
export const areTrapEqual = (prevProps, nextProps) => {
    return prevProps.trap.nbUpdates === nextProps.trap.nbUpdates;
};

/**
 * Compare si un équipe a été modifié entre 2 rendus
 *
 * @param object prevProps L'ancienne équipe
 * @param object nextProps La nouvelle équipe
 */
export const areTeamEqual = (prevProps, nextProps) => {
    return prevProps.team.score === nextProps.team.score;
};
/**
 * Sérialise une configuration
 *
 * @param object config La configuration à sérialiser
 */
export const serializeConfig = (config) => {
    if (config.playerVisibilityRadius) {
        config.playerVisibilityRadius = parseFloat(
            config.playerVisibilityRadius
        );
    }
    if (config.playerActionRadius) {
        config.playerActionRadius = parseFloat(config.playerActionRadius);
    }
    if (config.flagVisibilityRadius) {
        config.flagVisibilityRadius = parseFloat(config.flagVisibilityRadius);
    }
    if (config.flagActionRadius) {
        config.flagActionRadius = parseFloat(config.flagActionRadius);
    }

    return config;
};

/**
 * Sérialise un item
 *
 * @param object item L'item à sérializer
 */
export const serializeItem = (item) => {
    item.autoMove = item.autoMove === 'true';
    item.quantity = item.quantity ? parseInt(item.quantity) : null;
    item.visibilityRadius = item.visibilityRadius
        ? parseFloat(item.visibilityRadius)
        : null;
    item.actionRadius = item.actionRadius
        ? parseFloat(item.actionRadius)
        : null;
    item.waitingPeriod = item.waitingPeriod
        ? parseInt(item.waitingPeriod)
        : null;
    item.effectDuration = item.effectDuration
        ? parseInt(item.effectDuration)
        : null;
    item.effectStrength = item.effectStrength
        ? parseInt(item.effectStrength)
        : null;

    return item;
};

/**
 * Renvoie l'image d'un item à partir de son nom
 *
 * @param string name Nom de l'item
 */
export const getItemImage = (name) => {
    switch (name) {
        case 'Sentinelle':
            return require('../icons/sentinelle.png');
        case 'Canon à photons':
            return require('../icons/canonPhotons.gif');
        case 'Antenne':
            return require('../icons/antenne.png');
        case 'Sonde':
            return require('../icons/sonde.png');
        case 'Portail de transfert':
            return require('../icons/portail.png');
        case 'Disloqueur':
            return require('../icons/disloqueur.png');
        case 'Intercepteur':
            return require('../icons/intercepteur.gif');
        case 'Noyau protecteur':
            return require('../icons/noyau.png');
        case 'Oracle':
            return require('../icons/oracle.png');
        case 'Tempête':
            return require('../icons/tempete.png');
        case 'Transducteur':
            return require('../icons/transducteur.gif');
        case 'Transporteur':
            return require('../icons/transporteur.png');
        default:
            return require('../icons/cristal.png');
    }
};

/**
 * Liste des items ayant une durée d'utilisation
 */
export const itemsWithDuration = [
    'Sentinelle',
    'Canon à photons',
    'Intercepteur',
    'Sonde',
];

/**
 * Liste des items ayant un impact sur le rayon de visibilité
 */
export const itemsWithEffect = ['Intercepteur', 'Sonde'];
