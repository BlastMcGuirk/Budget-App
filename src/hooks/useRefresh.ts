import { useState } from 'react';

export function useRefresh() {
    const [_, toggle] = useState(false);
    const refresh = () => {
        toggle(prev => !prev);
    }
    return { refresh };
}