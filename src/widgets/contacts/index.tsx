import './style.scss';
import {YMap} from '../yMap';
import {FacebookLogoIcon, InstagramLogoIcon, WhatsappLogoIcon} from '@phosphor-icons/react';
import type {ReactNode} from 'react';
import {useScrollHider} from '../../hooks/scroll-observer.ts';

export interface SocialMediaType {
  id: number,
  href: string,
  node: ReactNode,
}
const socialMedia: SocialMediaType[] = [
  {
    id: 0,
    href: 'https://www.instagram.com/purisova_school/',
    node: <InstagramLogoIcon size={32}/>,
  },
  {
    id: 1,
    href: 'https://l.instagram.com/?u=http%3A%2F%2Fwa.me%2F996504362514%3Futm_source%3Dig%26utm_medium%3Dsocial%26utm_content%3Dlink_in_bio%26fbclid%3DPAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnJB9cbgEkQ0kYt2cAKbQ6ungHoF2yMrr8OT8caUpdGrf3x6hXRrcqPYoJxqI_aem_k0SIMhraBDhq-AUYWqDI1g&e=AT2NRH9Wi6ARLHZIJLEDHeLEIMpTy_DCOpBJIDxfyu6qVNddiQhaww6xqnqbDR40xvTtQeynY_VTvSl-RTFuXykMk3PNnIdc7THDLtc_XA',
    node: <WhatsappLogoIcon size={32}/>,
  },
  {
    id: 2,
    href: 'https://www.facebook.com/profile.php?id=100027885127821&ref=_ig_profile_ac',
    node: <FacebookLogoIcon size={32}/>,
  },
]

export function Contacts() {
  const rootRef = useScrollHider<HTMLDivElement>();

  return <section className={'contacts'} ref={rootRef}>
    <span className={'contacts__copyright'}>{'©FRISS SCHOOL 2025'}</span>
    <YMap/>
    <div className={'contacts__info'}>
      <h2 className={'contacts__logo_title'}>{'FRISS SCHOOL'}</h2>
      <small className={'contacts__logo_description'}>{'школа кройки и шитья'}</small>
      <p className={'contacts__address'}>{'720055, Кыргызская Республика, г.Бишкек, ул.Байтик-Батыра, д. 34/5'}</p>
      <p>{'Телефон: +996 504 362 514'}</p>
      <p>{'Время работы: пн-сб 09:00-19:00'}</p>

      <div className={'contacts__social-media'}>
        {socialMedia.map((item, index) => {
          return <a
            className={'contacts__social-media_item'}
            href={item.href}
            key={`social-media-${index}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.node}
          </a>;
        })}
      </div>
    </div>
  </section>
}