import { FC, PropsWithChildren } from 'react';
import styles from './auth-container.module.css';
import { Row } from 'antd';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { Loader } from '@components/loader';
import { appSelectors } from '@redux/slices';

export const AuthContainer: FC<PropsWithChildren> = ({ children }) => {
    const isLoading = useAppSelector(appSelectors.isLoading);

    return (
        <div className={styles.backgroundImageContainer}>
            <Row align={'middle'} justify={'center'} className={styles.blur}>
                {isLoading && <Loader />}
                {children}
            </Row>
        </div>
    );
};
