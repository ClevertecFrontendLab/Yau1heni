import { FC } from 'react';
import { push } from 'redux-first-history';
import Exit from '@assets/icons/exit.svg?react';
import Logo from '@assets/icons/logo.svg?react';
import ShortLogo from '@assets/icons/short-logo.svg?react';
import { PageName, Paths } from '@common-types/routes';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { getTrainings } from '@redux/slices';
import { Button, Layout, Menu } from 'antd';

import { itemsSideBar } from '../data/items.tsx';
import { PropsSidebarDesktop } from '../types/types.ts';

import styles from './sidebar-desktop.module.css';

export const SidebarDesktop: FC<PropsSidebarDesktop> = ({ isCollapsed, logout }) => {
    const dispatch = useAppDispatch();

    const pageTurnHandler = (type: string) => {
        alert(type);
        if (type === PageName.CALENDAR) dispatch(getTrainings());
        if (type === PageName.PROFILE) dispatch(push(Paths.PROFILE));
    };

    return (
        <Layout.Sider
            width={208}
            collapsedWidth={64}
            trigger={null}
            theme='light'
            collapsible={true}
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
