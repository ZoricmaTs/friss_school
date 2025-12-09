import './style.scss';
import {ArrowRightIcon} from '@phosphor-icons/react';
import {useScrollHider} from '../../hooks/scroll-observer.ts';
import {useNavigate} from '@tanstack/react-router';

export interface CourseType {
  id: number,
  title: string,
  objective?: string,
  description: string,
  img?: string,
  duration: string,
  result?: string,
  price: string,
  prev: string,
}

// eslint-disable-next-line react-refresh/only-export-components
export const courses: CourseType[] = [
  {
    id: 0,
    title: 'Курс «Нулевой практический»',
    prev: 'В рамках курса вы познакомитесь со швейным оборудованием. Изучите швы, освоите разные виды обработки деталей',
    objective: 'Научиться основам шитья и обработке деталей одежды.',
    description: 'Обработка воротников, карманов, манжет, планок, рюшей, клапанов, шлевок,' +
      ' гульфиков в разных вариантах. Работа на 4 видах оборудования (прямострочка, оверлок, распошив, закрутка).',
    duration: '5 недель',
    price: '13 000 сом',
    img: '/friss_school/images/courses/photo_2025-11-19_12-12-09.jpg'
  },
  {
    id: 1,
    title: 'Курс «Портной с нуля» (Продолжающий)',
    prev: 'На курсе вы научитесь построению, моделированию и пошиву вещей по своим меркам',
    objective: 'Создание одежды по своим меркам.',
    description: 'Построение лекал по своим размерам, моделирование. Применение навыков с первого курса для' +
      ' сборки изделия (обработка краёв, сборка плечевых, боковых и шаговых швов).',
    result: 'Готовая одежда, сшитая своими руками',
    duration: '2 месяца',
    price: '13 000 сом/месяц',
    img: '/friss_school/images/courses/photo_2025-11-19_12-12-14.jpg'
  },
  {
    id: 2,
    prev: 'Интенсивная программа, в которой вы научитесь профессионально конструировать и моделировать юбки,' +
      ' брюки и плечевые изделия.',
    title: 'Курс «Конструктор-модельер» (Ускоренный)',
    description: 'Конструирование и моделирование юбок, брюк, плечевых изделий',
    duration: '5 недель',
    price: '20 000 сом',
    img: '/friss_school/images/courses/photo_2025-11-19_12-28-24.jpg'
  },
  {
    id: 3,
    prev: 'Глубокая и подробная программа по конструированию и моделированию одежды',
    title: 'Курс «Конструктор-модельер» (Полный)',
    description: 'Глубокое изучение конструирования и моделирования одежды с обязательным пошивом макетов на свой размер с учетом индивидуальных особенностей.',
    duration: '4 месяца',
    price: '15 000 сом/месяц',
    img: '/friss_school/images/courses/photo_2025-11-20_01-17-29.jpg'
  },
]

export function Courses() {
  const rootRef = useScrollHider<HTMLDivElement>();
  const navigate = useNavigate();

  return <section style={{padding: '2.5rem'}} className={'courses-section'} ref={rootRef}>
    {courses.map((course: CourseType, index: number) => {
      return <div className={'course'} key={`course-${index}`} onClick={() => navigate({to: '/courses/$index', params: {index: `${index}`}})}>
        <div className={'course__image-container'}>
          <div className={'course__image-cover'}></div>
          <div className={'course__image'} style={{backgroundImage: `url(${course.img})`}} />
        </div>

        <div className={'course__info-container'}>
          <div>
            <h3 className={'course__title'}>{course.title}</h3>
            <p className={'course__prev'}>{course.prev}</p>
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
}