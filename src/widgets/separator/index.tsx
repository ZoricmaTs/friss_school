import './style.scss';
import {useScrollHider} from '../../hooks/scroll-observer.ts';
import type {CSSProperties, ReactNode} from 'react';

export function Separator({title, children, id, className, style}: {title: string, children?: ReactNode, id?: string, className?: string, style?: CSSProperties}) {
  const rootRef = useScrollHider<HTMLDivElement>();
  const classNames = className ? className + ' separator' : 'separator';

  return <div className={classNames} ref={rootRef} id={id} style={style}>
    <h2 style={{color: 'var(--text-color)'}}>{title}</h2>
    {children}
  </div>
}