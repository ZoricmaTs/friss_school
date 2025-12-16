import './style.scss';
import {type ReactNode, useLayoutEffect, useRef, useState} from 'react';
import {useScrollHider} from '../../hooks/scroll-observer.ts';

type Tab = {
  label: string;
  content: ReactNode;
};

type Props = {
  tabs: Tab[];
  initialIndex: number
};

export function TabsWidget({ tabs, initialIndex }: Props) {
  const rootRef = useScrollHider<HTMLDivElement>();
  const tabsWrapper = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(initialIndex);

  useLayoutEffect(() => {
    if(!tabs.length) {
      return;
    }
    tabsWrapper.current!.scrollTo({
      left: (tabsWrapper.current!.children[initialIndex] as HTMLButtonElement).offsetLeft - tabsWrapper.current!.getBoundingClientRect().left
    })
  }, [initialIndex, tabs.length]);

  if(!tabs.length){
    return <div/>   
  }

  return (
    <div className={'tab'} ref={rootRef}>
      <div className={'tab__btn-wrapper'} ref={tabsWrapper}>
        {tabs.map((t, index) => (
          <button className={`tab__btn ${index === active ? '_active' : ''}`} key={index} onClick={() => setActive(index)}>
            <p>{t.label}</p>
          </button>
        ))}
      </div>

      <div className={'tab__content-wrapper'}>{tabs[active].content}</div>
    </div>
  );
}