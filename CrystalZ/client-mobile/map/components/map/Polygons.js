import React from 'react';
import {Polygon} from 'react-native-maps';
import {formatArea} from '../../utils/game';

const Polygons = ({areas}) => {
  return (
    areas.length > 0 &&
    areas.map(area => {
      return (
        area.coordinates[0] &&
        area.coordinates[0].length > 0 && (
          <Polygon
            strokeColor={
              area.forbidden ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 255, 0, 0.3)'
            }
            coordinates={formatArea(area)}
            fillColor={
              area.forbidden ? 'rgba(255, 0, 0, 0.3)' : 'rgba(0, 255, 0, 0.1)'
            }
          />
        )
      );
    })
  );
};

export default Polygons;
