import './style.scss';
import {YMapLeaflet} from '../yMap';
import {useScrollHider} from '../../hooks/scroll-observer.ts';
import useSheetData from '../../hooks/useSheetData.ts';
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

export function Contacts() {
  const data = useSheetData(1231841505) as unknown as SocialMediaType[];
  const contacts = (useSheetData(229037856))[0];
  const rootRef = useScrollHider<HTMLDivElement>();

  if (!contacts) {
    return <div/>
  }

  const coordinates = contacts.coordinates.split(";").map((item) => Number(item)) as [number, number];

  return <section className={'contacts'} ref={rootRef}>
    <span className={'contacts__copyright'}>{'©FRISS SCHOOL 2025'}</span>
    <div className={'contacts__map-wrapper'}>
      <YMapLeaflet address={contacts.addressShort} coordinates={coordinates}/>
    </div>
    <div className={'contacts__info'}>
      <h2 className={'contacts__logo_title'}>{'FRISS SCHOOL'}</h2>
      <small className={'contacts__logo_description'}>{'школа кройки и шитья'}</small>
      <p className={'contacts__address'}>{contacts.address}</p>
      <p>{contacts.phoneNumber}</p>
      <p>{contacts.schedule}</p>

      <div className={'contacts__social-media'}>
        {data.map((item, index) => {
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