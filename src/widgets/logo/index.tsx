import './style.scss';
import {useNavigate} from '@tanstack/react-router';

export function Logo({imgVisible}: {imgVisible?: boolean}) {
  const navigate = useNavigate();

  return <div className={'logo'} onClick={() => navigate({to: '/'})}>
    {imgVisible && <img className={'logo__image'} src={'/friss_school/images/1.svg'}/>}
    <h2 className={'logo__title'}>{'FRISS SCHOOL'}</h2>
    <small className={'logo__description'}>{'школа кройки и шитья'}</small>
  </div>
}