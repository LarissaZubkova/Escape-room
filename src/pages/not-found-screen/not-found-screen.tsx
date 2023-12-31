import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="wrapper">
      <Helmet>
        <title>404 - Страница не найдена</title>
      </Helmet>
      <Header />
      <main className="decorated-page quest-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp" srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x"/>
            <img src="img/content/maniac/maniac-size-m.jpg" srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x" width={1366} height={768} alt=""/>
          </picture>
        </div>
        <div className="container container--size-l">
          <div className="quest-page__content">
            <h1 className="title title--size-l title--uppercase quest-page__title">Страница не найдена</h1>
            <Link className="btn btn--accent btn--cta quest-page__btn" to={AppRoute.Main}>вернуться на главную</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default NotFoundScreen;
