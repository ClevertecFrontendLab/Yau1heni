import { useState } from 'react';
import styles from './main-page.module.css';
import { Layout } from 'antd';
import { MainContent } from '@components/content';
import { Header } from '@components/header';
import { SidebarDesktop, SidebarMobile } from '@components/sidebar';
import { Footer } from '@components/footer';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { TrapezoidButton } from '@components/trapezoid-button';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { Paths } from '@customTypes/routes';
import { navigateTo } from '@utils/navigate-to.ts';
import { LocalStorageKeys } from '@constants/local-storage-keys.ts';
import { authActions } from '@redux/slices';

const MainPage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useAppDispatch();

    const { xs } = useBreakpoint();

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const logoutHandler = () => {
        localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
        navigateTo({ dispatch, toPath: Paths.AUTH });
    };

    return (
        <Layout>
            {xs ? (
                <SidebarMobile
                    collapsed={collapsed}
                    toggleCollapsed={toggleCollapsed}
                    logout={logoutHandler}
                />
            ) : (
                <SidebarDesktop isCollapsed={collapsed} logout={logoutHandler} />
            )}

            <Layout>
                <Header />

                <div className={styles.backgroundImageContainer}>
                    <Layout.Content>
                        {!xs && (
                            <TrapezoidButton
                                collapsed={collapsed}
                                toggleCollapsed={toggleCollapsed}
                                dataTestId={'sider-switch'}
                            />
                        )}
                        <MainContent />
                    </Layout.Content>

                    <Layout.Footer>
                        <Footer />
                    </Layout.Footer>
                </div>
            </Layout>
        </Layout>
    );
};

export default MainPage;
