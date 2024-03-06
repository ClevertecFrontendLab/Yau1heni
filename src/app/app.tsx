import { history } from '@redux/configure-store.ts';
import { HistoryRouter } from 'redux-first-history/rr6';
import styles from './app.module.css';
import { Suspense } from 'react';
import { Loader } from '@components/loader';
import { routes } from './routes.tsx';
import { LocalStorageKeys } from '@constants/local-storage-keys.ts';

export const App = () => {
    const accessTokenFromGoogle = history.location.search?.split('=')[1];
    if (accessTokenFromGoogle) {
        localStorage.setItem(LocalStorageKeys.ACCESS_TOKEN, accessTokenFromGoogle);
    }

    return (
        <Suspense fallback={<Loader />}>
            <div className={styles.app}>
                <HistoryRouter history={history}>{routes}</HistoryRouter>
            </div>
        </Suspense>
    );
};
