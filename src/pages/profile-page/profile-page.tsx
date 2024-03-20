import { SettingOutlined } from '@ant-design/icons';
import { MainLayout } from '@components/layout';
import { UploadPhoto } from '@pages/profile-page/upload-foto/upload-photo.tsx';
import { Button, Col, Input, Row, Typography } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import styles from './profile-page.module.css';

export const ProfilePage = () => {
    const { xs } = useBreakpoint();

    return (
        <MainLayout isWithHeader={false} isWithFooter={false}>
            <Row justify='space-between'>
                <Typography.Title>Profile</Typography.Title>
                {xs ? (
                    <SettingOutlined />
                ) : (
                    <Button type='text' icon={<SettingOutlined />}>
                        Настройки
                    </Button>
                )}
            </Row>

            <div className={styles.content}>
                <Typography.Text>Личная информация</Typography.Text>
                <Row>
                    <Col>
                        <UploadPhoto />
                    </Col>
                    <Col>
                        <Input placeholder='Имя' />
                        <Input placeholder='Фамилия' />
                        <Input addonAfter='Дата рождения' />
                    </Col>
                </Row>
                <Typography.Text>Приватность и авторизация</Typography.Text>
                <Input addonAfter='e-mail' />
                <Input placeholder='Пароль' />
                <Input addonAfter='Повторите пароль' />

                <Button>Сохранить</Button>
            </div>
        </MainLayout>
    );
};
