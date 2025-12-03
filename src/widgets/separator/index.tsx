import './style.scss'
import {useScrollHider} from '../../hooks/scroll-observer.ts';
import type {ReactNode} from 'react';

export function Separator({title, children, id}: {title: string, children?: ReactNode, id?: string}) {
  const rootRef = useScrollHider<HTMLDivElement>();

  return <div className={'separator'} ref={rootRef} id={id}>
    <h2 style={{color: 'var(--text-color)'}}>{title}</h2>
    {children}
  </div>
}