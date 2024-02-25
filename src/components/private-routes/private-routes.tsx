import { Navigate, Outlet } from 'react-router-dom';
import { Paths } from '@customTypes/routes';
import { LocalStorageKeys } from '@constants/local-storage-keys.ts';
import { isLoggedInAuthSelector } from '@redux/selectors';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';

const PrivateRoutes = () => {
    const isAccessToken = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN) !== null;
    const isLoggedIn = useAppSelector(isLoggedInAuthSelector);

    const isAuth = isAccessToken || isLoggedIn;

    return isAuth ? <Outlet /> : <Navigate to={Paths.AUTH} replace />;
};

export default PrivateRoutes;
