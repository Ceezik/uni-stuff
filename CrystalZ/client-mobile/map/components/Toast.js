import Toast from 'react-native-root-toast';

/**
 * Composant Popup :
 * Affiche un popup d'alerte
 *
 * @param message Message à afficher
 * @param color Couleur de fond du popup (rouge par défaut)
 * @param position Position du popup (Bas de l'écran par défaut)
 * @param delay Durée d'apparition à l'écran
 */
export const Popup = (
  message,
  color = 'rgba(255,0,0,0.5)',
  position = Toast.positions.BOTTOM,
  delay = Toast.durations.SHORT,
) => {
  return Toast.show(message, {
    duration: delay,
    position: position,
    shadow: true,
    animation: true,
    hideOnPress: true,
    backgroundColor: color,
    delay: 0,
    onShow: () => {
      // calls on toast\`s appear animation start
    },
    onShown: () => {
      // calls on toast\`s appear animation end.
    },
    onHide: () => {
      // calls on toast\`s hide animation start.
    },
    onHidden: () => {
      // calls on toast\`s hide animation end.
    },
  });

  // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
  setTimeout(function() {
    Toast.hide(toast);
  }, 500);
};
