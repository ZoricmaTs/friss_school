import './style.scss';
import {useState} from 'react';

export interface NavbarItem {
  id: number,
  title: string,
  action: () => void,
}

const navbarItems: NavbarItem[] = [
  {
    id: 0,
    title: 'Курсы',
    action: () => console.log('sd')
  },
  {
    id: 1,
    title: 'Услуги',
    action: () => console.log('sd')
  },
  {
    id: 2,
    title: 'Расписание занятий',
    action: () => console.log('sd')
  },
  {
    id: 3,
    title: 'Видео-курсы',
    action: () => console.log('sd')
  },
  {
    id: 4,
    title: 'Отзывы',
    action: () => console.log('sd')
  },
  // {
  //   id: 5,
  //   title: 'Часто задаваемые вопросы',
  //   action: () => console.log('sd')
  // },
  {
    id: 6,
    title: 'Контакты',
    action: () => console.log('sd')
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return <nav className={'navbar'}>
    <nav className={'navbar__container'}>
      <div style={{position: 'relative'}}>
        <img className={'navbar__image'} src={'/images/1.svg'}/>
        <h2 className={'navbar__logo_title'}>{'FRISS SCHOOL'}</h2>
        <small className={'navbar__logo_description'}>{'школа кройки и шитья'}</small>
      </div>

      <button
        className={`navbar__hamburger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
    <ul className={`navbar__links ${isOpen ? "active" : ""}`}>
      {navbarItems.map((item: NavbarItem) => {
        return <li key={`navbar-${item.id}`}>
          <a href="#courses">
            <p>{item.title}</p>
          </a>
        </li>
      })}
    </ul>
  </nav>;
}