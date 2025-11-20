import './style.scss'
import {useScrollHider} from '../../hooks/scroll-observer.ts';

export function Separator() {
  const rootRef = useScrollHider<HTMLDivElement>();

  return <div className={'separator'} ref={rootRef}>
    <h2 style={{color: 'var(--text-color)'}}>{'Оффлайн обучение '}</h2>
    <p style={{color: 'var(--text-additional-color)', fontFamily: 'serif', letterSpacing: '0.2rem', whiteSpace: 'nowrap'}}>{'в FRISS SCHOOL'}</p>
  </div>
}