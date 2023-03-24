import { useState } from 'react';

export interface DialogContext<T> {
    context: T | null;
    clearContext: () => void;
}

export function useDialogContext<T>() {
    const [context, setContext] = useState<T | null>(null);
    function clearContext() {
        setContext(null);
    }
    return { context, setContext, clearContext };
}