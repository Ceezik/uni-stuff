import React from 'react';

const autoSentence =
    'En laissant le champ vide, une valeur par défaut sera automatiquement calculée selon la configuration de la partie. ';

/**
 * Aides pour la configuration
 */
export const CONFIG_TIPS = {
    // Config des modèles
    visibilityRadius: {
        tip:
            "Distance à partir de laquelle l'élément est visible. " +
            autoSentence,
        placement: 'right'
    },
    actionRadius: {
        tip:
            "Distance à partir de laquelle le joueur peut interagir avec l'élément. Ce rayon doitêtre inférieure ou égale à la taille du rayon de visibilité du même élément." +
            autoSentence,
        placement: 'right'
    },
    waitingPeriod: {
        tip:
            "Période pendant laquelle l'item n'est plus ramassable après qu'un joueur ait pris l'item. ",
        placement: 'right'
    },
    locked: {
        tip:
            "Période pendant laquelle un cristal n'est plus capturable par les ennemis après qu'il ait été capturé. ",
        placement: 'right'
    },
    maxPlayers: {
        tip:
            "Si vous n'entrez pas de valeur, le nombre de joueurs par équipe ne sera pas limité.",
        placement: 'right'
    },
    inventaire: {
        tip:
            "Nombre d'items qu'un joueur peut transporter. Par défaut, la taille est de 2. ",
        placement: 'right'
    }
};

/**
 * Aide pour les généralités
 */
export const GENERAL_TIPS = {
    centerOnGameArea: {
        tip: 'Centrer sur la zone de jeu',
        placement: 'top'
    },

    area: {
        tip: (
            <span>
                <strong>Zone de jeu</strong>
                <br /> Délimite la zone dans laquelle les joueurs pourront
                évoluer lors de la partie
            </span>
        ),
        placement: 'right'
    },

    forbiddenArea: {
        tip: (
            <span>
                <strong>Zone interdite</strong>
                <br /> Délimite la zone dans laquelle les joueurs n'auront pas
                le droit d'aller
            </span>
        ),
        placement: 'right'
    },

    crystal: {
        tip: (
            <span>
                <strong>Cristal</strong>
                <br /> Objet céleste que les équipes devront capturer
            </span>
        ),
        placement: 'right'
    },

    addForbiddenArea: {
        tip: 'Ajouter une zone interdite',
        placement: 'top'
    },

    config: {
        tip: 'Paramètres généraux',
        placement: 'top'
    },

    teams: {
        tip: 'Equipes et membres',
        placement: 'top'
    },

    map: {
        tip: 'Carte',
        placement: 'top'
    },

    delete: {
        tip: 'Supprimer',
        placement: 'top'
    },

    clone: {
        tip: 'Copier',
        placement: 'top'
    },

    seeMap: {
        tip: 'Voir la carte',
        placement: 'top'
    },

    mask: {
        tip: 'Masquer sur la carte',
        placement: 'top'
    },

    unmask: {
        tip: 'Afficher sur la carte',
        placement: 'top'
    },

    download: {
        tip: 'Télécharger',
        placement: 'top'
    },

    modify: {
        tip: 'Modifier les paramètres',
        placement: 'top'
    },

    dice: {
        tip: 'Ajouter aléatoirement ',
        placement: 'top'
    },

    addTeam: {
        tip: 'Créer',
        placement: 'top'
    },

    addMember: {
        tip: "Ajouter à l'équipe ",
        placement: 'top'
    },

    deleteMember: {
        tip: "Retirer de l'équipe ",
        placement: 'top'
    }
};

/**
 * Aides pour les types de partie
 */
export const GAME_TIPS = {
    supremacy: {
        tip:
            "Partie non chronométrée. La partie s'arrête lorsqu'une équipe a capturé la majorité absolue de cristaux.",
        placement: 'right'
    },

    flag: {
        tip:
            "Partie chronométrée. L'équipe possédant le plus de cristaux à la fin du temps imparti remporte la partie.",
        placement: 'right'
    },

    time: {
        tip:
            "Partie chronométrée. L'équipe ayant le plus grand temps de possession de cristaux à la fin du temps imparti remporte la partie.",
        placement: 'right'
    }
};

/**
 * Aide pour les items
 */
export const ITEMS_TIPS = {
    // Description des items

    Sonde: {
        tip: (
            <span>
                <strong>Sonde</strong>
                <br /> Augmente le rayon de visibilité des éléments pendant un
                certain temps
            </span>
        ),
        placement: 'right'
    },

    'Noyau protecteur': {
        tip: (
            <span>
                <strong> Noyau protecteur</strong>
                <br /> Génère un dôme de protection qui protège le joueur contre
                l’effet des items ennemis
            </span>
        ),
        placement: 'right'
    },

    'Portail de transfert': {
        tip: (
            <span>
                <strong> Portail de transfert</strong>
                <br /> Transfère un item à un joueur allié
            </span>
        ),
        placement: 'right'
    },

    Intercepteur: {
        tip: (
            <span>
                <strong> Intercepteur</strong>
                <br /> Réduit pendant une certaine durée le rayon de visibilité
                des éléments que peuvent percevoir les ennemis
            </span>
        ),
        placement: 'right'
    },

    Tempête: {
        tip: (
            <span>
                <strong> Tempête</strong>
                <br /> Modifie aléatoirement l’emplacement de l’ensemble des
                éléments
            </span>
        ),
        placement: 'right'
    },

    'Canon à photons': {
        tip: (
            <span>
                <strong>Canon à photons</strong>
                <br /> Empêche le joueur qui l'active de capturer des cristaux,
                d’utiliser et/ou de prendre des items pendant une certaine durée
            </span>
        ),
        placement: 'right'
    },

    Sentinelle: {
        tip: (
            <span>
                <strong> Sentinelle</strong>
                <br /> Augmente le temps d'invulnérabilité d’un cristal capturé
            </span>
        ),
        placement: 'right'
    },

    Oracle: {
        tip: (
            <span>
                <strong> Oracle</strong>
                <br /> Rend un cristal incapturable par les ennemis jusqu'à la
                fin de la partie
            </span>
        ),
        placement: 'right'
    },

    Disloqueur: {
        tip: (
            <span>
                <strong> Disloqueur</strong>
                <br /> Remet l'ensemble des cristaux dans un état neutre
            </span>
        ),
        placement: 'right'
    },

    Transducteur: {
        tip: (
            <span>
                <strong> Transducteur</strong>
                <br /> Vole un item au joueur l'activant et le donne au joueur
                ayant posé le transducteur
            </span>
        ),
        placement: 'right'
    },

    Transporteur: {
        tip: (
            <span>
                <strong> Transporteur</strong>
                <br /> Augmente la taille de l'inventaire du joueur
            </span>
        ),
        placement: 'right'
    },

    Antenne: {
        tip: (
            <span>
                <strong> Antenne</strong>
                <br /> Révèle au joueur la position d'un cristal pendant
                quelques secondes
            </span>
        ),
        placement: 'right'
    }
};
