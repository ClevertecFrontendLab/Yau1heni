import { Button, Layout, Menu } from 'antd';
import styles from './sidebar-mobile.module.css';
import Logo from '@assets/icons/logo.svg?react';
import { itemsSideBarMobile } from '../data/items.tsx';
import { FC } from 'react';
import { PropsSidebarMobile } from '@components/sidebar/types/types.ts';
import { TrapezoidButton } from '@components/trapezoid-button';

export const SidebarMobile: FC<PropsSidebarMobile> = ({ toggleCollapsed, collapsed, logout }) => (
    <div>
        <Layout.Sider
            collapsedWidth={0}
            trigger={null}
            width={106}
            style={{
                position: 'fixed',
                height: '100%',
                zIndex: 1,
                left: 0,
                top: 0,
                bottom: 0,
            }}
            theme='light'
            collapsible
            collapsed={collapsed}
        >
            <div className={styles.logo}>
                <Logo height={18} width={72} />
            </div>

            <Menu items={itemsSideBarMobile} />

            <TrapezoidButton
                collapsed={collapsed}
                toggleCollapsed={toggleCollapsed}
                dataTestId={'sider-switch-mobile'}
                /*style={{left: '106px'}}*/
            />

            {!collapsed && (
                <Button
                    style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '0',
                    }}
                    type='text'
                    onClick={logout}
                >
                    Выход
                </Button>
            )}
        </Layout.Sider>
    </div>
);
