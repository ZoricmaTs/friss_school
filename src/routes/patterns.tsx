import { createFileRoute } from '@tanstack/react-router'
import {Footer} from '../widgets/footer';
import {Separator} from '../widgets/separator';
import {Patterns} from '../widgets/pattern';

export const Route = createFileRoute('/patterns')({
  component: RouteComponent,
})

function RouteComponent() {
  return <>
    <Separator title={'Выкройки'} style={{marginTop: 0}}/>
    <p className={'patterns__description'}>
      {'Мы занимаемся изготовлением лекал, которые вы можете у нас заказать. ' +
      'Либо выбрать готовые лекала для пошива современной одежды.  На сайте также есть бесплатные выкройки. Создайте любой образ с нами.\n' +
      'Разный уровень сложности позволит шить вещи как новичкам, так и опытным мастерам.'}
    </p>
    <Patterns/>
    <Footer/>
  </>;
}
