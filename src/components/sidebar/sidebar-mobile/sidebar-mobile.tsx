import { Button, Layout, Menu } from 'antd';
import styles from './sidebar-mobile.module.css';
import Logo from '@assets/icons/logo.svg?react';
import { itemsSideBarMobile } from '../data/items.tsx';
import { FC } from 'react';
import { PropsSidebarMobile } from '@components/sidebar/types/types.ts';

export const SidebarMobile: FC<PropsSidebarMobile> = ({ setCollapsed, collapsed }) => (
    <Layout.Sider
        collapsedWidth={0}
        onCollapse={(collapsed) => {
            setCollapsed(!collapsed);
        }}
        width={106}
        style={{
            position: 'fixed',
            height: '100vh',
            zIndex: 1,
        }}
        theme='light'
        data-test-id='sider-switch-mobile'
        collapsible
    >
        <div className={styles.logo}>
            <Logo height={18} width={72} />
        </div>

        <Menu items={itemsSideBarMobile} />

        {collapsed && (
            <Button
                style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '0',
                }}
                type='text'
            >
                Выход
            </Button>
        )}
    </Layout.Sider>
);
