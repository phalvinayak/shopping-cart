import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';
import {
    combineReducers,
    configureStore,
    isRejected,
    Middleware,
} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { productsApi } from '@src/application/redux/api/products/products.api';
import {
    getResponseHeader,
    logRequestError,
} from '@src/application/redux/store.util';
import { DEFAULT_FETCH_POLICY } from '@src/application/models/constants/common.constants';

const preloadedState = {
    ...window.mycart?.initialState,
};

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: [],
};

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        [productsApi.reducerPath]: productsApi.reducer,
    })
);

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
    if (isRejected(action)) {
        // RTK Query internal error, that just means that another request was skipped because
        // there was either already a request in flight or already a value in cache,
        // so no request needs to be made. This is an internal rejection that RTK-Query uses to
        // track component subscriptions and not an error.
        if (action.error.name !== 'ConditionError') {
            logRequestError(action);
        }
    }

    return next(action);
};

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: { fetchPolicy: DEFAULT_FETCH_POLICY },
            },
            immutableCheck: false,
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(productsApi.middleware, rtkQueryErrorLogger),
    preloadedState,
    devTools: process.env.NODE_ENV !== 'production',
});

export const Persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type ApplicationDispatch = typeof store.dispatch;
