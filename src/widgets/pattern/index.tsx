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

export function getLevels() {
  return [
    {
      id: 0,
      value: 'Все',
    },
    {
      id: 1,
      value: 'Для новичков',
    },
    {
      id: 2,
      value: 'Просто',
    },
    {
      id: 3,
      value: 'Требует опыта',
    },
    {
      id: 4,
      value: 'Сложная работа',
    },
    {
      id: 5,
      value: 'Мастерский уровень',
    },
  ];
}

export function Pattern({props}: {props: PatternType}) {
  const levels = getLevels().filter((item) => item.id !== 0);
  const priceWithSales: CSSProperties = {
    textDecoration: 'line-through',
    textDecorationColor: '#f04343',
    textDecorationThickness: '2px'
  }

  return <a
    className={'pattern'}
    href={'https://api.whatsapp.com/send/?phone=996504362514&text&type=phone_number&app_absent=0&utm_source=ig'}
    target="_blank"
    rel="noopener noreferrer"
  >
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
      <div className={'pattern__level-wrapper'}>
        <small>{'Сложность: '}</small>
        <div className={'pattern__level'}>
          {levels.map((item: {id: number, value: string}) => {
            return <LevelIcon className={`pattern__level${item.id <= props.level ? ' active' : ''}`} size={25}/>
          })}
        </div>
      </div>
      <div
        className={'pattern__button'}
      >
        <p>{'Купить'}</p>
      </div>
    </div>
  </a>;
}

export function Patterns({props}: {props: PatternType[]}) {
  const rootRef = useScrollHider<HTMLDivElement>();

  return <section className={'patterns__list'} ref={rootRef}>
    {props.map((item) => {
      return <Pattern props={item}/>
    })}
  </section>
}