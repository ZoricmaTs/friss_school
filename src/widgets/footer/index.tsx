import './style.scss';
import useSheetData from '../../hooks/useSheetData.ts';
import {getSocialMediaLogo, type SocialMediaType} from '../contacts';

export type FooterItem = {
  id: string,
  title: string,
  action: () => void
}
export type Props = {
  items: FooterItem[],
}

export function Footer() {
  const data = useSheetData(1231841505) as unknown as SocialMediaType[];
  const contacts = (useSheetData(229037856))[0];

  if (!contacts) {
    return <div/>
  }

  return <footer className={'footer'}>
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
    <span className={'footer__copyright'}>{'©FRISS SCHOOL 2025'}</span>
  </footer>
}