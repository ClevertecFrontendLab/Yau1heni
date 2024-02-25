import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { AuthContainer } from '@components/auth';
import styles from './confirm-email-page.module.css';
import { Result, Typography } from 'antd';
import VerificationInput from 'react-verification-input';
import {
    checkEmailAuthSelector,
    codeAuthSelector,
    isErrorConfirmEmailAuthSelector,
} from '@redux/selectors';
import { authActions, confirmEmail } from '@redux/slices';

export const ConfirmEmailPage = () => {
    const dispatch = useAppDispatch();

    const code = useAppSelector(codeAuthSelector);
    const isError = useAppSelector(isErrorConfirmEmailAuthSelector);
    const email = useAppSelector(checkEmailAuthSelector);

    const onCompleteHandler = (code: string) => {
        dispatch(confirmEmail(code));
    };
    const onChangeHandler = (code: string) => {
        dispatch(authActions.setConfirmEmail({ code }));
    };

    const status = isError ? 'error' : 'info';

    const textTitle = isError
        ? 'Неверный код. Введите код для восстановления аккауанта'
        : 'Введите код для восстановления аккауанта';

    const textSubTitle = `Мы отправили вам на e-mail ${email} шестизначный код. Введите его в поле ниже.`;

    return (
        <AuthContainer>
            <Result
                className={styles.confirmEmailPage}
                status={status}
                title={textTitle}
                subTitle={textSubTitle}
                extra={[
                    <VerificationInput
                        value={code}
                        placeholder={''}
                        onChange={onChangeHandler}
                        onComplete={onCompleteHandler}
                        classNames={{
                            container: styles.verificationInputContainer,
                            character: isError ? styles.characterError : styles.character,
                            characterInactive: styles.characterInactive,
                        }}
                        key='verification-input'
                        inputProps={{ 'data-test-id': 'verification-input' }}
                    />,
                    <Typography.Text key='text' type={'secondary'}>
                        Не пришло письмо? Проверьте папку Спам
                    </Typography.Text>,
                ]}
            />
        </AuthContainer>
    );
};
