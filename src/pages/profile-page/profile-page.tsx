import { useState } from 'react';
import { DeleteOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { DateFormat } from '@common-types/training';
import { BasicLayout } from '@components/layout';
import { ErrorNotificationModal } from '@components/modals';
import { VALIDATE_PASSWORD_SCHEMA, validationMessages } from '@constants/validation.ts';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { profileActions, profileSelectors, updateUser } from '@redux/slices';
import { Alert, Button, Col, DatePicker, Form, Image, Input, Row, Typography } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { UploadPhoto } from './upload-foto/upload-photo.tsx';

import styles from './profile-page.module.css';

export const ProfilePage = () => {
    const dispatch = useAppDispatch();

    const [disabled, setDisabled] = useState(true);
    const { xs } = useBreakpoint();
    const [form] = Form.useForm();
    const user = useAppSelector(profileSelectors.user);
    const imgSrc = useAppSelector(profileSelectors.imgSrc);
    const isErrorFileSize = useAppSelector(profileSelectors.isErrorFileSize);
    const isProfileUpdate = useAppSelector(profileSelectors.isSuccessUpdate);

    const onFinishHandler = (value: FormProfileData) => {
        dispatch(updateUser({ ...value, imgSrc }));
    };

    type FormProfileData = {
        email: string;
        firstName?: string;
        lastName?: string;
        birthday?: string;
    };

    const clearError = () => {
        dispatch(profileActions.setIsErrorFileSize({ isError: false }));
        setDisabled(true);
    };

    const renderPasswordIcon = (visible: boolean) =>
        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />;

    const onChange = () => {
        if (disabled) setDisabled(false);
    };

    const onCloseAlertHandler = () => {
        dispatch(profileActions.setIsSuccessUpdate({ isSuccess: false }));
    };

    return (
        <BasicLayout title='Профиль'>
            <Typography.Title level={5} style={{ marginBottom: '24px', fontWeight: '500' }}>
                Личная информация
            </Typography.Title>
            <div className={styles.profileContent}>
                <Form form={form} onChange={onChange} onFinish={onFinishHandler}>
                    <div className={styles.personalInfo}>
                        <Row justify='space-between'>
                            {user?.imgSrc ? (
                                <div data-test-id='profile-avatar'>
                                    <Image src={user.imgSrc} width={86} height={86} alt='avatar' />
                                </div>
                            ) : (
                                <UploadPhoto />
                            )}
                            {xs && (
                                <DeleteOutlined style={{ color: '#8c8c8c', padding: '0 8px' }} />
                            )}
                        </Row>
                        <Col>
                            <Form.Item name='firstName'>
                                <Input
                                    style={{ width: '100%' }}
                                    placeholder='Имя'
                                    data-test-id='profile-name'
                                />
                            </Form.Item>
                            <Form.Item name='lastName'>
                                <Input placeholder='Фамилия' data-test-id='profile-surname' />
                            </Form.Item>
                            <Form.Item name='birthday'>
                                <DatePicker
                                    format={DateFormat.EURO_DATE}
                                    placeholder='Дата рождения'
                                    style={{ width: '100%' }}
                                    data-test-id='profile-birthday'
                                />
                            </Form.Item>
                        </Col>
                    </div>
                    <Typography.Title level={5} style={{ marginBottom: '24px', fontWeight: '500' }}>
                        Приватность и авторизация
                    </Typography.Title>
                    <Form.Item
                        name='email'
                        initialValue={user?.email}
                        rules={[
                            {
                                required: true,
                                type: 'email',
                                message: '',
                            },
                        ]}
                    >
                        <Input addonBefore='e-mail: ' data-test-id='profile-email' />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        help={validationMessages.PASSWORD_HELP}
                        rules={[
                            {
                                pattern: VALIDATE_PASSWORD_SCHEMA,
                                message: validationMessages.PASSWORD_HELP,
                            },
                        ]}
                    >
                        <Input.Password
                            autoComplete='off'
                            iconRender={renderPasswordIcon}
                            placeholder='Пароль'
                            data-test-id='profile-password'
                        />
                    </Form.Item>
                    <Form.Item
                        name='confirmPassword'
                        dependencies={['password']}
                        validateTrigger={['onChange']}
                        rules={[
                            {
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
                            autoComplete='off'
                            iconRender={renderPasswordIcon}
                            data-test-id='profile-repeat-password'
                        />
                    </Form.Item>

                    <Button
                        disabled={disabled || isProfileUpdate}
                        block={xs}
                        type='primary'
                        htmlType='submit'
                        data-test-id='profile-submit'
                        className={styles.button}
                    >
                        Сохранить изменения
                    </Button>
                </Form>
            </div>

            <ErrorNotificationModal
                clearError={clearError}
                colorIcon='#ff4d4f'
                isError={isErrorFileSize}
                textTitle='Файл слишком большой'
                textSecondary='Выберите файл размером 5 МБ.'
                textButton='Закрыть'
                dataTestId='alert'
            />
            {isProfileUpdate && (
                <Alert
                    message={
                        <Typography.Title level={5}>
                            Данные профиля успешно обновлены
                        </Typography.Title>
                    }
                    type='success'
                    closable={true}
                    onClose={onCloseAlertHandler}
                    showIcon={true}
                    data-test-id='alert'
                />
            )}
        </BasicLayout>
    );
};
