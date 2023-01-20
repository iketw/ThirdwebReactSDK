import { useCallback, useEffect, useState } from 'react';
import { createUniversalProvider } from './UniversalProvider';

export default function useInit() {
    const [initialized, setInitialized] = useState(false);

    const onInitialize = useCallback(async () => {
        try {
            await createUniversalProvider();

            setInitialized(true);
        } catch (err: unknown) {
            console.log('Error for initializing', err);
        }
    }, []);

    useEffect(() => {
        if (!initialized) {
            onInitialize();
        }
    }, [initialized, onInitialize]);

    return initialized;
}
