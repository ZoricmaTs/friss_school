import {Navbar} from './widgets/navbar';
import {VideoSection} from './widgets/video';

function App() {
  return <div style={{position:'relative', backgroundColor:  'var(--bg-color)', zIndex: 2}}>
    <Navbar/>
    <VideoSection/>
    <div className={'brush__container'} >
      <img className={'brush'} src={'/images/4.svg'}/>
    </div>


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
