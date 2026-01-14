import {create, useStore} from 'zustand'
import type {Draft} from 'immer';
import {type DataRootType, DataRootZod} from '../../common/types.ts';
import {immer} from 'zustand/middleware/immer';
import {createContext, useContext} from 'react';

export type RootStore = DataRootType & {
  patchData: (changer: (stateDraft: Draft<DataRootType>) => void) => void
  saveData: () => Promise<Response>
}

export const createDynamicStore = (initProps: DataRootType) => {
  return create<RootStore>()(immer((setState, getState) => {
    return {
      ...initProps,
      patchData: (updater) => {
        setState(updater);
      },
      saveData: async () => {
        const updatedState = getState();

        return fetch('http://localhost:3000/update-config', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(DataRootZod.parse(updatedState))
        });
      }
    }
  }));
}

export type DynamicStore = ReturnType<typeof createDynamicStore>;

export const DynamicStoreContext = createContext<DynamicStore | null>(null);

export const useDynamicStoreStore = () => {
  const storeFromContext = useContext(DynamicStoreContext);
  return useStore(storeFromContext!);
};