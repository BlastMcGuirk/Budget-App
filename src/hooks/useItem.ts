import { useState } from 'react';
import { Item } from '../interfaces/Item';

export const useItem = () => {
    const [item, setItem] = useState<Item | null>(null);
    function clearItem() {
        setItem(null);
    }
    return { item, setItem, clearItem };
}