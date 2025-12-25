import { createFileRoute } from '@tanstack/react-router'
import {Footer} from '../widgets/footer';
import {Separator} from '../widgets/separator';
import {getLevels, Patterns} from '../widgets/pattern';
import {Dropdown} from '../widgets/dropdown';
import {useState} from 'react';
import {useScreen} from '../hooks/useScreen.ts';
import {Modal} from '../widgets/modal';

export const Route = createFileRoute('/patterns')({
  component: RouteComponent,
})

const patterns = [
  {
    id: 0,
    title: 'юбка-шорты 1 вариант юбка-шорты 1 вариант юбка-шорты 1 вариантюбка-шорты 1 вариант',
    price: 200,
    salePrice: 180,
    sizes: ['xs', 's', 'm', 'l'],
    level: 3,
    image: '/friss_school/images/patterns/photo_2025-12-23_11-23-42.jpg',
  },
  {
    id: 1,
    title: 'юбка-шорты 2 вариант',
    price: 0,
    sizes: ['xs', 's', 'm', 'l'],
    level: 2,
    image: '/friss_school/images/patterns/photo_2025-12-22_19-53-38.jpg',
  },
  {
    id: 2,
    title: 'юбка-шорты 3 вариант',
    price: 200,
    sizes: ['xs', 's', 'm', 'l'],
    level: 3,
    image: '/friss_school/images/patterns/photo_2025-12-22_19-53-56.jpg',
  }
];

function RouteComponent() {
  const [items, setItems] = useState(patterns);
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
      setItems(patterns);

      return;
    }

    const filteredItems = patterns.filter((item) => item.level === id);
    setItems(filteredItems);
    setActiveId(id);
  };

  return <>
    <div style={{minHeight: '100vh'}}>
      <Separator title={'Выкройки'} style={{marginTop: 0}}/>
      <p className={'patterns__description'}>
        {'Мы занимаемся изготовлением лекал, которые вы можете у нас заказать. ' +
          'Либо выбрать готовые лекала для пошива современной одежды.  На сайте также есть бесплатные выкройки. Создайте любой образ с нами.\n' +
          'Разный уровень сложности позволит шить вещи как новичкам, так и опытным мастерам.'}
      </p>
      <div className={'patterns__content-wrapper'} >
        <div className={'patterns__filter-wrapper'}>
          {width > 768
            ? <>
              <h3 className={'patterns__filter_title'}>{'Фильтр'}</h3>
              <Dropdown props={dropdown} onActiveChange={onChangeLevel} activeId={activeId}/>
              {/*<button className={'patterns__filter_button'} onClick={}>*/}
              {/*  {'Показать'}*/}
              {/*</button>*/}
            </>
            : <button className={'patterns__filter_button'} onClick={() => setOpen(true)}>
              {'Фильтр'}
            </button>
          }
        </div>
        {items.length > 0
          ? <Patterns props={items}/>
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
