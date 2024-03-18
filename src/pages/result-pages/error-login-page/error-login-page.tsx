import styles from '../result-pages.module.css';
import { Button, Result } from 'antd';
import { AuthContainer } from '@components/auth';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { Paths } from '@common-types/routes';
import { navigateTo } from '@utils/navigate-to';
import { useLocation } from 'react-router-dom';

export const ErrorLoginPage = () => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const navigateToLoginHandler = () =>
        navigateTo({ dispatch, toPath: Paths.AUTH, currentPath: pathname });

    return (
        <AuthContainer>
            <Result
                className={styles.container}
                status='warning'
                title='Вход не выполнен'
                subTitle='Что-то пошло не так. Попробуйте ещё раз.'
                extra={[
                    <Button
                        type={'primary'}
                        onClick={navigateToLoginHandler}
                        block
                        key='login-retry-button'
                        data-test-id='login-retry-button'
                    >
                        Повторить
                    </Button>,
                ]}
            />
        </AuthContainer>
    );
};
