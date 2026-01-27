import './style.scss';
import {ArrowRightIcon} from '@phosphor-icons/react';
import {useScrollHider} from '../../hooks/scroll-observer.ts';
import {useNavigate} from '@tanstack/react-router';
import {useDynamicStoreStore} from '../../providers/dynamicStore.ts';
import {useScreen} from '../../hooks/useScreen.ts';

export interface CourseType {
  id: number,
  title: string,
  description: string,
  image?: string,
  duration: string,
  price: string,
  preview: string,
}

// // eslint-disable-next-line react-refresh/only-export-components
// export const courses: CourseType[] = [
//   {
//     id: 0,
//     title: 'Курс «Нулевой практический»',
//     preview: 'Вся одежда это плечевой и боковой шов. А это просто прямые швы. Остальное - узлы и детали: воротники, карманы, планки, шлица ,гульфик, манжеты , обтачкии. Поэтому с этого начинается обучение.\n',
//     description: 'Здесь вы научитесь шить и обрабатывать детали и узлы одежды — воротники, карманы, манжеты, планки, рюшки, клапана, шлевки, гульфики. И всё это👉 в разных вариантах.️ Вы приобретёте навыки работы на 4 видах производственного швейного оборудования — прямострочка, оверлок, распошив и закрутка. Длительность пять недель, занятия проходят три раза в неделю по три часа.',
//     duration: '5 недель',
//     price: '15 000 сом',
//     image: '/images/courses/photo_2025-11-19_12-12-09.jpg'
//   },
//   {
//     id: 1,
//     title: 'Курс «Портной с нуля» (Продолжающий)',
//     preview: 'Обучаем создавать лекала, делать крой и красиво, аккуратно  шить одежду по своим меркам с идеальной посадкой',
//     description: 'Построение лекал по своим размерам, моделирование. Применение навыков с первого курса для сборки изделия (обработка краёв, сборка плечевых, боковых и шаговых швов).  Длительность 2 месяца, занятия проходят три раза в неделю по три часа.',
//     duration: '2 месяца',
//     price: '15 000 сом/месяц',
//     image: '/images/courses/photo_2025-11-19_12-12-14.jpg'
//   },
//   {
//     id: 2,
//     preview: 'Интенсивная программа, в которой вы научитесь профессионально конструировать и моделировать юбки, брюки и плечевые изделия (простой крой и конструктивный) с домашним заданием.',
//     title: 'Курс «Конструктор-модельер» (Ускоренный)',
//     description: 'Построение лекал по своим размерам, моделирование юбок, брюк, плечевых изделий (простой крой и конструктивный) с домашним заданием. ' +
//       'Применение навыков с первого курса для сборки изделия (обработка краёв, сборка плечевых, боковых и шаговых швов). Длительность пять недель, занятия проходят три раза в неделю по три часа.',
//     duration: '5 недель',
//     price: '25 000 сом',
//     image: '/images/courses/photo_2025-11-19_12-28-24.jpg'
//   },
//   {
//     id: 3,
//     preview: '4-х месячный курс без домашнего задания (отрабатываем вместе). ' +
//       'В программе построение базовой конструкции,корректировка и потом моделирование. Все это в натуральную величину и с пошивом макетов.',
//     title: 'Курс «Конструктор-модельер» (Полный)',
//     description: 'Отработка конструирования и моделирования одежды с обязательным пошивом макетов. Все модели создаются на свой размер, учитывая индивидуальные особенности.\n' +
//       'В программе: юбка, брюки и плечевые изделия.\n' +
//       'Весь расходный материал предоставляется. Длительность 4 месяца, занятия проходят три раза в неделю по три часа.\n',
//     duration: '4 месяца',
//     price: '20 000 сом/месяц',
//     image: '/images/courses/photo_2025-11-20_01-17-29.jpg'
//   },
// ]

export function Courses() {
  const rootRef = useScrollHider<HTMLDivElement>();
  const navigate = useNavigate();
  const courses= useDynamicStoreStore().courses;
  const {width} = useScreen();
  const styleGridColumns = width < 1500 || courses.length === 1 ? `repeat(1, 1fr)` : `repeat(2, 1fr)`;

  return courses.length > 0
    ? <section className={'courses-section'} ref={rootRef} style={{gridTemplateColumns: styleGridColumns}}>
        {courses.map((course, index: number) => {
          return <div
            className={'course'}
            key={`course-${index}`}
            onClick={() => navigate({to: '/courses/$index', params: {index: `${index}`}})}
          >
            <div className={'course__image-container'}>
              <div className={'course__image-cover'}></div>
              <div className={'course__image'} style={{backgroundImage: `url(/dynamic/images/${courses[index].image})`}} />
            </div>

            <div className={'course__info-container'}>
              <div>
                <h3 className={'course__title'}>{course.title}</h3>
                <p className={'course__prev'}>{course.preview}</p>
              </div>

              <div className={'course__price-container'}>
                <div>
                  <small className={'course__duration'}>{course.duration}</small>
                  <h3 className={'course__price'}>{course.price}</h3>
                </div>
                <a className={'course__button'}>
                  <p style={{paddingRight: '0.5rem'}}>{'Подробнее'}</p><ArrowRightIcon size={24} className={'course__button_icon'}/>
                </a>
              </div>
            </div>

          </div>
        })}
      </section>
    : <div></div>;
}