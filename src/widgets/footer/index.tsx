import './style.scss';
import {getSocialMediaLogo} from '../contacts';
import {useDynamicStoreStore} from '../../providers/dynamicStore.ts';

export type FooterItem = {
  id: string,
  title: string,
  action: () => void
}
export type Props = {
  items: FooterItem[],
}

export function Footer() {
  const dynamicStore = useDynamicStoreStore();

  return <footer className={'footer'}>
    <div className={'contacts__social-media'}>
      {Object.entries(dynamicStore.contacts.socials).map(([name, href], index) => {
        return <a
          className={'contacts__social-media_item'}
          href={href}
          key={`social-media-${index}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {getSocialMediaLogo(name)}
        </a>;
      })}
    </div>
    <span className={'footer__copyright'}>{'©FRISS SCHOOL 2025'}</span>
  </footer>
}