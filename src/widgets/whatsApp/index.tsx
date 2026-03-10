import {WhatsappLogoIcon} from '@phosphor-icons/react';
import './style.scss';
import {useDynamicStoreStore} from '../../providers/dynamicStore.ts';

export function WhatsAppWidget() {
  const dynamicStore = useDynamicStoreStore();
  return <a
    className={'whatsapp-widget'}
    href={dynamicStore.contacts.socials.whatsapp}
    target="_blank"
    rel="noopener noreferrer"
  >
    <WhatsappLogoIcon size={100} weight="fill"/>
  </a>
}