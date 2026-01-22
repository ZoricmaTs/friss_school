import { createFileRoute } from '@tanstack/react-router'
import {CoursesAdmin} from '../widgets/coursesAdmin';
import {VideoAdmin} from '../widgets/video/videoAdmin.tsx';
import {ReviewsAdmin} from '../widgets/carousel/reviewsAdmin.tsx';
import {AccordionsAdmin} from '../widgets/accordion/accordionAdmin.tsx';
import {RunningLinesAdmin} from '../widgets/runningLine/linesAdmin.tsx';
import {PatternsAdmin} from '../widgets/pattern/patternsAdmin.tsx';
import {YMapLeafletFormik} from '../widgets/yMap/yMapAdmin.tsx';
import {ContactsAdmin} from '../widgets/contacts/contactsAdmin.tsx';
import {VideoCourseAdmin} from '../widgets/videoCourse/videoCourseAdmin.tsx';
import {type Tab, TabsWidget} from '../widgets/tab';

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
})


const items: Tab[] = [
  {
    label: 'Видео',
    content: <VideoAdmin/>
  },
  {label: 'Бегущая строка', content: <RunningLinesAdmin/>},
  {label: 'Оффлайн курсы', content: <CoursesAdmin/>},
  {label: 'Видео-курсы', content: <VideoCourseAdmin/>},
  {label: 'Галерея', content: <div></div>},
  {label: 'Отзывы', content: <ReviewsAdmin/>},
  {label: 'Вопросы-ответы', content: <AccordionsAdmin/>},
  {label: 'Контакты', content: <ContactsAdmin/>},
  {label: 'Адрес', content: <YMapLeafletFormik/>},
  {label: 'Лекала', content: <PatternsAdmin/>},
];
function RouteComponent() {
  return <div style={{minHeight: '100vh',   width: '100%', padding: '0 2.5rem', maxWidth: '1440px', margin: '0 auto'}}>
    <TabsWidget
      tabs={items}
      initialIndex={0}
    />

    {/*<YMapLeafletFormik/>*/}

    {/*<VideoAdmin/>*/}
    {/*<hr style={{margin: '5rem 0'}} />*/}
    {/*<Separator title={'Бегущая строка'}/>*/}
    {/*<RunningLinesAdmin/>*/}

    {/*<hr style={{margin: '5rem 0'}} />*/}
    {/*<Separator title={'Оффлайн курсы'}/>*/}
    {/*<CoursesAdmin/>*/}

    {/*<hr style={{margin: '5rem 0'}} />*/}
    {/*<Separator title={'Отзывы'}/>*/}
    {/*<ReviewsAdmin/>*/}

    {/*<hr style={{margin: '5rem 0'}} />*/}
    {/*<Separator title={'Вопросы-ответы'}/>*/}
    {/*<AccordionsAdmin/>*/}

    {/*<hr style={{margin: '5rem 0'}} />*/}
    {/*<Separator title={'Лекала'}/>*/}
    {/*<PatternsAdmin/>*/}
  </div>
}
