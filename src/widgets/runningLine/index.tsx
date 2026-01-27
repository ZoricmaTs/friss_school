import './style.scss';
import {ScissorsIcon} from '@phosphor-icons/react';
import {useScrollHider} from '../../hooks/scroll-observer.ts';
import {useScreen} from '../../hooks/useScreen.ts';
import {useDynamicStoreStore} from '../../providers/dynamicStore.ts';

export function RunningLine() {
  const rootRef = useScrollHider<HTMLDivElement>();
  const dynamicStore = useDynamicStoreStore();

  const {width} = useScreen();
  const iconSize: number = width < 1200 ? Math.floor(4 * width / 100) : 50;

  return <div className={'running-line'} ref={rootRef}>
    <div className={'running-line__inner'}>
      <div
        className={'running-line__items'}
      >
        {dynamicStore.runningLines.map((line, index: number) => {
          return <div className={'running-line__item'} key={`line-first_${index}`}>
            <ScissorsIcon size={iconSize}/>
            <h3 className={'running-line__text'}>{line.text}</h3>
          </div>
        })}
        {dynamicStore.runningLines.map((line, index: number) => {
          return <div className={'running-line__item'} key={`line-second_${index}`}>
            <ScissorsIcon size={iconSize}/>
            <h3 className={'running-line__text'}>{line.text}</h3>
          </div>
        })}
      </div>
    </div>
  </div>;
}