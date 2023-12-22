import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import LoadingScreen from '../loading-screen/loading-screen';
import ErrorScreen from '../error-screen/error-screen';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';
import { fetchBookingPlaceAction } from '../../store/api-actions';
import { getBookingPlaces, getPlacesLoadingStatus, getPlacesErrorStatus } from '../../store/booking-process/booking-process.selectors';
import { getQuestCard } from '../../store/quest-process/quest-process.selectors';
import BookingTimeForm from '../../components/booking-time-form/booking-time-form';

function BookingScreen(): JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const bookingPlaces = useAppSelector(getBookingPlaces);
  const quest = useAppSelector(getQuestCard);
  const isPlacesLoading = useAppSelector(getPlacesLoadingStatus);
  const hasPlacesError = useAppSelector(getPlacesErrorStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchBookingPlaceAction(id));
    }
  }, [id, dispatch]);

  if (isPlacesLoading || !bookingPlaces || !quest) {
    return <LoadingScreen/>;
  }

  if (hasPlacesError) {
    return <ErrorScreen/>;
  }

  const {previewImg, previewImgWebp, title} = quest;

  return (
    <div className="wrapper">
      <Helmet>
        <title>Бронирование квеста - Escape Room</title>
      </Helmet>
      <Header/>
      <main className="page-content decorated-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp} 2x`}/>
            <img src={previewImg} srcSet={`${quest.previewImg} 2x`} width={1366} height={1959} alt={title}/>
          </picture>
        </div>
        <div className="container container--size-s">
          <div className="page-content__title-wrapper">
            <h1 className="subtitle subtitle--size-l page-content__subtitle">Бронирование квеста
            </h1>
            <p className="title title--size-m title--uppercase page-content__title">{title}</p>
          </div>
          <div className="page-content__item">
            <div className="booking-map">
              <div className="map">
                <div className="map__container"></div>
              </div>
              <p className="booking-map__address">Вы&nbsp;выбрали: наб. реки Карповки&nbsp;5, лит&nbsp;П, м. Петроградская</p>
            </div>
          </div>
          <form className="booking-form" action="https://echo.htmlacademy.ru/" method="post">
            <fieldset className="booking-form__section">
              <legend className="visually-hidden">Выбор даты и времени</legend>
              <fieldset className="booking-form__date-section">
                <legend className="booking-form__date-title">Сегодня</legend>
                <BookingTimeForm />
              </fieldset>
              <fieldset className="booking-form__date-section">
                <legend className="booking-form__date-title">Завтра</legend>
                <BookingTimeForm />
              </fieldset>
            </fieldset>
            <fieldset className="booking-form__section">
              <legend className="visually-hidden">Контактная информация</legend>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="name">Ваше имя</label>
                <input type="text" id="name" name="name" placeholder="Имя" required pattern="[А-Яа-яЁёA-Za-z'- ]{1,}"/>
              </div>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
                <input type="tel" id="tel" name="tel" placeholder="Телефон" required pattern="[0-9]{10,}"/>
              </div>
              <div className="custom-input booking-form__input">
                <label className="custom-input__label" htmlFor="person">Количество участников</label>
                <input type="number" id="person" name="person" placeholder="Количество участников" required/>
              </div>
              <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
                <input type="checkbox" id="children" name="children" checked/>
                <span className="custom-checkbox__icon">
                  <svg width="20" height="17" aria-hidden="true">
                    <use xlinkHref="#icon-tick"></use>
                  </svg>
                </span><span className="custom-checkbox__label">Со&nbsp;мной будут дети</span>
              </label>
            </fieldset>
            <button className="btn btn--accent btn--cta booking-form__submit" type="submit">Забронировать</button>
            <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
              <input type="checkbox" id="id-order-agreement" name="user-agreement" required/>
              <span className="custom-checkbox__icon">
                <svg width="20" height="17" aria-hidden="true">
                  <use xlinkHref="#icon-tick"></use>
                </svg>
              </span>
              <span className="custom-checkbox__label">Я&nbsp;согласен с
                <a className="link link--active-silver link--underlined" href="#">правилами обработки персональных данных</a>&nbsp;и пользовательским соглашением
              </span>
            </label>
          </form>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default BookingScreen;
