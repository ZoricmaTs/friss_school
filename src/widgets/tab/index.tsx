import './style.scss';
import {type ReactNode, useLayoutEffect, useRef, useState} from 'react';
import {useScrollHider} from '../../hooks/scroll-observer.ts';
import {SpinnerIcon} from '@phosphor-icons/react';
import {useDynamicStoreStore} from '../../providers/dynamicStore.ts';

export type Tab = {
  label: string;
  content: ReactNode;
};

type Props = {
  tabs: Tab[];
  initialIndex: number
};

export function TabsWidget({tabs, initialIndex}: Props) {
  const dynamicStore = useDynamicStoreStore();
  const rootRef = useScrollHider<HTMLDivElement>();
  const tabsWrapper = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(initialIndex);

  useLayoutEffect(() => {
    if (!tabs.length) {
      return;
    }
    tabsWrapper.current!.scrollTo({
      left: (tabsWrapper.current!.children[initialIndex] as HTMLButtonElement).offsetLeft - tabsWrapper.current!.getBoundingClientRect().left,
    })
  }, [initialIndex, tabs.length]);

  if (!tabs.length) {
    return <div/>
  }

  return (
    <div className={'tab'} ref={rootRef}>
      {!dynamicStore.isSaved &&
        <button className={'tab__pub-btn'} onClick={() => {
          if (dynamicStore.isSaving) {
            return;
          }

          dynamicStore.publish().catch(null);
        }}>
          <p>{'Опубликовать изменения'}</p> {dynamicStore.isSaving && <SpinnerIcon size={20}/>}
        </button>
      }

      <div className={'tab__btn-wrapper'} ref={tabsWrapper}>
        {tabs.map((t, index) => (
          <button className={`tab__btn ${index === active ? '_active' : ''}`} key={index}
                  onClick={() => setActive(index)}>
            <p>{t.label}</p>
          </button>
        ))}
      </div>

      <div className={'tab__content-wrapper'}>{tabs[active].content}</div>
    </div>
  );
}