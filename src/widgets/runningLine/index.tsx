import './style.scss';
import {ScissorsIcon} from '@phosphor-icons/react';
import {useScrollHider} from '../../hooks/scroll-observer.ts';
import {useScreen} from '../../hooks/useScreen.ts';

export type LineType = {
  id: number,
  text: string
}

export function RunningLine() {
  const rootRef = useScrollHider<HTMLDivElement>();
  const lines: LineType [] = [
    {
      id: 0,
      text: 'курсы кроя и шитья',
    },
    {
      id: 1,
      text: 'не ищи идеальную вещь, сшей ее сам',
    },
    {
      id: 2,
      text: 'friss school',
    }
  ];

  const {width} = useScreen();
  const iconSize: number = width < 1200 ? Math.floor(4 * width / 100) : 50;

  return <div className={'running-line'} ref={rootRef}>
    <div className={'running-line__inner'}>
      <div
        className={'running-line__items'}
      >
        {lines.map((line, index: number) => {
          return <div className={'running-line__item'} key={`line-first_${index}`}>
            <ScissorsIcon size={iconSize}/>
            <h3 className={'running-line__text'}>{line.text}</h3>
          </div>
        })}
        {lines.map((line, index: number) => {
          return <div className={'running-line__item'} key={`line-second_${index}`}>
            <ScissorsIcon size={iconSize}/>
            <h3 className={'running-line__text'}>{line.text}</h3>
          </div>
        })}
      </div>
    </div>
  </div>;
}