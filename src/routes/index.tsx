import {createFileRoute} from '@tanstack/react-router';
import {VideoSection} from '../widgets/video';
import {Separator} from '../widgets/separator';
import {Courses} from '../widgets/courses';
import {Carousel, imagesCarousel} from '../widgets/carousel';
import {CarouselReviews, reviewsCarousel} from '../widgets/carousel/reviews.tsx';
import Accordions from '../widgets/accordion';
import {Contacts} from '../widgets/contacts';

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return <>
    <VideoSection/>
    <div className={'brush__container'}>
      <img className={'brush'} src={'/friss_school/images/4.svg'}/>
    </div>
    <Separator title={'Оффлайн обучение'}>
      <p style={{
        color: 'var(--text-additional-color)',
        fontFamily: 'serif',
        letterSpacing: '0.2rem',
        whiteSpace: 'nowrap',
      }}>{'в FRISS SCHOOL'}</p>
    </Separator>
    <Courses/>
    <Separator title={'Галерея'}/>
    <Carousel items={imagesCarousel}/>
    <Separator title={'Отзывы'} id={'reviews-view'}/>
    <CarouselReviews items={reviewsCarousel}/>
    <Separator title={'Вопросы и ответы'} id={'accordions-view'}/>
    <Accordions/>
    <Separator title={'Контакты'} id={'contacts-view'}/>
    <Contacts/>
  </>
}