import { applyMiddleware, legacy_createStore as createStore, Middleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './index';
import rootSaga from './sagas/rootSaga';
import { persistStore, persistReducer } from 'redux-persist';
import createNoopStorage from '@/utils/createNoopStorage'; // ✅ new import

const isServer = typeof window === 'undefined'; // ✅ SSR detection

const storage = isServer
  ? createNoopStorage() // 🧠 use fake storage during SSR
  : require('redux-persist/lib/storage').default; // ✅ real localStorage in browser

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();
const middlewares: Middleware[] = [sagaMiddleware];

const initializeStore = () => {
  const reduxStore = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  const persistor = persistStore(reduxStore);
  return { reduxStore, persistor };
};

const store = initializeStore();
sagaMiddleware.run(rootSaga);

export default store;
