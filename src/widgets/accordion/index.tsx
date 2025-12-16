import './style.scss'
import {useLayoutEffect, useRef, useState} from 'react';
import {CaretDownIcon, CaretUpIcon} from '@phosphor-icons/react';
import {useScrollHider} from '../../hooks/scroll-observer.ts';
import useSheetData from '../../hooks/useSheetData.ts';

export interface AccordionType {
  id: number,
  question: string,
  answer: string,
}

export function Accordion({item}: {item: AccordionType} ) {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const innerRef = useRef<HTMLDivElement>(null);
  const rootRef = useScrollHider<HTMLDivElement>();

  const toggle = () => {
    setOpen(prev => !prev);
  };

  useLayoutEffect(() => {
    const element = innerRef.current;
    if (!element) {
      return;
    }

    const target = open ? element.scrollHeight : 0;

    requestAnimationFrame(() => {
      setHeight(target);
    });
  }, [open]);

  return (
    <div className="accordion" ref={rootRef}>
      <button className="accordion__header" onClick={toggle}>
        {open
          ? <CaretUpIcon size={32} />
          : <CaretDownIcon size={32} />
        }
        <p className="accordion__header_title">{item.question}</p>
      </button>

      <div
        className="accordion__content"
        style={{maxHeight: height + 'px'}}
      >
        <div ref={innerRef} className="accordion__inner">{item.answer}</div>
      </div>
    </div>
  );
}

export default function Accordions() {
  const data = useSheetData(0) as unknown as AccordionType[];

  return <section>
    {data.map((item: AccordionType, index: number) => <Accordion item={item} key={`accordion-${index}`}/>)}
  </section>
}