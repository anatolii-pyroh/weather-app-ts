import { configureStore, combineReducers } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import currentWeatherSlice from "../reducers/currentWeatherSlice";
import forecastWeatherSlice from "../reducers/forecastWeatherSlice";

const persistConfig = {
  key: "root",
  storage,
};
// if need, will add more reducers if create them
const rootReducer = combineReducers({
  currentWeather: currentWeatherSlice,
  forecastWeather: forecastWeatherSlice,
});

// make persisted reducer by using config and slices(rootReducer)
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  // avoid console errors from redux-persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// create final store
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch