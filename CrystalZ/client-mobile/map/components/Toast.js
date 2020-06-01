import Toast from 'react-native-root-toast';
import React from 'react';

export const Popup = (
  message,
  color = 'rgba(255,0,0,0.5)',
  position = Toast.positions.BOTTOM,
) => {
  return Toast.show(message, {
    duration: Toast.durations.SHORT,
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
