import { useRef, useEffect } from 'react';

type HookReturnTuple = [() => Promise<void>, () => void];

export function useTimer(delay: number = 500): HookReturnTuple {
    const timeout = useRef<any>();

    const startTimer = () =>
        new Promise<void>((resolve) => {
            timeout.current = setTimeout(resolve, delay);
        });

    const cancelTimer = () => clearTimeout(timeout.current);

    useEffect(() => {
        return () => {
            cancelTimer(); // Cleanup the timer when the component unmounts
        };
    }, []);

    return [startTimer, cancelTimer];
}
