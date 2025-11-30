import './style.scss'
import {useLayoutEffect, useRef, useState} from 'react';
import {CaretDownIcon, CaretUpIcon} from '@phosphor-icons/react';
import {useScrollHider} from '../../hooks/scroll-observer.ts';

export interface AccordionType {
  id: number,
  question: string,
  answer: string,
}

const accordions: AccordionType[] = [
  {
    id: 0,
    question: 'Нужна ли швейная машинка для прохождения курсов кроя и шитья?',
    answer: 'Нет, не обязательно. Вы будете учиться на нашем оборудовании'
  },
  {
    id: 1,
    question: 'Смогу ли я отработать пропущенные занятия по крою и шитью?',
    answer: 'выаыв'
  },
  {
    id: 2,
    question: 'Как записаться на пробное занятие?',
    answer: 'Вы можете оставить заявку на сайте или связаться с нами по телефону: +996 504 362 514 (звонок, WhatsApp, Telegram).'
  },
  {
    id: 3,
    question: 'Что нужно иметь для прохождения курса?',
    answer: 'Всё необходимое оборудование и инструменты для шитья есть в школе. Вам нужно будет приобрести только ткани и фурнитуру для ваших изделий' +
      '. Но до начала курса ничего покупать не нужно — преподаватели подробно расскажут, что понадобится, уже на первых занятиях.'
  },
  {
    id: 4,
    question: 'Где посмотреть расписание занятий в школе кроя и шитья?',
    answer: 'У нас регулярно формируются новые группы. Мы поможем подобрать удобное расписание обучения (утренние, дневные или' +
      'вечерние группы). Занятия проходят три раза в неделю (пн-ср-пт или вт-чт-сб) по 3 часа (9:00-12:00, 13:00-16:00 или 16:00-19:00). ' +
      'Чтобы записаться, вы можете оставить заявку, связазавшись с нами по телефону: +996 504 362 514 (звонок, WhatsApp, Telegram)'
  },
  {
    id: 4,
    question: 'Где посмотреть расписание занятий в школе кроя и шитья?',
    answer: 'У нас регулярно формируются новые группы. Каждое занятие длится 3 часа и мы поможем подобрать удобное расписание обучения: ' +
      'утренние (9:00-12:00), дневные (13:00-16:00) или вечерние (16:00-19:00) группы. Занятия проходят три раза в неделю (пн-ср-пт или вт-чт-сб). ' +
      'Записаться можно по номеру телефона: +996 504 362 514 (звонок, WhatsApp, Telegram)'
  },
]

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
  return <section>
    {accordions.map((item: AccordionType, index: number) => <Accordion item={item} key={`accordion-${index}`}/>)}
  </section>
}