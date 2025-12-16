import './style.scss';
import {useNavigate} from '@tanstack/react-router';

export function Logo({imgVisible, action}: {imgVisible?: boolean, action?: () => void}) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate({to: '/'}).then(() => {
      if (action) {
        action();
      }
    });
  }

  return <div className={'logo'} onClick={onClick}>
    {imgVisible && <img className={'logo__image'} src={'/friss_school/images/1.svg'}/>}
    <h2 className={'logo__title'}>{'FRISS SCHOOL'}</h2>
    <small className={'logo__description'}>{'школа кройки и шитья'}</small>
  </div>
}