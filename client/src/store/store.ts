import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { createInjectorsEnhancer } from "redux-injectors";

import { createRootReducer } from "./reducers/reducer";
import { rootSaga } from "./sagas/saga";

export type ApplicationState = {};

function configureAppStore(initialState: ApplicationState) {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  const { run: runSaga } = sagaMiddleware;

  // sagaMiddleware: Makes redux saga works
  const middlewares = [sagaMiddleware];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer: createRootReducer,
      runSaga,
    }),
  ];

  const store = configureStore({
    reducer: createRootReducer(),
    middleware: [...getDefaultMiddleware(), ...middlewares],
    preloadedState: initialState,
    enhancers,
  });

  sagaMiddleware.run(rootSaga);
  return store;
}

export { configureAppStore };
