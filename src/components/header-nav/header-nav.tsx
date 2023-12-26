import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { AppRoute, NavParams, NavTab } from '../../consts';

type HeaderNavProps = {
  isAuth: boolean;
}

function HeaderNav({isAuth}: HeaderNavProps): JSX.Element {
  const {pathname} = useLocation();

  return (
    <nav className="main-nav header__main-nav">
      <ul className="main-nav__list">
        <li className="main-nav__item">
          <Link
            className={classNames('link', {'active' : pathname === NavParams.Quests})}
            to={AppRoute.Main}
          >{NavTab.Quests}
          </Link>
        </li>
        <li className="main-nav__item">
          <Link
            className={classNames('link', {'active' : pathname === NavParams.Contacts})}
            to={AppRoute.Contacts}
          >{NavTab.Contacts}
          </Link>
        </li>
        {isAuth &&
            <li className="main-nav__item">
              <Link
                className={classNames('link', {'active' : pathname === NavParams.MyQuests})}
                to={AppRoute.MyQuests}
              >{NavTab.MyQuests}
              </Link>
            </li>}
      </ul>
    </nav>
  );
}

export default HeaderNav;
