import { useState } from 'react';
import styles from './main-page.module.css';
import { Layout } from 'antd';
import { MainContent } from '@components/content';
import { Header } from '@components/header';
import { SidebarMobile, SidebarDesktop } from '@components/sidebar';
import { Footer } from '@components/footer';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { TrapezoidButton } from '@components/trapezoid-button';

export const MainPage = () => {
    const [collapsed, setCollapsed] = useState(false);

    const { xs } = useBreakpoint();

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout className={styles.mainContainer}>
            {xs ? (
                <SidebarMobile collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
            ) : (
                <SidebarDesktop isCollapsed={collapsed} />
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
