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