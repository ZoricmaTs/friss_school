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
      <p className={'video-section__description'}>{'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nulla lectus, ' +
        'pulvinar a pretium in, venenatis et augue. Fusce vitae velit in metus dapibus aliquam. Lorem ipsum dolor sit amet,' +
        ' consectetur adipiscing elit. Suspendisse potenti. Praesent tincidunt aliquet justo, nec vestibulum ante rutrum vitae.' +
        ' Ut sollicitudin dui non ligula pretium, malesuada fermentum felis pulvinar. Nullam eu nisl eleifend, semper augue. '}</p>
    </div>
  </section>
}