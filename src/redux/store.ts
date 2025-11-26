import { configureStore } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import {
    createTransform,
    persistReducer,
    persistStore,
    PersistConfig
} from 'redux-persist';
import rootReducer from './rootReducer';
import type { UnknownAction } from 'redux';
import { ThemeState } from './slices/themeSlice';

type RootState = ReturnType<typeof rootReducer>;

const themeTransform = createTransform<ThemeState, ThemeState, RootState>(
    // inbound: Redux state → persisted
    (inboundState) => {
        if (inboundState.presetTheme === 'system') {
            return {
                ...inboundState,
                lightTheme: window.matchMedia('(prefers-color-scheme: light)').matches
            };
        }
        return inboundState;
    },
    // outbound: persisted → Redux state
    (outboundState) => {
        if (outboundState.presetTheme === 'system') {
            return {
                ...outboundState,
                lightTheme: window.matchMedia('(prefers-color-scheme: light)').matches
            };
        }
        return outboundState;
    },
    { whitelist: ['themeSlice'] }
);

const persistConfig: PersistConfig<RootState> = {
    key: 'root',
    storage,
    transforms: [themeTransform],
    whitelist: ['storageSlice', 'themeSlice'],
};

const persistedReducer = persistReducer<RootState, UnknownAction>(
    persistConfig,
    rootReducer
);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // ignore redux-persist actions
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
            }
        }),
});

export type AppDispatch = typeof store.dispatch;
export type TypedSelector = TypedUseSelectorHook<RootState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedSelector = useSelector;

export const persistor = persistStore(store);
export default store;
