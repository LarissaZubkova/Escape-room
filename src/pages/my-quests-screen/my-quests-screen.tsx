import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getMyQuestsCard, getMyQuestsCardErrorStatus, getMyQuestsCardLoadingStatus } from '../../store/my-quests-process/my-quest-process.selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import ErrorScreen from '../error-screen/error-screen';
import QuestCard from '../../components/quest-card/quest-card';
import CancelButton from '../../components/cancelButton/cancelBatton';
import { fetchMyQuestsAction } from '../../store/api-actions';
import { useEffect } from 'react';

function MyQuestsScreen(): JSX.Element {
  const myQuests = useAppSelector(getMyQuestsCard);
  const isLoading = useAppSelector(getMyQuestsCardLoadingStatus);
  const hasError = useAppSelector(getMyQuestsCardErrorStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMyQuestsAction());
  },[dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (hasError) {
    return <ErrorScreen />;
  }

  return (
    <div className="wrapper">
      <Helmet>
        <title>Мои бронирования - Escape Room</title>
      </Helmet>
      <Header/>
      <main className="page-content decorated-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp" srcSet="img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x"/>
            <img src="img/content/maniac/maniac-bg-size-m.jpg" srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x" width="1366" height="1959" alt=""/>
          </picture>
        </div>
        <div className="container">
          <div className="page-content__title-wrapper">
            <h1 className="title title--size-m page-content__title">Мои бронирования</h1>
          </div>
          <div className="cards-grid">
            {myQuests.map((myQuest) => <QuestCard key={myQuest.id} quest={myQuest.quest} count={myQuest.peopleCount}>{<CancelButton id={myQuest.id} />}</QuestCard>)}
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default MyQuestsScreen;
