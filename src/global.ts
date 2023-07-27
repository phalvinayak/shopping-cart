declare global {
    interface Window {
        mycart: {
            initialState: Record<string, any>;
        };
    }
}

export {};
