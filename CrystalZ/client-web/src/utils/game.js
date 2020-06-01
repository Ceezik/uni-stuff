/**
 * Renvoie une couleur selon si l'utilisateur a gagné la partie ou non
 *
 * @param object game La partie
 */
export const getGameColor = game => {
    if (game.hasWon) return '#68b684';
    else if (game.hasLost) return '#eb4646';
    else return '#d2d2d2';
};
