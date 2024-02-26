import { Navigate, Outlet } from 'react-router-dom';
import { Paths } from '@customTypes/routes';
import { LocalStorageKeys } from '@constants/local-storage-keys.ts';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { isLoggedInAuthSelector } from '@redux/selectors';

export const NonAuthRoutes = () => {
    const isAccessToken = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN) !== null;
    const isLoggedIn = useAppSelector(isLoggedInAuthSelector);

    const isAuth = isAccessToken || isLoggedIn;

    return isAuth ? <Navigate to={Paths.MAIN} replace /> : <Outlet />;
};
