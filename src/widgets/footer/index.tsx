import './style.scss';
import {getSocialMediaLogo, socialMedia} from '../contacts';

export type FooterItem = {
  id: string,
  title: string,
  action: () => void
}
export type Props = {
  items: FooterItem[],
}

export function Footer() {
  return <footer className={'footer'}>
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
    <span className={'footer__copyright'}>{'©FRISS SCHOOL 2025'}</span>
  </footer>
}