import styles from '../result-pages.module.css';
import { Button, Result } from 'antd';
import { AuthContainer } from '@components/auth';
import { Paths } from '@customTypes/routes';
import { useDispatch } from 'react-redux';
import { navigateTo } from '@utils/navigate-to.ts';
import { useLocation } from 'react-router-dom';

export const ErrorUserExistPage = () => {
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const navigateToRegistrationHandler = () =>
        navigateTo({ dispatch, toPath: Paths.REGISTRATION, currentPath: pathname });

    return (
        <AuthContainer>
            <Result
                className={styles.container}
                status='error'
                title='Данные не сохранились'
                subTitle='Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.'
                extra={[
                    <Button
                        type={'primary'}
                        onClick={navigateToRegistrationHandler}
                        block
                        key='registration-back-button'
                        data-test-id='registration-back-button'
                    >
                        Назад к регистрации
                    </Button>,
                ]}
            />
        </AuthContainer>
    );
};
