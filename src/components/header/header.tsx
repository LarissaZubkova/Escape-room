import { AppRoute, AuthorizationStatus } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../store/api-actions';

type HeaderProps = {
  isMain?: boolean;
  isLogin?: boolean;
}

function Header({isMain, isLogin}: HeaderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <header className="header">
      <div className="container container--size-l">
        {isMain ?
          <span className="logo header__logo">
            <svg width={134} height={52} aria-hidden="true">
              <use xlinkHref="#logo"></use>
            </svg>
          </span> :
          <Link className="logo header__logo" to={AppRoute.Main} aria-label="Перейти на Главную">
            <svg width={134} height={52} aria-hidden="true">
              <use xlinkHref="#logo"></use>
            </svg>
          </Link> }
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="link active" to={AppRoute.Main}>Квесты</Link>
            </li>
            <li className="main-nav__item">
              <Link className="link" to={AppRoute.Contacts}>Контакты</Link>
            </li>
            {isAuth &&
            <li className="main-nav__item">
              <Link className="link" to={AppRoute.MyQuests}>Мои бронирования</Link>
            </li>}
          </ul>
        </nav>
        <div className="header__side-nav">
          {isAuth && !isLogin &&
            <Link
              className="btn btn--accent header__side-item"
              to={AppRoute.Main}
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(logoutAction());
              }}
            >Выйти
            </Link>}
          {!isAuth && !isLogin && <Link className="btn header__side-item header__login-btn" to={AppRoute.Login}>Вход</Link>}
          <a className="link header__side-item header__phone-link" href="tel:88003335599">8 (000) 111-11-11</a>
        </div>
      </div>
    </header>
  );
}

export default Header;
