import './style.scss';
import {YMapLeaflet} from '../yMap';
import {useScrollHider} from '../../hooks/scroll-observer.ts';
import {FacebookLogoIcon, InstagramLogoIcon, ThreadsLogoIcon, WhatsappLogoIcon} from '@phosphor-icons/react';

export type SocialMediaLogo = "instagram" | "whatsapp" | "facebook" | "treads";

export interface SocialMediaType {
  id: number,
  href: string,
  name: SocialMediaLogo,
}

// eslint-disable-next-line react-refresh/only-export-components
export function getSocialMediaLogo(name: string) {
  switch (name) {
    case 'instagram':
      return <InstagramLogoIcon size={32}/>;
    case 'whatsapp':
      return <WhatsappLogoIcon size={32}/>;
    case 'facebook':
      return <FacebookLogoIcon size={32}/>;
    case 'treads':
      return <ThreadsLogoIcon size={32}/>;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const socialMedia: SocialMediaType[] = [
  {
    id: 0,
    name: 'instagram',
    href: 'https://www.instagram.com/purisova_school/',
  },
  {
    id: 1,
    name: 'whatsapp',
    href: 'https://api.whatsapp.com/send/?phone=996504362514&text&type=phone_number&app_absent=0&utm_source=ig',
  },
  {
    id: 2,
    name: 'facebook',
    href: 'https://www.facebook.com/profile.php?id=100027885127821&ref=_ig_profile_ac',
  },
  {
    id: 3,
    name: 'treads',
    href: 'https://www.threads.com/@purisova_school?xmt=AQF0VGwj2WIR347Nv5TSki5Zi_9ixdbjPV_qxUIxFbpoxY4\n',
  },
];

export function Contacts() {
  const rootRef = useScrollHider<HTMLDivElement>();

  return <section className={'contacts'} ref={rootRef}>
    <span className={'contacts__copyright'}>{'©FRISS SCHOOL 2025'}</span>
    <div className={'contacts__map-wrapper'}>
      <YMapLeaflet address={'ул.Байтик-Батыра, д. 34/5, офис 6/1'} coordinates={[42.848644, 74.608399]}/>
    </div>
    <div className={'contacts__info'}>
      <h2 className={'contacts__logo_title'}>{'FRISS SCHOOL'}</h2>
      <small className={'contacts__logo_description'}>{'школа кройки и шитья'}</small>
      <p className={'contacts__address'}>{'Адрес: 720055, Кыргызская Республика, г.Бишкек, ул.Байтик-Батыра, д. 34/5, офис 6/1'}</p>
      <p>{'Телефон: +996 504 362 514'}</p>
      <p>{'График работы: пн-сб 09:00-19:00'}</p>

      <div className={'contacts__social-media'}>
        {socialMedia.map((item, index) => {
          return <a
            className={'contacts__social-media_item'}
            href={item.href}
            key={`social-media-${index}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {getSocialMediaLogo(item.name)}
          </a>;
        })}
      </div>
    </div>
  </section>
}