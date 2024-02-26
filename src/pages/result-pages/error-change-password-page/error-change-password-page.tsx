import styles from '../result-pages.module.css';
import { Button, Result } from 'antd';
import { AuthContainer } from '@components/auth';
import { retryChangePassword } from '@redux/slices';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';

export const ErrorChangePasswordPage = () => {
    const dispatch = useAppDispatch();

    const retryRegistrationHandler = () => {
        dispatch(retryChangePassword());
    };

    return (
        <AuthContainer>
            <Result
                className={styles.container}
                status='error'
                title='Данные не сохранились'
                subTitle='Что-то пошло не так. Попробуйте ещё раз.'
                extra={[
                    <Button
                        type={'primary'}
                        onClick={retryRegistrationHandler}
                        block
                        key='change-retry-button'
                        data-test-id='change-retry-button'
                    >
                        Повторить
                    </Button>,
                ]}
            />
        </AuthContainer>
    );
};
