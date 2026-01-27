import './style.scss';
import {useEffect, useState} from 'react';
import {useNavigate, type UseNavigateResult} from '@tanstack/react-router';
import {Logo} from '../logo';
import {useDynamicStoreStore} from '../../providers/dynamicStore.ts';

export interface NavbarItem {
  id: number | string,
  title: string,
  available?: boolean,
  action: (navigate: UseNavigateResult<string>) => void,
}

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  document.body.parentElement!.scrollTo({top: el!.offsetTop - 106, behavior: 'smooth'});
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dynamicStore = useDynamicStoreStore();

  const navbarItems: NavbarItem[] = [
    {
      id: 0,
      title: 'Курсы',
      available: dynamicStore.courses.length > 0,
      action: (navigate) => navigate({to: '/courses/$index', params: {index: '0'}}),
    },
    {
      id: 2,
      title: 'Выкройки',
      available: dynamicStore.patterns.length > 0,
      action: (navigate) => navigate({to: '/patterns'}),
    },
    {
      id: 3,
      title: 'Видео-курсы',
      available: true,
      // available: dynamicStore.videoCourse.text && dynamicStore.videoCourse.note,
      action: (navigate) => navigate({to: '/'}).then(() => {scrollToId('video-view')}),
    },
    {
      id: 4,
      title: 'Отзывы',
      available: true,
      action: (navigate) => navigate({to: '/'}).then(() => {scrollToId('reviews-view')}),
    },
    {
      id: 5,
      title: 'Вопросы и ответы',
      available: true,
      action: (navigate) => navigate({to: '/'}).then(() => {scrollToId('accordions-view')}),
    },
    {
      id: 6,
      title: 'Контакты',
      available: true,
      action: (navigate) => navigate({to: '/'}).then(() => {scrollToId('contacts-view')}),
    },
  ];

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navigate = useNavigate();

  return <nav className={'navbar'}>
    <nav className={'navbar__container'}>
      <Logo imgVisible={true} action={() => setIsOpen(false)}/>
      <button
        className={`navbar__hamburger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span/>
        <span/>
        <span/>
      </button>
    </nav>
    <ul className={`navbar__links ${isOpen ? 'active' : ''}`}>
      {navbarItems.map((item: NavbarItem) => {
        if (item.available) {
          return <li key={`navbar-${item.id}`}>
            <button onClick={() => {
              setIsOpen(false);
              item.action(navigate);
            }}>
              <p>{item.title}</p>
            </button>
          </li>
        }

        return;
      })}
    </ul>
  </nav>;
}