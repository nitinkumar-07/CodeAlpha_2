import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authSliceReducer } from './authSlice';
import jobSlice from './jobSlice';
import companySlice from './companySlice';

import {
    //persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
import applicationSlice from "./applicationSlice";

const persistConfig = {
    key: "root",
    version: 1,
    storage: storage.default || storage,
};

const rootReducer = combineReducers({
    auth: authSliceReducer,
    job: jobSlice,
    company: companySlice,
      application: applicationSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({

    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),

})

export default store;