import './style.scss';
import {useEffect, useState} from 'react';

export interface NavbarItem {
  id: number | string,
  title: string,
  action: () => void,
}

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  document.body.parentElement!.scrollTo({top: el!.offsetTop - 106, behavior: 'smooth'});
};

const navbarItems: NavbarItem[] = [
  {
    id: 0,
    title: 'Курсы',
    action: () => console.log('sd'),
  },
  // {
  //   id: 1,
  //   title: 'Услуги',
  //   action: () => console.log('sd'),
  // },
  {
    id: 2,
    title: 'Расписание занятий',
    action: () => console.log('sd'),
  },
  {
    id: 3,
    title: 'Видео-курсы',
    action: () => console.log('sd'),
  },
  {
    id: 4,
    title: 'Отзывы',
    action: () => scrollToId('reviews-view'),
  },
  {
    id: 5,
    title: 'Ответы и вопросы',
    action: () => scrollToId('accordions-view'),
  },
  {
    id: 6,
    title: 'Контакты',
    action: () => scrollToId('contacts-view'),
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



  return <nav className={'navbar'}>
    <nav className={'navbar__container'}>
      <div style={{position: 'relative'}}>
        <img className={'navbar__image'} src={'images/1.svg'}/>
        <h2 className={'navbar__logo_title'}>{'FRISS SCHOOL'}</h2>
        <small className={'navbar__logo_description'}>{'школа кройки и шитья'}</small>
      </div>

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
            item.action();
          }}>
            <p>{item.title}</p>
          </button>
        </li>
      })}
    </ul>
  </nav>;
}