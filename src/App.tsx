import {Navbar} from './widgets/navbar';
import {VideoSection} from './widgets/video';
import {Separator} from './widgets/separator';
import {Courses} from './widgets/courses';
import Accordions from './widgets/accordion';
import {Contacts} from './widgets/contacts';
import {WhatsAppWidget} from './widgets/whatsApp';
import {Carousel, imagesCarousel} from './widgets/carousel';

function App() {
  return <div style={{position:'relative', backgroundColor:  'var(--bg-color)', zIndex: 2}}>
    <Navbar/>
    <VideoSection/>
    <div className={'brush__container'} >
      <img className={'brush'} src={'images/4.svg'}/>
    </div>
    <Separator title={'Оффлайн обучение'}>
      <p style={{color: 'var(--text-additional-color)', fontFamily: 'serif', letterSpacing: '0.2rem', whiteSpace: 'nowrap'}}>{'в FRISS SCHOOL'}</p>
    </Separator>
    <Courses/>
    <Separator title={'Галерея'}/>
    <Carousel items={imagesCarousel}/>
    <Separator title={'Вопросы и ответы'}/>
    <Accordions/>
    <Separator title={'Контакты'}/>
    <Contacts/>
    <WhatsAppWidget/>
    {/*<InfoSection/>*/}

    {/*<h1>Главный заголовок</h1>*/}
    {/*<h2>Подзаголовок</h2>*/}
    {/*<h3>Раздел</h3>*/}
    {/*<p>*/}
    {/*  Это пример параграфа текста, который масштабируется автоматически в зависимости от ширины экрана.*/}
    {/*</p>*/}
    {/*<small>Мелкий текст или подпись</small>*/}
  </div>
}

export default App
