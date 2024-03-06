import { Navigate, Outlet } from 'react-router-dom';
import { Paths } from '@common-types/routes';
import { LocalStorageKeys } from '@constants/local-storage-keys.ts';
import { accessTokenAuthSelector } from '@redux/selectors';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';

export const PrivateRoutes = () => {
    const accessTokenFromState = useAppSelector(accessTokenAuthSelector);
    const accessTokenFromLS = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);

    const isAccessTokenFromState = accessTokenFromState !== null;
    const isAccessTokenFromLS = accessTokenFromLS !== null;

    const isAuth = isAccessTokenFromLS || isAccessTokenFromState;

    return isAuth ? <Outlet /> : <Navigate to={Paths.AUTH} replace />;
};
