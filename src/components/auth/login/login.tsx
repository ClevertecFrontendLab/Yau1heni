import styles from './login.module.css';
import { Button, Checkbox, Form, Input, Row } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, GooglePlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { AuthPayload } from '@customTypes/auth';
import { authActions, checkEmail, login } from '@redux/slices';
import { isRememberMeAuthSelector } from '@redux/selectors';
import { VALIDATE_PASSWORD_SCHEMA, validationMessages } from '@constants/validation.ts';

export const Login = () => {
    const dispatch = useAppDispatch();
    const [disabledConfirm, setDisabledConfirm] = useState(false);
    const { pathname } = useLocation();
    const isRememberMe = useAppSelector(isRememberMeAuthSelector);
    const [form] = Form.useForm();

    const onCheckEmailHandler = () => {
        if (form.getFieldValue('email')) {
            const formValues = form.getFieldsValue(['email']);
            dispatch(checkEmail({ email: formValues.email, pathname }));
        } else {
            setDisabledConfirm(true);
        }
    };

    const rememberMeHandler = (e: CheckboxChangeEvent) =>
        dispatch(authActions.setIsRememberMe({ isRememberMe: e.target.checked }));

    const onFinishHandler = ({ email, password }: AuthPayload) => {
        dispatch(login({ email, password, pathname }));
    };

    const formChangeHandler = () => {
        const hasErrors = form.getFieldsError(['email']).some(({ errors }) => errors.length);
        setDisabledConfirm(hasErrors);
    };

    return (
        <Form
            form={form}
            onFinish={onFinishHandler}
            onFieldsChange={formChangeHandler}
            initialValues={{ remember: true }}
        >
            <Form.Item
                name='email'
                rules={[
                    {
                        required: true,
                        type: 'email',
                        message: '',
                    },
                ]}
            >
                <Input addonBefore={'e-mail: '} autoComplete='on' data-test-id='login-email' />
            </Form.Item>
            <Form.Item
                name='password'
                rules={[
                    {
                        required: true,
                        pattern: VALIDATE_PASSWORD_SCHEMA,
                        message: validationMessages.PASSWORD_HELP,
                    },
                ]}
            >
                <Input.Password
                    placeholder='Пароль'
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    autoComplete='off'
                    data-test-id='login-password'
                />
            </Form.Item>

            <Row justify={'space-between'} align={'top'} className={styles.remember}>
                <Form.Item name='remember' valuePropName='checked'>
                    <Checkbox
                        data-test-id='login-remember'
                        value={isRememberMe}
                        onChange={rememberMeHandler}
                    >
                        Запомнить меня
                    </Checkbox>
                </Form.Item>
                <Button
                    onClick={onCheckEmailHandler}
                    disabled={disabledConfirm}
                    type={'link'}
                    style={{ textAlign: 'center' }}
                    data-test-id='login-forgot-button'
                >
                    Забыли пароль?
                </Button>
            </Row>

            <Form.Item>
                <div className={styles.buttonsContainer}>
                    <Button type='primary' htmlType='submit' data-test-id='login-submit-button'>
                        Войти
                    </Button>
                    <Button icon={<GooglePlusOutlined />} type={'text'}>
                        Войти через Google
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
};
