import { Button, Layout, Menu } from 'antd';
import styles from './sidebar-desktop.module.css';
import ShortLogo from '@assets/icons/short-logo.svg?react';
import Logo from '@assets/icons/logo.svg?react';
import Exit from '@assets/icons/exit.svg?react';
import { FC } from 'react';
import { itemsSideBar } from '../data/items.tsx';
import { PropsSidebarDesktop } from '../types/types.ts';
import { getTrainings } from '@redux/slices';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { PageName } from '@common-types/routes';

export const SidebarDesktop: FC<PropsSidebarDesktop> = ({ isCollapsed, logout }) => {
    const dispatch = useAppDispatch();

    const pageTurnHandler = (type: string) => {
        if (type === PageName.CALENDAR) dispatch(getTrainings());
    };

    return (
        <Layout.Sider
            width={208}
            collapsedWidth={64}
            trigger={null}
            theme='light'
            collapsible
            collapsed={isCollapsed}
        >
            <div className={styles.logo}>
                {isCollapsed ? (
                    <ShortLogo height={32} width={32} />
                ) : (
                    <Logo height={32} width={132} />
                )}
            </div>

            <Menu onClick={({ key }) => pageTurnHandler(key)} items={itemsSideBar} />

            <Button
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                }}
                type='text'
                onClick={logout}
                icon={<Exit style={{ marginRight: '24px' }} />}
            >
                {isCollapsed ? null : 'Выход'}
            </Button>
        </Layout.Sider>
    );
};
