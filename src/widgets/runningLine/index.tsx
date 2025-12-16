import './style.scss';
import {ScissorsIcon} from '@phosphor-icons/react';
import {useScrollHider} from '../../hooks/scroll-observer.ts';
import useSheetData from '../../hooks/useSheetData.ts';

export type LineType = {
  id: number,
  text: string
}

export function RunningLine() {
  const rootRef = useScrollHider<HTMLDivElement>();
  const data = useSheetData(1124678627) as unknown as LineType [];

  return <div className={'running-line'} ref={rootRef}>
    <div className={'running-line__inner'}>
      <div
        className={'running-line__items'}
      >
        {data.map((line, index: number) => {
          return <div className={'running-line__item'} key={`line-first_${index}`}>
            <ScissorsIcon size={80}/>
            <h1 style={{marginRight: '3rem', marginLeft: '3rem', fontWeight: 500}}>{line.text}</h1>
          </div>
        })}
        {data.map((line, index: number) => {
          return <div className={'running-line__item'} key={`line-second_${index}`}>
            <ScissorsIcon size={80}/>
            <h1 style={{marginRight: '3rem', marginLeft: '3rem', fontWeight: 500}}>{line.text}</h1>
          </div>
        })}
      </div>
    </div>
  </div>;
}