import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { AuthContainer } from '@components/auth';
import styles from './change-password-page.module.css';
import { Button, Form, Input, Typography } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { ChangePasswordPayload } from '@customTypes/auth';
import { useLocation } from 'react-router-dom';
import { changePassword } from '@redux/slices';
import { validationMessages, VALIDATE_PASSWORD_SCHEMA } from '@constants/validation.ts';

export const ChangePasswordPage = () => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const onFinishHandler = ({ password, confirmPassword }: ChangePasswordPayload) => {
        dispatch(changePassword({ password, confirmPassword, pathname }));
    };

    return (
        <AuthContainer>
            <div className={styles.changePassword}>
                <Typography.Title level={3}>Восстановление пароля</Typography.Title>

                <Form onFinish={onFinishHandler} autoComplete='off'>
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
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                            data-test-id='change-password'
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
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                            data-test-id='change-confirm-password'
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type={'primary'}
                            className={styles.button}
                            block
                            htmlType='submit'
                            data-test-id='change-submit-button'
                        >
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </AuthContainer>
    );
};
