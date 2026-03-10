import {create, useStore} from 'zustand'
import type {Draft} from 'immer';
import {type DataRootType, DataRootZod} from '../../common/types.ts';
import {immer} from 'zustand/middleware/immer';
import {createContext, useContext} from 'react';

export type RootStore = DataRootType & {
  patchData: (changer: (stateDraft: Draft<DataRootType>) => void) => void
  saveData: () => Promise<Response>
  publish: () => Promise<void>
  resetChanges: () => Promise<void>
  isSaved: boolean
  isSaving: boolean
}

export const createDynamicStore = (initProps: DataRootType, isSaved: boolean) => {
  return create<RootStore>()(immer((setState, getState) => {
    return {
      ...initProps,
      isSaved,
      isSaving: false,
      patchData: (updater) => {
        setState(updater);
      },
      saveData: async () => {
        const updatedState = getState();
        try {
          const result = await fetch('http://localhost:3000/update-config', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(DataRootZod.parse(updatedState)),
            signal: AbortSignal.timeout(2000),
          });

          setState({isSaved: false});
          return result;
        } catch (e) {
          alert('При сохранении изменений произошла ошибка! Перезапустите скрипт! Мы попытаемся сохранить весь снимок ваших данных в буфер обмена и консоль');
          console.log('Не удалось сохранить данные:', updatedState);
          navigator.clipboard.writeText(JSON.stringify(updatedState)).catch(() => {
          });
          throw e;
        }
      },
      publish: async () => {
        setState({isSaving: true});
        try {
          await fetch('http://localhost:3000/publish', {
            method: 'POST',
          });
          setState({isSaving: false, isSaved: true});
        } catch (e) {
          alert('При публикации сайта возникла ошибка! Изменения сохранены локально, но не опубликованы. Возможно, выключен сервер, не удаётся авторизоваться в GitHub или возникли конфликты слияния. Рекомендуем связаться с разработчиком');
          setState({isSaving: false});
          throw e;
        }
      },
      resetChanges: async () => {
        try {
          setState({isSaving: true});
          const stableConfig: DataRootType = await (await fetch('/dynamic/config.json')).json();
          await fetch('http://localhost:3000/remove-local-config', {
            method: 'POST',
          });
          setState({...stableConfig, isSaving: false, isSaved: true});
        } catch (e) {
          setState({isSaving: false, isSaved: false});
          const state = getState();
          alert('При сохранении изменений произошла ошибка! Перезапустите скрипт! Мы попытаемся сохранить весь снимок ваших данных в буфер обмена и консоль');
          console.log('Не удалось сохранить данные:', state);
          navigator.clipboard.writeText(JSON.stringify(state)).catch(() => {
          });
          throw e;
        }
      },
    }
  }));
}

export type DynamicStore = ReturnType<typeof createDynamicStore>;

export const DynamicStoreContext = createContext<DynamicStore | null>(null);

export const useDynamicStoreStore = () => {
  const storeFromContext = useContext(DynamicStoreContext);
  return useStore(storeFromContext!);
};