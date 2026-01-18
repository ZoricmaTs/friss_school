import {useState} from 'react';
import {useScrollHider} from '../../hooks/scroll-observer.ts';
import {ArrowRightIcon, CaretLeftIcon, CaretRightIcon} from '@phosphor-icons/react';
import {Modal} from '../modal';

export interface CarouselItem {
  id: string,
  name: string,
  text: string,
  date?: string,
}

// eslint-disable-next-line react-refresh/only-export-components
export const reviewsCarousel: CarouselItem[] = [
  {
    id: 'review-0',
    name: 'Бекнур Жумакадыров',
    date: '16.11.2024',
    text: 'Курсы кройки и шитья стали для меня настоящим открытием. В уютной атмосфере преподаватели не только делились ' +
      'своими профессиональными знаниями, но и вдохновляли на творчество. Каждое занятие было продуманным и интересным, ' +
      'а внимание к деталям помогло мне обрести уверенность в работе с тканями. Спасибо за терпение, поддержку и возможность воплотить мечты в реальность!'
  },
  {
    id: 'review-1',
    name: 'J Gasangusenova',
    date: '18.11.2024',
    text: 'Огромная благодарность прекрасным учителям, научили шить, кроить, моделировать, и все это в самой прекрасной, дружеской атмосфере. ' +
      'Ольга Борисовна, спасибо, вы замечательный учитель!💞💞'
  },
  {
    id: 'review-2',
    name: 'City Spirit',
    date: '04.07.2024',
    text: 'Обучалась в этой школе. Хорошая подача материала и всего три ученицы в группе. Индивидуальный подход и приятная атмосфера для обучения' +
      '. Сшила юбку себе и дочке,пиджак и брюки. Пойду на продолжение-конструкторский курс.'
  },
  {
    id: 'review-3',
    name: 'Sofa S',
    date: '04.07.2024',
    text: 'Прошла курс конструирование очень довольна результатом всем советую учителю большое спасибо объясняет очень понятно'
  },
  {
    id: 'review-4',
    name: 'Людвига Коновалова',
    date: '15.02.2022',
    text: 'В этом месте реализуются все мечты . Теперь я создаю свой гардероб сама!'
  },
  {
    id: 'review-5',
    name: 'Нурила Джусупова',
    date: '11.11.2024',
    text: 'Сегодня я закончила курсы Кройки и шитья у Ольгы Борисовны,пришла с нуля. И я очень рада, что выбрала именно Вас! Научили шить, кроить, моделировать.\n' +
      'Ольга Борисовна организовала отличную школу, все четко, конкретно,доступно и понятно.\n' +
      'Огромное спасибо преподавателям, Ольге Борисовне и Татьяне Витальевне! Процветания и Успехов вашей школе!\n' +
      'Планирую продолжить обучение.'
  }
];

export function CarouselReviews({items}: {items: CarouselItem[]}) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(3);
  const rootRef = useScrollHider<HTMLDivElement>();

  const onPressReview = ({index}: {index: number}) => {
    setActiveIndex(index);
    setOpen(true);
  }

  return <section className={'section-review'}>
    <div className={'carousel-review'} ref={rootRef}>
    <div className={'carousel-review__wrapper'} style={{width: `calc(${50 * (items.length)}vh + ${10 * (items.length -1)}px)`, left: `calc(50vw - ${50 * activeIndex + 25}vh - ${10 * activeIndex}px)`}}>
      {items.map((item, index) => {
        return <div
          className={`carousel-review__item ${activeIndex == index ? '_active' : ''}`}
          onClick={() => onPressReview({index})}
          key={`review-${index}`}
        >
          <h4>{item.name}</h4>
          {item.date && <small>{item.date}</small>}
          <p style={{marginTop: '0.75rem'}}>{item.text}</p>
          <button className={'carousel-review__button'}>
            <p style={{paddingRight: '0.5rem'}}>{'Подробнее'}</p><ArrowRightIcon size={24} className={'carousel-review__button_icon'}/>
          </button>
        </div>
      })}
    </div>

    {activeIndex !== items.length - 1 && <div className={"carousel-review__arrow arrow-right"}>
      <CaretRightIcon size={60} onClick={() => {
        if (items.length == activeIndex + 1) {
          return;
        }
        setActiveIndex(activeIndex + 1);

      }}/>
    </div>}
    {activeIndex !== 0 && <div className={"carousel-review__arrow arrow-left"}>
      <CaretLeftIcon size={60} onClick={() => {
        if (0 == activeIndex) {
          return;
        }
        setActiveIndex(activeIndex - 1);
      }}/>
    </div>}
  </div>
    <Modal open={open} onClose={() => setOpen(false)} title={'Отзыв'}>
      <h3 className={'review-modal__title'}>{items[activeIndex].name}</h3>
      {items[activeIndex].date && <small className={'review-modal__date'}>{items[activeIndex].date}</small>}
      <p className={'review-modal__description'}>{items[activeIndex].text}</p>
    </Modal>
  </section>;
}