import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkAuthAction, fetchQuestsAction } from '../../store/api-actions';
import { getQuestsErrorStatus, getQuestsLoadingStatus } from '../../store/quests-process/quest-process.selectors';
import { getAuthCheckedStatus, getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import BookingScreen from '../../pages/booking-screen/booking-screen';
import ContactsScreen from '../../pages/contacts-screen/contacts-screen';
import ErrorScreen from '../../pages/error-screen/error-screen';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import MyQuestsScreen from '../../pages/my-quests-screen/my-quests-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import QuestScreen from '../../pages/quest-screen/quest-screen';
import WelcomeScreen from '../../pages/welcome-screen/welcome-screen';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isQuestsLoading = useAppSelector(getQuestsLoadingStatus);
  const hasError = useAppSelector(getQuestsErrorStatus);

  useEffect(() => {
    dispatch(fetchQuestsAction());
    dispatch(checkAuthAction());

    return () => {
      dispatch(fetchQuestsAction());
      dispatch(checkAuthAction());
    };
  }, [dispatch]);

  if (!isAuthChecked || isQuestsLoading) {
    return <LoadingScreen/>;
  }

  if (hasError) {
    return <ErrorScreen/>;
  }

  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Main} element={<WelcomeScreen/>}/>
        <Route path={AppRoute.Login} element={<LoginScreen/>}/>
        <Route path={AppRoute.Contacts} element={<ContactsScreen/>}/>
        <Route path={AppRoute.Quest} element={<QuestScreen/>}/>
        <Route element={<PrivateRoute authorizationStatus={authorizationStatus} />}>
          <Route path={AppRoute.Booking} element={<BookingScreen/>}/>
          <Route path={AppRoute.MyQuests} element={<MyQuestsScreen/>}/>
        </Route>
        <Route path="*" element={<NotFoundScreen/>}/>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
