import './style.scss';
import {useEffect, useState} from 'react';
import {useNavigate, type UseNavigateResult} from '@tanstack/react-router';
import {Logo} from '../logo';

export interface NavbarItem {
  id: number | string,
  title: string,
  action: (navigate: UseNavigateResult<string>) => void,
}

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  document.body.parentElement!.scrollTo({top: el!.offsetTop - 106, behavior: 'smooth'});
};

const navbarItems: NavbarItem[] = [
  {
    id: 0,
    title: 'Курсы',
    action: (navigate) => navigate({to: '/courses/$index', params: {index: '0'}}),
  },
  // {
  //   id: 1,
  //   title: 'Услуги',
  //   action: () => console.log('sd'),
  // },
  {
    id: 3,
    title: 'Видео-курсы',
    action: () => console.log('sd'),
  },
  {
    id: 4,
    title: 'Отзывы',
    action: (navigate) => navigate({to: '/'}).then(() => {scrollToId('reviews-view')}),
  },
  {
    id: 5,
    title: 'Вопросы и ответы',
    action: (navigate) => navigate({to: '/'}).then(() => {scrollToId('accordions-view')}),
  },
  {
    id: 6,
    title: 'Контакты',
    action: (navigate) => navigate({to: '/'}).then(() => {scrollToId('contacts-view')}),
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
        return <li key={`navbar-${item.id}`}>
          <button onClick={() => {
            setIsOpen(false);
            item.action(navigate);
          }}>
            <p>{item.title}</p>
          </button>
        </li>
      })}
    </ul>
  </nav>;
}