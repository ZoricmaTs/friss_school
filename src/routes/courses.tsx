import { createFileRoute } from '@tanstack/react-router'
import {Separator} from '../widgets/separator';
import {TabsWidget} from '../widgets/tab';
import {courses} from '../widgets/courses';

export const Route = createFileRoute('/courses')({
  component: RouteComponent,
})

function RouteComponent() {
  const items = courses.map((item) => {
    return {
      label: item.title,
      content: <div>
        <p>{item.description}</p>
        <div>
          <div>{item.duration}</div>
          <div>{item.price}</div>
        </div>
      </div>,
    }
  });
  return <>
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
    />
  </>;
}
