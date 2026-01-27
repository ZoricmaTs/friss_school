import {createFileRoute} from '@tanstack/react-router';
import {VideoSection} from '../widgets/video';
import {Separator} from '../widgets/separator';
import {Courses} from '../widgets/courses';
import {Carousel} from '../widgets/carousel';
import {CarouselReviews, reviewsCarousel} from '../widgets/carousel/reviews.tsx';
import Accordions from '../widgets/accordion';
import {Contacts} from '../widgets/contacts';
import {Footer} from '../widgets/footer';
import {RunningLine} from '../widgets/runningLine';
import {VideoCourse} from '../widgets/videoCourse';
import {useDynamicStoreStore} from '../providers/dynamicStore.ts';

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const dynamicStore = useDynamicStoreStore();

  return <>
    <VideoSection/>
    <div className={'brush__container'}>
      <img className={'brush'} src={'/images/4.svg'} alt={'background'}/>
    </div>
    <div className={'brush-course__container'} style={{top: 860}}>
      <img className={'brush-course'} src={'/images/4.svg'} alt={'background'}/>
    </div>
    {dynamicStore.courses.length > 0 &&
      <Separator title={'Оффлайн обучение'}>
        <p style={{
          color: 'var(--text-additional-color)',
          fontFamily: 'serif',
          letterSpacing: '0.2rem',
          whiteSpace: 'nowrap',
        }}>{'в FRISS SCHOOL'}</p>
      </Separator>
    }
    <RunningLine/>
    {dynamicStore.courses.length > 0 && <Courses/>}
    <Separator title={'Видео-курсы'} id={'video-view'}/>
    <VideoCourse/>
    {dynamicStore.galleryImages.length > 0 &&
      <>
        <Separator title={'Галерея'}/>
        <Carousel items={dynamicStore.galleryImages}/>
      </>
    }

    <Separator title={'Отзывы'} id={'reviews-view'}/>
    <CarouselReviews items={reviewsCarousel}/>
    <Separator title={'Вопросы и ответы'} id={'accordions-view'}/>
    <Accordions/>
    <Separator title={'Контакты'} id={'contacts-view'}/>
    <Contacts/>
    <Footer/>
  </>
}