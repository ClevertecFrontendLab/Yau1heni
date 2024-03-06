import { Layout } from 'antd';
import { SidebarDesktop, SidebarMobile } from '@components/sidebar';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { FC, PropsWithChildren, useState } from 'react';
import { LocalStorageKeys } from '@constants/local-storage-keys.ts';
import { authActions } from '@redux/slices';
import { navigateTo } from '@utils/navigate-to.ts';
import { Paths } from '@customTypes/routes';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { Header } from '@components/header';
import { TrapezoidButton } from '@components/trapezoid-button';
import { Footer } from '@components/footer';
import styles from './main-layout.module.css';
import { Breadcrumbs } from '@components/breadcrumbs';

export const MainLayout: FC<Props> = (props) => {
    const { isWithHeader = true, isWithFooter = true, children } = props;

    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useAppDispatch();

    const { xs } = useBreakpoint();

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const logoutHandler = () => {
        localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
        dispatch(authActions.setAccessToken({ accessToken: null }));
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
                <Breadcrumbs />
                {isWithHeader && <Header />}

                <div className={styles.backgroundImageContainer}>
                    <Layout.Content>
                        {!xs && (
                            <TrapezoidButton
                                collapsed={collapsed}
                                toggleCollapsed={toggleCollapsed}
                                dataTestId={'sider-switch'}
                            />
                        )}
                        {children}
                    </Layout.Content>
                    {isWithFooter && (
                        <Layout.Footer>
                            <Footer />
                        </Layout.Footer>
                    )}
                </div>
            </Layout>
        </Layout>
    );
};

type Props = {
    isWithHeader?: boolean;
    isWithFooter?: boolean;
} & PropsWithChildren;
