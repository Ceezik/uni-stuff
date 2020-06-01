import React from 'react';
import { useItems } from '../../utils/useItems';
import { useSocket } from '../../utils/useSocket';
import { ItemMarker } from './Markers';

/**
 * Composant ItemList :
 * Liste des items
 */
function ItemList() {
    const { socket } = useSocket();
    const { items, setItems, hiddenItems } = useItems();

    socket.on('adminRoutine', (o) => {
        if (!localStorage.getItem('moving')) setItems(o.items);
    });

    return items
        .filter((i) => !hiddenItems.includes(i.name))
        .map((item) => <ItemMarker key={item.id} item={item} />);
}

export default ItemList;
