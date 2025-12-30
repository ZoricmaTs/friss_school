import './style.scss';
import {useScrollHider} from '../../hooks/scroll-observer.ts';

export function VideoCourse() {
  const rootRef = useScrollHider<HTMLDivElement>();

  return <section className={'video-course'} ref={rootRef}>
    <h4 className={'video-course__text'}>
      {'Учитесь в своём темпе и без привязки ко времени. Все уроки доступны в записи, с подробными объяснениями и наглядными примерами. Вы сможете освоить крой, ' +
        'работу с тканями и пошив изделий, не выходя из дома. Для получения доступа перейдите в Whatsapp по ссылке ниже. ' +
        'После оплаты и подтверждения вам будет открыт доступ к выбранному курсу.'}
    </h4>
    <small className={'video-course__note'}>{'Мы всегда на связи в Whatsapp и готовы ответить на вопросы.'}</small>
    <a className={'video-course__btn video-course__btn_full'}>
      <p>{'Оставить заявку'}</p>
    </a>
  </section>
}