import {useState} from 'react';
import {CaretLeftIcon, CaretRightIcon} from '@phosphor-icons/react';
import './style.scss';
import {useScrollHider} from '../../hooks/scroll-observer.ts';

export function Carousel({items}: {items: string[]}) {
  const [activeIndex, setActiveIndex] = useState(7);
  const rootRef = useScrollHider<HTMLDivElement>();

  return <div className={'carousel'} ref={rootRef}>
    <div className={'carousel__wrapper'} style={{width: `${25 * (items.length + 1)}vh`, left: `calc(50vw - ${25*activeIndex + 25}vh)`}}>
      {items.map((item, index) => {
        return <div
          className={`carousel__item ${activeIndex == index ? '_active' : ''}`}
          style={{backgroundImage: `url(/dynamic/images/${item})`, backgroundPosition: 'center', backgroundSize: 'cover'}}
          onClick={() => setActiveIndex(index)}
          key={`carousel-item-${index}`}
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
  </div>;
}