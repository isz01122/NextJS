import { useLayoutEffect } from 'react';
import create from 'zustand';
import createContext from 'zustand/context';

let store;

const initialState = {};

const zustandContext = createContext<any>();
export const StoreProvider = zustandContext.Provider;
export const useStoreSSR = zustandContext.useStore;

export const initStore = (preloadedState = {}) => {
  const _create = (set, get) => ({
    ...initialState,
    ...preloadedState,
  });

  return create(_create);
};

export const initializeStore = (preloadedState = {}) => {
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({ ...store.getState(), ...preloadedState });
  }

  return _store;
};

export function useCreateStore(initialState) {
  if (typeof window === 'undefined') {
    return () => initializeStore(initialState);
  }

  store = store ?? initializeStore(initialState);

  useLayoutEffect(() => {
    if (initialState && store) {
      store.setState({ ...initialState, ...store.getState() });
    }
  }, [initialState]);

  return () => store;
}
