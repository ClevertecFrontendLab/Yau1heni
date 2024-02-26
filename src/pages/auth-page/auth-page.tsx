import styles from './auth-page.module.css';
import { Tabs } from 'antd';
import Logo from '@assets/icons/logo.svg?react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContainer } from '@components/auth';
import { items } from './items/items.tsx';

const AuthPage = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    return (
        <AuthContainer>
            <div className={styles.auth}>
                <Logo className={styles.logo} />
                <Tabs
                    onTabClick={(key) => navigate(key)}
                    size={'large'}
                    items={items}
                    defaultActiveKey={pathname}
                    centered
                />
            </div>
        </AuthContainer>
    );
};

export default AuthPage;
