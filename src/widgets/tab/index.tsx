import './style.scss';
import {type ReactNode, useState} from 'react';

type Tab = {
  label: string;
  content: ReactNode;
};

type Props = {
  tabs: Tab[];
};

export function TabsWidget({ tabs }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className={'tab'}>
      <div className={'tab__btn-wrapper'} style={{display: "flex", gap: "8px"}}>
        {tabs.map((t, index) => (
          <button className={`tab__btn ${index === active ? '_active' : ''}`} key={index} onClick={() => setActive(index)}>
            <p>{t.label}</p>
          </button>
        ))}
      </div>

      <div style={{marginTop: "20px"}}>{tabs[active].content}</div>
    </div>
  );
}