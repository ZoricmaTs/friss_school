import './style.scss';
import {LevelIcon} from './button.tsx';
import {useScrollHider} from '../../hooks/scroll-observer.ts';
import type {CSSProperties} from 'react';

// export enum PatternSizes {
//   XS = 'xs',
//   S = 's',
//   M = 'm',
//   L = 'l',
// }

export type PatternType = {
  id: number,
  title: string,
  image?: string
  price: number,
  salePrice?: number,
  sizes: string[],
  level: number,
}

export function Pattern({props}: {props: PatternType}) {
  console.log('props', props)
  const priceWithSales: CSSProperties = {
    textDecoration: 'line-through',
    textDecorationColor: '#f04343',
    textDecorationThickness: '2px'
  }

  return <div className={'pattern'}>
    <div className={'pattern__image-wrapper'}>
      <div className={'pattern__image'} style={{backgroundImage: `url(${props.image})`}}></div>
    </div>
    <div className={'pattern__info-wrapper'}>
      <p className={'pattern__title'}>{props.title}</p>
      <div className={'pattern__price-wrapper'}>
        <small>{'Цена: '}</small>

        {props.price > 0 &&
          <h4
            className={'pattern__price'}
            style={props.salePrice && props.salePrice > 0 ? priceWithSales : {}}
          >
            {`${props.price} ⃀`}
          </h4>
        }

        {props.salePrice &&
          <h4
            className={'pattern__sale-price'}
          >
            {`${props.salePrice} ⃀`}
          </h4>
        }
        {props.price === 0 && <div className={'pattern__free'}><p>{'бесплатно'}</p></div>}
      </div>
      <div className={'pattern__price-wrapper'}>
        <small>{'Сложность: '}</small>
        <div className={'pattern__level'}>
          {Array.from({ length: 5 }).map((_item: unknown, index: number) => {
            return <LevelIcon className={`pattern__level${index + 1 <= props.level ? ' active' : ''}`} size={25}/>
          })}
        </div>
      </div>
      <a
        className={'pattern__button'}
        href={'https://api.whatsapp.com/send/?phone=996504362514&text&type=phone_number&app_absent=0&utm_source=ig'}
        target="_blank"
        rel="noopener noreferrer"
      >
        <p>{'Купить'}</p>
      </a>
    </div>
  </div>;
}

export function Patterns() {
  const items = [
    {
      id: 0,
      title: 'юбка-шорты 1 вариант юбка-шорты 1 вариант юбка-шорты 1 вариантюбка-шорты 1 вариант',
      price: 200,
      salePrice: 180,
      sizes: ['xs', 's', 'm', 'l'],
      level: 3,
      image: '/friss_school/images/patterns/photo_2025-12-23_11-23-42.jpg',
    },
    {
      id: 1,
      title: 'юбка-шорты 2 вариант',
      price: 0,
      sizes: ['xs', 's', 'm', 'l'],
      level: 2,
      image: '/friss_school/images/patterns/photo_2025-12-22_19-53-38.jpg',
    },
    {
      id: 2,
      title: 'юбка-шорты 3 вариант',
      price: 200,
      sizes: ['xs', 's', 'm', 'l'],
      level: 3,
      image: '/friss_school/images/patterns/photo_2025-12-22_19-53-56.jpg',
    }
  ];

  const rootRef = useScrollHider<HTMLDivElement>();

  return <section className={'patterns__list'} ref={rootRef}>
    {items.map((item) => {
      return <Pattern props={item}/>
    })}
  </section>
}