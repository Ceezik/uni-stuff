import { getDistance } from '../utils/utils';

describe('Distance', () => {
    it('La distance entre les 2 points est la bonne', () => {
        // Given

        const startPoint = { lat: 48.55925071506474, lng: 7.6815669193465075 };
        const endPoint = { lat: 48.55876075552717, lng: 7.676156709159218 };

        // When
        const distance = getDistance(startPoint, endPoint);

        // Then
        expect(Math.round(distance * 100) / 100).toEqual(401.87);
    });
});
