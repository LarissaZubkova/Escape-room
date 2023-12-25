import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import { AppRoute, QuestLevelFilter, QuestTypeFilter } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchQuestByIdAction } from '../../store/api-actions';
import { getQuestCard, getQuestCardErrorStatus, getQuestCardLoadingStatus } from '../../store/quest-process/quest-process.selectors';
import { getDescription, getMinMaxPeople } from '../../utils/utils';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ErrorScreen from '../error-screen/error-screen';
import LoadingScreen from '../loading-screen/loading-screen';

function QuestScreen(): JSX.Element {
  const questId = useParams().id;
  const dispatch = useAppDispatch();
  const quest = useAppSelector(getQuestCard);
  const isQuestLoading = useAppSelector(getQuestCardLoadingStatus);
  const hasQuestError = useAppSelector(getQuestCardErrorStatus);

  useEffect(() => {
    if (questId) {
      dispatch(fetchQuestByIdAction(questId));
    }
  }, [questId, dispatch]);

  if (isQuestLoading || !quest) {
    return <LoadingScreen/>;
  }

  if (hasQuestError) {
    return <ErrorScreen/>;
  }

  const {previewImg, previewImgWebp, title, peopleMinMax, type, level, description, id} = quest;

  return (
    <div className="wrapper">
      <Helmet>
        <title>{`Квест - ${quest.title}`}</title>
      </Helmet>
      <Header />
      <main className="decorated-page quest-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp} 2x"`}/>
            <img src={previewImg} srcSet={`${previewImg} 2x`} width={1366} height={768} alt={title}/>
          </picture>
        </div>
        <div className="container container--size-l">
          <div className="quest-page__content">
            <h1 className="title title--size-l title--uppercase quest-page__title">{title}</h1>
            <p className="subtitle quest-page__subtitle"><span className="visually-hidden">Жанр:</span>{QuestTypeFilter[type]}
            </p>
            <ul className="tags tags--size-l quest-page__tags">
              <li className="tags__item">
                <svg width={11} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-person"></use>
                </svg>{getMinMaxPeople(peopleMinMax)}чел
              </li>
              <li className="tags__item">
                <svg width={14} height={14} aria-hidden="true">
                  <use xlinkHref="#icon-level"></use>
                </svg>{QuestLevelFilter[level]}
              </li>
            </ul>
            <p className="quest-page__description">{getDescription(description)}</p>
            <Link className="btn btn--accent btn--cta quest-page__btn" to={AppRoute.Booking.replace(':id', id)}>Забронировать</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default QuestScreen;
