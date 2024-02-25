import { FC, PropsWithChildren } from 'react';
import styles from './auth-container.module.css';
import { Row } from 'antd';
import { useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { isLoadingAuthSelector } from '@redux/selectors';
import { Loader } from '@components/loader';

export const AuthContainer: FC<PropsWithChildren> = ({ children }) => {
    const isLoading = useAppSelector(isLoadingAuthSelector);

    return (
        <div className={styles.backgroundImageContainer}>
            <Row align={'middle'} justify={'center'} className={styles.blur}>
                {isLoading && <Loader />}
                {children}
            </Row>
        </div>
    );
};
