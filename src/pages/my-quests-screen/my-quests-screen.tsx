import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchMyQuestsAction } from '../../store/api-actions';
import { getMyQuestsCard, getMyQuestsCardErrorStatus, getMyQuestsCardLoadingStatus } from '../../store/my-quests-process/my-quest-process.selectors';
import CancelButton from '../../components/cancelButton/cancelButton';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import QuestCard from '../../components/quest-card/quest-card';
import ErrorScreen from '../error-screen/error-screen';
import LoadingScreen from '../loading-screen/loading-screen';

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
            <img src="img/content/maniac/maniac-bg-size-m.jpg" srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x" width={1366} height={1959} alt=""/>
          </picture>
        </div>
        <div className="container">
          <div className="page-content__title-wrapper">
            <h1 className="title title--size-m page-content__title">Мои бронирования</h1>
          </div>
          <div className="cards-grid">
            {myQuests.map((myQuest) => <QuestCard key={myQuest.id} quest={myQuest.quest} myQuest={myQuest} >{<CancelButton id={myQuest.id} />}</QuestCard>)}
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default MyQuestsScreen;
