import { Helmet } from 'react-helmet-async';
import { Contacts } from '../../consts';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import ContactsMap from '../../components/contacts-map/contacts-map';

function ContactsScreen(): JSX.Element {
  return (
    <div className="wrapper">
      <Helmet>
        <title>Контакты - Escape Room</title>
      </Helmet>
      <Header/>
      <main className="page-content decorated-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp" srcSet="img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x"/>
            <img src="img/content/maniac/maniac-bg-size-m.jpg" srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x" width={1366} height={1959} alt=""/>
          </picture>
        </div>
        <div className="container">
          <div className="page-content__title-wrapper page-content__title-wrapper--underlined">
            <p className="subtitle page-content__subtitle">квесты в&nbsp;{`${Contacts.CITY}е`}</p>
            <h1 className="title title--size-m page-content__title">Контакты</h1>
          </div>
          <div className="contacts">
            <dl className="contacts__list">
              <div className="contacts__item">
                <dt className="contacts__dt">Адрес</dt>
                <dd className="contacts__dd">
                  <address className="contacts__address">{Contacts.CITY},<br/> {Contacts.ADDRESS}</address>
                </dd>
              </div>
              <div className="contacts__item">
                <dt className="contacts__dt">Режим работы</dt>
                <dd className="contacts__dd">Ежедневно, с&nbsp;{Contacts.WORKING_START} до&nbsp;{Contacts.WORKING_END}</dd>
              </div>
              <div className="contacts__item">
                <dt className="contacts__dt">Телефон</dt>
                <dd className="contacts__dd">
                  <a className="link" href="tel:88003335599">{Contacts.TELEPHONE}</a>
                </dd>
              </div>
              <div className="contacts__item">
                <dt className="contacts__dt">E&ndash;mail</dt>
                <dd className="contacts__dd">
                  <a className="link" href="mailto:info@escape-room.ru">{Contacts.EMAIL}</a>
                </dd>
              </div>
            </dl>
            <ContactsMap/>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default ContactsScreen;
