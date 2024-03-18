import styles from '../result-pages.module.css';
import { Button, Result } from 'antd';
import { AuthContainer } from '@components/auth';
import { useDispatch } from 'react-redux';
import { Paths } from '@common-types/routes';
import { navigateTo } from '@utils/navigate-to';
import { useLocation } from 'react-router-dom';

export const SuccessChangePasswordPage = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const navigateToLoginHandler = () =>
        navigateTo({ dispatch, toPath: Paths.AUTH, currentPath: pathname });

    return (
        <AuthContainer>
            <Result
                className={styles.container}
                status='success'
                title='Пароль успешно сохранен'
                subTitle='Теперь можно войти в аккаунт, используя свой логин и новый пароль'
                extra={[
                    <Button
                        type={'primary'}
                        onClick={navigateToLoginHandler}
                        block
                        key='change-entry-button'
                        data-test-id='change-entry-button'
                    >
                        Войти
                    </Button>,
                ]}
            />
        </AuthContainer>
    );
};
