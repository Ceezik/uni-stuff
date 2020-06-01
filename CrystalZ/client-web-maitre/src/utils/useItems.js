import React, { useState, createContext, useContext } from 'react';
import { useSocket } from './useSocket';
import { useForbiddenAreas } from './useForbiddenAreas';
import { useGameAreas } from './useGameAreas';
import { isInForbiddenAreas, isInGameAreas } from './map';
import { toast } from 'react-toastify';

const ItemContext = createContext();
const ITEM_ERROR_MESSAGE = "L'item doit être placé dans la zone de jeu";

/**
 * Contexte permettant d'avoir accès aux fonctions de gestion des items
 * partout dans le code
 */
export const ItemProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [hiddenItems, setHiddenItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showRadius, setShowRadius] = useState(false);
    const { socket } = useSocket();
    const { forbiddenAreas } = useForbiddenAreas();
    const { gameAreas } = useGameAreas();

    const createItem = (coordinates) => {
        if (
            !isInForbiddenAreas(coordinates, forbiddenAreas) &&
            isInGameAreas(coordinates, gameAreas)
        ) {
            socket.emit(
                'createItem',
                {
                    coordinates,
                    name: selectedItem,
                },
                (item) => setItems([...items, item])
            );
        } else {
            toast.error(ITEM_ERROR_MESSAGE);
        }
    };

    const createRandomItems = (nbItems, name) => {
        socket.emit('createRandomItems', { nbItems, name });
    };

    const moveItem = (coordinates, item) => {
        if (
            !isInForbiddenAreas(coordinates, forbiddenAreas) &&
            isInGameAreas(coordinates, gameAreas)
        ) {
            item.coordinates = coordinates;
            setItems([...items.filter((i) => i.id !== item.id), ...[item]]);
        } else {
            toast.error(ITEM_ERROR_MESSAGE);
        }

        socket.emit('moveItem', {
            coordinates: item.coordinates,
            itemId: item.id,
        });
    };

    const deleteItem = (item) => {
        setItems(items.filter((i) => i.id !== item.id));
        socket.emit('deleteItem', item.id);
    };

    const deleteItemsByName = (name) => {
        socket.emit('deleteItemsByName', name);
    };

    return (
        <ItemContext.Provider
            value={{
                items,
                setItems,
                hiddenItems,
                setHiddenItems,
                selectedItem,
                setSelectedItem,
                showRadius,
                setShowRadius,
                createItem,
                createRandomItems,
                moveItem,
                deleteItem,
                deleteItemsByName,
            }}
        >
            {children}
        </ItemContext.Provider>
    );
};

export const useItems = () => useContext(ItemContext);
