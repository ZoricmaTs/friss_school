import './style.scss';
import {type ReactNode, useLayoutEffect, useRef, useState} from 'react';
import {CaretLeftIcon, CaretRightIcon} from '@phosphor-icons/react';

type Tab = {
  label: string;
  content: ReactNode;
};

type Props = {
  tabs: Tab[];
  initialIndex: number
};

export function TabsWidget({ tabs, initialIndex }: Props) {
  const tabsWrapper = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(initialIndex);

  useLayoutEffect(() => {
    tabsWrapper.current!.scrollTo({
      left: (tabsWrapper.current!.children[initialIndex] as HTMLButtonElement).offsetLeft - tabsWrapper.current!.getBoundingClientRect().left
    })
  }, [initialIndex]);

  return (
    <div className={'tab'}>
      <button className={'tab__btn-arrow _right'}>
        <CaretRightIcon size={40} onClick={() => {
          if (tabsWrapper.current) {
            tabsWrapper.current.scrollTo({
              left: tabsWrapper.current.scrollLeft + 100,
              behavior: 'smooth'
            })
          }

        }}/>
      </button>
      <button className={'tab__btn-arrow _left'}>
        <CaretLeftIcon size={40} onClick={() => {
          if (tabsWrapper.current) {
            tabsWrapper.current.scrollTo({
              left: tabsWrapper.current.scrollLeft - 100,
              behavior: 'smooth'
            })
          }
        }}/>
      </button>
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