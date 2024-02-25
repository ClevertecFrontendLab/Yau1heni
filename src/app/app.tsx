import { history } from '@redux/configure-store.ts';
import { HistoryRouter } from 'redux-first-history/rr6';
import styles from './app.module.css';
import { Suspense } from 'react';
import { Loader } from '@components/loader';
import { routes } from './routes.tsx';

export const App = () => (
    <Suspense fallback={<Loader />}>
        <div className={styles.app}>
            <HistoryRouter history={history}>{routes}</HistoryRouter>
        </div>
    </Suspense>
);
