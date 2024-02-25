import { Navigate, Route, Routes } from 'react-router-dom';
import { Paths } from '@customTypes/routes';
import { PrivateRoutes } from '@components/private-routes';
import { MainPage } from '@pages/main-page';
import { NonAuthRoutes } from '@components/non-private-routes';
import { AuthPage } from '@pages/auth-page';
import { ConfirmEmailPage } from '@pages/confirm-email-page';
import { ChangePasswordPage } from '@pages/change-password-page';
import { ProtectedResultRoutes } from '@components/protected-result-routes';
import {
    ErrorChangePasswordPage,
    ErrorCheckEmailNoExistPage,
    ErrorCheckEmailPage,
    ErrorLoginPage,
    ErrorRegistrationPage,
    ErrorUserExistPage,
    SuccessChangePasswordPage,
    SuccessPage,
} from '@pages/result-pages';
import { NotFoundPage } from '@pages/not-found-page';

export const routes = (
    <Routes>
        <Route path={'/'} element={<Navigate to={Paths.MAIN} />} />

        <Route element={<PrivateRoutes />}>
            <Route path={Paths.MAIN} element={<MainPage />} />
        </Route>

        <Route element={<NonAuthRoutes />}>
            <Route path={Paths.AUTH} element={<AuthPage />} />
            <Route path={Paths.REGISTRATION} element={<AuthPage />} />
            <Route path={Paths.CONFIRM_EMAIL} element={<ConfirmEmailPage />} />
            <Route path={Paths.CHANGE_PASSWORD} element={<ChangePasswordPage />} />
        </Route>

        <Route element={<ProtectedResultRoutes />}>
            <Route path={Paths.RESULT}>
                <Route path={Paths.SUCCESS} element={<SuccessPage />} />
                <Route
                    path={Paths.SUCCESS_CHANGE_PASSWORD}
                    element={<SuccessChangePasswordPage />}
                />
                <Route path={Paths.ERROR_LOGIN} element={<ErrorLoginPage />} />
                <Route path={Paths.ERROR_REGISTRATION} element={<ErrorRegistrationPage />} />
                <Route path={Paths.ERROR_USER_EXIST} element={<ErrorUserExistPage />} />
                <Route
                    path={Paths.ERROR_CHECK_EMAIL_NO_EXIST}
                    element={<ErrorCheckEmailNoExistPage />}
                />
                <Route path={Paths.ERROR_CHECK_EMAIL} element={<ErrorCheckEmailPage />} />
                <Route path={Paths.ERROR_CHANGE_PASSWORD} element={<ErrorChangePasswordPage />} />
            </Route>
        </Route>

        <Route path={'*'} element={<Navigate to={Paths.NOT_FOUND} />} />
        <Route path={Paths.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
);