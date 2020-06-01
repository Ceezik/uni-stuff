import { isInZone, getZoneBox } from '../utils/utils';

describe('Zone', () => {
    it('Le point est dans la zone', () => {
        // Given
        const zone = [
            { lat: 48.52896869415842, lng: 7.734380364418031 },
            { lat: 48.53159750487597, lng: 7.7364832162857065 },
            { lat: 48.52977156163669, lng: 7.740420699119569 },
            { lat: 48.528712910695226, lng: 7.738757729530335 }
        ];
        const point = [48.52982840132963, 7.73738443851471];

        // When
        const isInside = isInZone(point[0], point[1], zone);

        // Then
        expect(isInside).toBeTruthy();
    });

    it('Le point est en dehors de la zone', () => {
        // Given
        const zone = [
            { lat: 48.52896869415842, lng: 7.734380364418031 },
            { lat: 48.53159750487597, lng: 7.7364832162857065 },
            { lat: 48.52977156163669, lng: 7.740420699119569 },
            { lat: 48.528712910695226, lng: 7.738757729530335 }
        ];
        const point = [48.531199639586056, 7.731682062149049];

        // When
        const isInside = isInZone(point[0], point[1], zone);

        // Then
        expect(isInside).toBeFalsy();
    });

    it('La boîte englobante est correcte', () => {
        // Given
        const zone = [
            { lat: 48.52896869415842, lng: 7.734380364418031 },
            { lat: 48.53159750487597, lng: 7.7364832162857065 },
            { lat: 48.52977156163669, lng: 7.740420699119569 },
            { lat: 48.528712910695226, lng: 7.738757729530335 }
        ];

        const expectedZoneBox = {
            x_min: 7.734380364418031,
            x_max: 7.740420699119569,
            y_min: 48.528712910695226,
            y_max: 48.53159750487597
        };

        // When
        const zoneBox = getZoneBox(zone);

        // Then
        expect(zoneBox).toEqual(expectedZoneBox);
    });
});
