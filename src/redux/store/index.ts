import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import dependencies for redux persist
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
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import currentWeatherSlice from "../reducers/currentWeatherSlice";
import forecastWeatherSlice from "../reducers/forecastWeatherSlice";

// create persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["currentWeather"],
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
