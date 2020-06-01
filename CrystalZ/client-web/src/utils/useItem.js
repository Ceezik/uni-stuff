import React, { useState, createContext, useContext } from 'react';
import { useForbiddenZone } from './useForbiddenZone';
import { useMainZone } from './useMainZone';
import { isInZone, getZoneBox } from './utils';
import { toast } from 'react-toastify';

const ItemContext = createContext();

/**
 * Contexte des items :
 * Permet d'avoir accès à tous les outils de gestion des items partout dans le code
 */
export const ItemProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [modelItems, setModelItems] = useState([]);
    const [selectedModelItem, setSelectedModelItem] = useState('');
    const [showRadius, setShowRadius] = useState(false);
    const [hiddenItems, setHiddenItems] = useState([]);
    const { position: mainZone } = useMainZone();
    const { forbiddenZones } = useForbiddenZone();

    const create = point => {
        const position = { lat: point.latlng.lat, lng: point.latlng.lng };

        let conflict = false;

        forbiddenZones.map(zone => {
            isInZone(point.latlng.lat, point.latlng.lng, zone) &&
                (conflict = true);
        });

        const im = modelItems[selectedModelItem];

        return !conflict &&
            isInZone(point.latlng.lat, point.latlng.lng, mainZone)
            ? setItems(
                  items.concat({
                      name: im.name,
                      position,
                      quantity: 1,
                      visibilityRadius: im.visibilityRadius,
                      actionRadius: im.actionRadius,
                      waitingPeriod: im.waitingPeriod,
                      autoMove: im.autoMove,
                      effectDuration: im.effectDuration,
                      effectStrength: im.effectStrength
                  })
              )
            : toast.error(
                  'Veuillez placer les items dans une zone de jeu valide'
              );
    };

    const createRandom = (nb, itemModel) => {
        const { x_max, y_max, x_min, y_min } = getZoneBox(mainZone);

        let randomItems = [];
        let nbItems = nb;

        while (randomItems.length < nbItems) {
            let newItem = false;
            let iteration = 0;

            while (!newItem && iteration < 10) {
                let lat = y_min + Math.random() * (y_max - y_min);
                let lng = x_min + Math.random() * (x_max - x_min);

                let conflict = false;
                forbiddenZones.map(
                    zone => isInZone(lat, lng, zone) && (conflict = true)
                );

                const im = modelItems[itemModel];

                !conflict &&
                    isInZone(lat, lng, mainZone) &&
                    randomItems.push({
                        name: im.name,
                        position: { lat, lng },
                        quantity: 1,
                        visibilityRadius: im.visibilityRadius,
                        actionRadius: im.actionRadius,
                        waitingPeriod: im.waitingPeriod,
                        autoMove: im.autoMove,
                        effectDuration: im.effectDuration,
                        effectStrength: im.effectStrength
                    }) &&
                    (newItem = true);

                iteration++;
            }

            iteration === 10 && nbItems--;
        }

        setItems(items.concat(randomItems));
    };

    const move = (e, item) => {
        const newItems = [...items];
        const index = items.indexOf(item);
        const newPosition = {
            lat: e.target.getLatLng().lat,
            lng: e.target.getLatLng().lng
        };
        let conflict = false;

        forbiddenZones.map(zone => {
            isInZone(
                e.target.getLatLng().lat,
                e.target.getLatLng().lng,
                zone
            ) && (conflict = true);
        });

        if (
            !conflict &&
            isInZone(
                e.target.getLatLng().lat,
                e.target.getLatLng().lng,
                mainZone
            )
        ) {
            item.position = newPosition;
            newItems.splice(index, 1, item);
        } else {
            newItems.splice(index, 1);
        }

        setItems(newItems);
    };

    const updateItem = (item, newItem) => {
        newItem.name = item.name;
        newItem.position = item.position;
        const otherItems = items.filter(i => i !== item);
        otherItems.splice(items.indexOf(item), 0, newItem);
        setItems(otherItems);
    };

    const remove = point => {
        setItems(items.filter(p => p !== point));
    };

    const removeAll = itemModel => {
        const im = modelItems[itemModel];
        setItems(items.filter(i => i.name !== im.name));
    };

    return (
        <ItemContext.Provider
            value={{
                items,
                create,
                createRandom,
                move,
                remove,
                removeAll,
                updateItem,
                setItems,
                modelItems,
                setModelItems,
                selectedModelItem,
                setSelectedModelItem,
                showRadius,
                setShowRadius,
                hiddenItems,
                setHiddenItems
            }}
        >
            {children}
        </ItemContext.Provider>
    );
};

export const useItem = () => useContext(ItemContext);
