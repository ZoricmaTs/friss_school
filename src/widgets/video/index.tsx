import './style.scss';
import {PauseIcon, PlayIcon, SpeakerSimpleHighIcon, SpeakerSimpleSlashIcon} from '@phosphor-icons/react';
import {useEffect, useRef, useState} from 'react';
import {useScrollHider} from '../../hooks/scroll-observer.ts';

export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const rootRef = useScrollHider<HTMLDivElement>();

  useEffect(() => {
    const vid = videoRef.current;
    const onPlay = () => {
      setIsPaused(false);
    }

    const onPause = () => {
      setIsPaused(true);
    }

    if (vid) {
      vid.addEventListener('paused', onPlay);
      vid.addEventListener('play', onPause);
    }

    return () => {
      if (vid) {
        vid!.removeEventListener('paused', onPlay);
        vid!.removeEventListener('play', onPause);
      }
    }
  }, []);

  const onClickPlay = () => {
    videoRef.current?.play().then(() => setIsPaused(false));
  }

  const onClickPause = () => {
    videoRef.current?.pause();
    setIsPaused(true);
  }

  return <section className={'video-section'} ref={rootRef}>
    <div className={'video-section__video-container'}>
      <video className={'video-section__video'} loop muted={muted} ref={videoRef}>
        <source src="/friss_school/videos/sew.mp4" type="video/mp4"/>
        Your browser does not support the video tag.
      </video>
      {isPaused && <button className={'video-section__button_play'} onClick={onClickPlay}>
        <PlayIcon size={70} weight="fill"/>
      </button>
      }
      <button className={'video-section__button_mute'} onClick={() => setMuted(!muted)}>
        {muted
          ? <SpeakerSimpleSlashIcon size={32} weight="fill"/>
          : <SpeakerSimpleHighIcon size={32} weight="fill"/>
        }
      </button>
      {!isPaused && <button className={'video-section__button_pause'} onClick={onClickPause}>
        <PauseIcon size={32} weight="fill"/>
      </button>}
    </div>
    <div className={'video-section__info-container'}>
      <h2 className={'video-section__title'}>{'Курс кройки и шитья — обучение с нуля'}</h2>
      <p className={'video-section__description'}>{'Добрый день!' + '\n' + 'Меня зовут Ольга Борисовна. Я в швейном бизнесе уже больше 20 лет, а последние шесть лет с огромной радостью передаю свои знания другим.\n' +
        '\n' +
        'Наша школа — это современный обучающий проект, где мы помогаем людям не просто приобрести профессию, а исполнить свои мечты.\n' +
        '\n' +
        'Мы обучаем с нуля в маленьких уютных группах, с 12 лет и до... Всё максимально просто и доступно. У нас профессиональное оборудование, все материалы включены, и мы работаем в теплом, творческом пространстве.\n' +
        '\n' +
        'И результат вдохновляет! Наши ученицы открывают свои мастерские и ателье, запускают брендовые коллекции. Для кого-то это новая профессия, которая помогает в трудные времена, а для кого-то — любимое хобби, отдушина от основной работы.\n' +
        '\n' +
        'Мне безумно нравится видеть этот результат — как у людей загораются глаза, когда они создают свою первую, а потом и сотую вещь. Это модно, это творчество, это свобода.'}</p>
    </div>
  </section>
}