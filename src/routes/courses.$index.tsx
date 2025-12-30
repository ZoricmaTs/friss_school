import { createFileRoute } from '@tanstack/react-router'
import {Separator} from '../widgets/separator';
import {TabsWidget} from '../widgets/tab';
import {courses, type CourseType} from '../widgets/courses';
import {Footer} from '../widgets/footer';
import useSheetData from '../hooks/useSheetData.ts';

export const Route = createFileRoute('/courses/$index')({
  component: RouteComponent,
})

function RouteComponent() {
  const data = useSheetData(884951379) as unknown as CourseType[];

  const route = Route.useParams();
  const items = data.map((item, index: number) => {
    return {
      label: item.title,
      content: <div key={item.id} className={'tab-course'}>
        <div className={'tab-course__img-wrapper'}>
          <div style={{backgroundImage: `url(${courses[index].imageUrl})`, width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
        </div>

        <div className={'tab-course__info-wrapper'}>
          <p style={{textAlign: 'justify'}}>{item.description}</p>
          <div className={'tab-course__info'}>
            <div className={'tab-course__duration'}>
              <h4 style={{marginRight: '1rem'}}>{'Продолжительность курса:'}</h4>
              <h3 style={{whiteSpace: 'nowrap'}}>{item.duration}</h3>
            </div>
            <div className={'tab-course__price'}>
              <h4 style={{marginRight: '1rem'}}>{'Стоимость:'}</h4>
              <h3>{item.price}</h3>
            </div>
          </div>
        </div>
      </div>
    }
  });

  return <>
    <div className={'brush-course__container'} >
      <img className={'brush-course'} src={'/friss_school/images/4.svg'}/>
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
    <Footer/>
  </>;
}
