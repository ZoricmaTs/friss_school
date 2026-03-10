import { createFileRoute } from '@tanstack/react-router'
import {Footer} from '../widgets/footer';
import {Separator} from '../widgets/separator';
import {getLevels, Patterns} from '../widgets/pattern';
import {Dropdown} from '../widgets/dropdown';
import {useState} from 'react';
import {useScreen} from '../hooks/useScreen.ts';
import {Modal} from '../widgets/modal';
import {useDynamicStoreStore} from '../providers/dynamicStore.ts';

export const Route = createFileRoute('/patterns')({
  component: RouteComponent,
})

function RouteComponent() {
  const dynamicStore = useDynamicStoreStore();
  const [items, setItems] = useState(dynamicStore.patterns);
  const {width} = useScreen();
  const [open, setOpen] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<number>(0);

  const dropdown = {
    id: 2,
    title: 'level-switch',
    label: 'Сложность',
    items: getLevels(),
  };

  const onChangeLevel = (id: number) => {
    if (id === 0) {
      setItems(dynamicStore.patterns);
      return;
    }

    const filteredItems = dynamicStore.patterns.filter((item) => item.level === id);

    setItems(filteredItems);
    setActiveId(id);
  };

  return <>
    <div style={{minHeight: '100vh'}}>
      <Separator title={'Выкройки'} style={{marginTop: 0}}/>
      {dynamicStore.patternsText && <p className={'patterns__description'}>
        {dynamicStore.patternsText}
      </p>}
      <div className={'patterns__content-wrapper'} >
        <div className={'patterns__filter-wrapper'}>
          {width > 768
            ? <>
              <h3 className={'patterns__filter_title'}>{'Фильтр'}</h3>
              <Dropdown props={dropdown} onActiveChange={onChangeLevel} activeId={activeId}/>
            </>
            : <button className={'patterns__filter_button'} onClick={() => setOpen(true)}>
              {'Фильтр'}
            </button>
          }
        </div>
        {items.length > 0
          ? <Patterns props={dynamicStore.patterns} key={activeId}/>
          : <div><p>{'Ничего не найдено.'}</p></div>
        }
      </div>
    </div>
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      title={'Фильтр'}
      modalWrapperStyle={{width: '100%', height: '100%'}}
      modalContentStyle={{width: '100%', height: '100%', maxWidth: '100vw', maxHeight: '100vh'}}
    >
      <Dropdown props={dropdown} onActiveChange={onChangeLevel} activeId={activeId}/>
    </Modal>
    <Footer/>
  </>;
}
