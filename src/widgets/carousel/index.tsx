import {useState} from 'react';
import {CaretLeftIcon, CaretRightIcon} from '@phosphor-icons/react';
import './style.scss';
import {useScrollHider} from '../../hooks/scroll-observer.ts';

// eslint-disable-next-line react-refresh/only-export-components
export const imagesCarousel: string[] = [
  'photo_2025-11-29_16-43-55.jpg', 'photo_2025-11-29_16-44-21.jpg', 'photo_2025-11-29_16-44-26.jpg', 'photo_2025-11-29_16-44-35.jpg', 'photo_2025-11-29_16-44-41.jpg',
  'photo_2025-11-29_16-44-46.jpg', 'photo_2025-11-29_16-44-52.jpg', 'photo_2025-11-29_16-45-01.jpg', 'photo_2025-11-29_16-45-06.jpg', 'photo_2025-11-29_16-45-11.jpg',
  'photo_2025-11-29_16-45-15.jpg', 'photo_2025-11-29_16-45-21.jpg', 'photo_2025-11-29_16-45-24.jpg', 'photo_2025-11-29_16-45-30.jpg', 'photo_2025-11-29_16-45-34.jpg',
  'photo_2025-11-29_16-45-38.jpg', 'photo_2025-11-29_16-45-42.jpg', 'photo_2025-11-29_16-45-48.jpg', 'photo_2025-11-29_16-45-55.jpg', 'photo_2025-11-29_16-45-58.jpg',
  'photo_2025-11-29_16-46-02.jpg', 'photo_2025-11-29_16-46-07.jpg', 'photo_2025-11-29_16-46-11.jpg', 'photo_2025-11-29_16-46-15.jpg', 'photo_2025-11-29_16-46-19.jpg',
  'photo_2025-11-29_16-46-27.jpg', 'photo_2025-11-29_16-46-32.jpg', 'photo_2025-11-29_16-46-37.jpg'
];

export function Carousel({items}: {items: string[]}) {
  const [activeIndex, setActiveIndex] = useState(7);
  const rootRef = useScrollHider<HTMLDivElement>();

  return <div className={'carousel'} ref={rootRef}>
    <div className={'carousel__wrapper'} style={{width: `${25 * (items.length + 1)}vh`, left: `calc(50vw - ${25*activeIndex + 25}vh)`}}>
      {items.map((item, index) => {
        return <div
          className={`carousel__item ${activeIndex == index ? '_active' : ''}`}
          style={{backgroundImage: `url(images/students/${item})`, backgroundPosition: 'center', backgroundSize: 'cover'}}
        >
        </div>
      })}
    </div>
    {activeIndex !== items.length - 1 && <div className={"carousel__arrow"} style={{position: 'absolute', right: 20, top: '50%'}}>
      <CaretRightIcon size={60} onClick={() => {
        if (items.length == activeIndex + 1) {
          return;
        }
        setActiveIndex(activeIndex + 1);

      }}/>
    </div>}
    {activeIndex !== 0 && <div className={"carousel__arrow"} style={{position: 'absolute', left: 20, top: '50%'}}>
      <CaretLeftIcon size={60} onClick={() => {
        if (0 == activeIndex) {
          return;
        }
        setActiveIndex(activeIndex - 1);

      }}/>
    </div>}
  </div>
}