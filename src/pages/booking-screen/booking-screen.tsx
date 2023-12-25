import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import BookingForm from '../../components/booking-form/booking-form';
import BookingMap from '../../components/booking-map/booking-map';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchBookingPlaceAction } from '../../store/api-actions';
import { getBookingPlaces, getPlacesErrorStatus, getPlacesLoadingStatus } from '../../store/booking-process/booking-process.selectors';
import { getQuestCard } from '../../store/quest-process/quest-process.selectors';
import ErrorScreen from '../error-screen/error-screen';
import LoadingScreen from '../loading-screen/loading-screen';

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

  if (isPlacesLoading || !bookingPlaces || !quest || !id) {
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
            <BookingMap places={bookingPlaces}/>
          </div>
          <BookingForm id={id} peopleMinMax={quest.peopleMinMax} />
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default BookingScreen;
