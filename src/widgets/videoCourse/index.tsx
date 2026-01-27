import './style.scss';
import {useScrollHider} from '../../hooks/scroll-observer.ts';
import {useDynamicStoreStore} from '../../providers/dynamicStore.ts';

export function VideoCourse() {
  const rootRef = useScrollHider<HTMLDivElement>();
  const dynamicStore = useDynamicStoreStore();

  return <section className={'video-course'} ref={rootRef}>
    <h4 className={'video-course__text'}>
      {dynamicStore.videoCourse.text}
    </h4>
    <small className={'video-course__note'}>{dynamicStore.videoCourse.note}</small>
    <a className={'video-course__btn video-course__btn_full'}>
      <p>{'Оставить заявку'}</p>
    </a>
  </section>
}