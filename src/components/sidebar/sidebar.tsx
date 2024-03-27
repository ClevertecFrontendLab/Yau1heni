import { FC } from 'react';
import { push } from 'redux-first-history';
import { PageName, Paths } from '@common-types/routes';
import { LocalStorageKeys } from '@constants/local-storage-keys.ts';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { authActions, getTrainings } from '@redux/slices';
import { navigateTo } from '@utils/navigate-to';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { SidebarDesktop } from './sidebar-desktop/sidebar-desktop';
import { SidebarMobile } from './sidebar-mobile/sidebar-mobile';

export const Sidebar: FC<Props> = ({ collapsed, toggleCollapsed }) => {
    const dispatch = useAppDispatch();

    const { xs } = useBreakpoint();

    const pageTurnHandler = (key: string) => {
        if (key === PageName.CALENDAR) dispatch(getTrainings());
        if (key === PageName.PROFILE) dispatch(push(Paths.PROFILE));
    };

    const logoutHandler = () => {
        localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
        dispatch(authActions.setAccessToken({ accessToken: null }));
        navigateTo({ dispatch, toPath: Paths.AUTH });
    };

    return xs ? (
        <SidebarMobile
            collapsed={!collapsed}
            toggleCollapsed={toggleCollapsed}
            logout={logoutHandler}
            onClick={pageTurnHandler}
        />
    ) : (
        <SidebarDesktop onClick={pageTurnHandler} isCollapsed={collapsed} logout={logoutHandler} />
    );
};

type Props = {
    collapsed: boolean;
    toggleCollapsed: () => void;
};
