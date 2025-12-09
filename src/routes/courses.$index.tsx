import { createFileRoute } from '@tanstack/react-router'
import {Separator} from '../widgets/separator';
import {TabsWidget} from '../widgets/tab';
import {courses} from '../widgets/courses';

export const Route = createFileRoute('/courses/$index')({
  component: RouteComponent,
})

function RouteComponent() {
  const route = Route.useParams();
  const items = courses.map((item) => {
    return {
      label: item.title,
      content: <div key={item.id} className={'tab-course'}>
        <div className={'tab-course__img-wrapper'}>
          <div  style={{backgroundImage: `url(${item.img})`, width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
          {/*<img className={'tab-course__img'} src={item.img} alt={`${item.title} в Friss school`} />*/}
        </div>
        <div className={'tab-course__info-wrapper'}>
          <p>{item.description}</p>
          <div className={'tab-course__info'}>
            <div className={'tab-course__duration'}>
              <h4 style={{marginRight: '1rem'}}>{'Продолжительность курса:'}</h4>
              <h3>{item.duration}</h3>
            </div>
            <div className={'tab-course__price'}>
              <h4 style={{marginRight: '1rem'}}>{'Стоимость:'}</h4>
              <h3>{item.price}</h3>
            </div>
          </div>
        </div>
      </div>,
    }
  });

  return <>
    <div className={'brush__container'}>
      <img className={'brush'} src={'/friss_school/images/4.svg'}/>
    </div>
    <Separator title={'Оффлайн обучение'} style={{marginTop: 0}}>
      <p style={{
        color: 'var(--text-additional-color)',
        fontFamily: 'serif',
        letterSpacing: '0.2rem',
        whiteSpace: 'nowrap',
      }}>{'в FRISS SCHOOL'}</p>
    </Separator>
    <TabsWidget
      tabs={items}
      initialIndex={parseInt(route.index)}
    />
  </>;
}
