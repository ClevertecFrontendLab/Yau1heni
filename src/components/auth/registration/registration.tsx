import styles from './registration.module.css';
import { Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, GooglePlusOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { useLocation } from 'react-router-dom';
import { AuthPayload } from '@customTypes/auth';
import { registration } from '@redux/slices';
import { VALIDATE_PASSWORD_SCHEMA, validationMessages } from '@constants/validation.ts';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

export const Registration = () => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const { sm } = useBreakpoint();

    const onFinishHandler = ({ email, password }: AuthPayload) => {
        dispatch(registration({ email, password, pathname }));
    };

    return (
        <Form onFinish={onFinishHandler}>
            <Form.Item name='email' rules={[{ required: true, message: '' }]}>
                <Input
                    addonBefore={'e-mail: '}
                    autoComplete='on'
                    size={'large'}
                    data-test-id='registration-email'
                />
            </Form.Item>

            <Form.Item
                name='password'
                help={validationMessages.PASSWORD_HELP}
                rules={[
                    {
                        required: true,
                        pattern: VALIDATE_PASSWORD_SCHEMA,
                    },
                ]}
            >
                <Input.Password
                    placeholder='Пароль'
                    size={'large'}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    autoComplete='off'
                    data-test-id='registration-password'
                />
            </Form.Item>

            <Form.Item
                name='confirmPassword'
                dependencies={['password']}
                rules={[
                    {
                        required: true,
                        message: '',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(
                                new Error(validationMessages.CONFIRM_PASSWORD_ERROR),
                            );
                        },
                    }),
                ]}
            >
                <Input.Password
                    placeholder='Повторите пароль'
                    size={'large'}
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    autoComplete='off'
                    data-test-id='registration-confirm-password'
                />
            </Form.Item>
            <Form.Item>
                <div className={styles.buttonsContainer}>
                    <Button
                        type={'primary'}
                        htmlType='submit'
                        data-test-id='registration-submit-button'
                    >
                        Войти
                    </Button>
                    <Button type={'text'} icon={sm && <GooglePlusOutlined />}>
                        Регистрация через Google
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
};
