export const inRadius = (coordinates, position, radius) => {
  return getDistance(position, coordinates) < radius;
};

/**
 * getDistance :
 * Calcule la distance entre 2 coordonnées
 *
 * @param origin Point de départ
 * @param destination Point d'arrivée
 */
export const getDistance = (origin, destination) => {
  let lon1 = toRadian(origin[1]),
    lat1 = toRadian(origin[0]),
    lon2 = toRadian(destination[1]),
    lat2 = toRadian(destination[0]);

  let deltaLat = lat2 - lat1;
  let deltaLon = lon2 - lon1;

  let a =
    Math.pow(Math.sin(deltaLat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
  let c = 2 * Math.asin(Math.sqrt(a));
  let EARTH_RADIUS = 6371;
  return c * EARTH_RADIUS * 1000;
};

const toRadian = (degree) => {
  return (degree * Math.PI) / 180;
};

export const secondsToDuration = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor((seconds % 3600) % 60);

  return `${h <= 0 ? '00' : ('0' + h).slice(-2)}:${
    m <= 0 ? '00' : ('0' + m).slice(-2)
  }:${s <= 0 ? '00' : ('0' + s).slice(-2)}`;
};
