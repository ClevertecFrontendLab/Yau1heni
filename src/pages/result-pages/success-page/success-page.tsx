import styles from '../result-pages.module.css';
import { Button, Result } from 'antd';
import { AuthContainer } from '@components/auth';
import { useDispatch } from 'react-redux';
import { Paths } from '@customTypes/routes';
import { navigateTo } from '@utils/navigate-to.ts';
import { useLocation } from 'react-router-dom';

export const SuccessPage = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const navigateToLoginHandler = () =>
        navigateTo({ dispatch, toPath: Paths.AUTH, currentPath: pathname });

    return (
        <AuthContainer>
            <Result
                className={styles.container}
                status='success'
                title='Регистрация успешна'
                subTitle='Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.'
                extra={[
                    <Button
                        type={'primary'}
                        onClick={navigateToLoginHandler}
                        block
                        key='registration-enter-button'
                        data-test-id='registration-enter-button'
                    >
                        Войти
                    </Button>,
                ]}
            />
        </AuthContainer>
    );
};
