import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../consts';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
}

function PrivateRoute({authorizationStatus}: PrivateRouteProps) {
  const location = useLocation();

  return authorizationStatus === AuthorizationStatus.Auth ? <Outlet /> : <Navigate to={AppRoute.Login} state={{from: location}} />;
}
export default PrivateRoute;
