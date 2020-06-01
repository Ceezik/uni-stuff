import { addItemsModel } from '../service/configuration';

/**
 * Initialise un modèle pour les items
 *
 * @param int duration Durée de l'effet
 * @param int id Id du modèle
 */
export const initializeItemModels = (duration, id) => {
    const effectDuration = duration ? Math.ceil(duration * 0.05) : 300;

    return Promise.all(
        itemModels.map(im => {
            const i = { name: im.name };

            if (itemsWithDuration.includes(im.name)) {
                i.effectDuration = effectDuration;
            }
            if (itemsWithEffect.includes(im.name)) {
                i.effectStrength = 50;
            }
            return addItemsModel(id, i);
        })
    );
};

/**
 * Ensemble des explications des modèles d'items
 */
export const itemModels = [
    {
        name: 'Sonde',
        description:
            'Augmente le rayon de visibilité des éléments pendant un certain temps'
    },

    {
        name: 'Noyau protecteur',
        description:
            "Génère un dôme de protection qui protège le joueur contre l'effet des items ennemis"
    },

    {
        name: 'Portail de transfert',
        description: 'Transfère un item à un joueur allié'
    },

    {
        name: 'Intercepteur',
        description:
            'Réduit le rayon de visibilité des éléments que peuvent percevoir les ennemis pendant un certain temps'
    },

    {
        name: 'Tempête',
        description:
            'Modifie aléatoirement l’emplacement de l’ensemble des éléments'
    },

    {
        name: 'Canon à photons',
        description:
            "Empèche le joueur qui l'active de capturer des cristaux, d'utiliser et/ou de prendre des items pendant une durée déterminée"
    },

    {
        name: 'Sentinelle',
        description: "Augmente le temps d'invulnérabilité d’un cristal capturé"
    },

    {
        name: 'Transporteur',
        description:
            "Augmente la taille de l’inventaire du joueur qui l'utilise"
    },

    {
        name: 'Oracle',
        description:
            "Rend le prochain cristal capturé incapturable par les ennemis jusqu'à la fin de la partie"
    },

    {
        name: 'Disloqueur',
        description: "Remet l'ensemble des cristaux dans un état neutre"
    },

    {
        name: 'Transducteur',
        description:
            "Vole un item au joueur l'activant et donne l'item à celui ayant posé le transducteur"
    },

    {
        name: 'Antenne',
        description:
            "Révèle au joueur la position d'un cristal pendant quelques secondes"
    }
];

/**
 * Liste des items ayant une durée d'utilisation
 */
export const itemsWithDuration = [
    'Sentinelle',
    'Canon à photons',
    'Intercepteur',
    'Sonde'
];

/**
 * Liste des items ayant un impact sur le rayon de visibilité
 */
export const itemsWithEffect = ['Intercepteur', 'Sonde'];
