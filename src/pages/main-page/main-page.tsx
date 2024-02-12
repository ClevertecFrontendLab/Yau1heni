import { useState } from 'react';
import styles from './main-page.module.css';
import { Layout } from 'antd';
import { MainContent } from '@components/content';
import { Header } from '@components/header';
import { SidebarMobile, SidebarDesktop } from '@components/sidebar';
import { Footer } from '@components/footer';
import { TrapezoidButton } from '@components/trapezoid-button';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

export const MainPage = () => {
    const [collapsed, setCollapsed] = useState(false);

    const { xs } = useBreakpoint();

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout className={styles.mainContainer}>
            {xs ? (
                <SidebarMobile collapsed={collapsed} setCollapsed={setCollapsed} />
            ) : (
                <SidebarDesktop isCollapsed={collapsed} />
            )}

            <Layout>
                <Header />
                <div className={styles.backgroundImageContainer}>
                    {!xs && (
                        <TrapezoidButton collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
                    )}

                    <Layout.Content>
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
