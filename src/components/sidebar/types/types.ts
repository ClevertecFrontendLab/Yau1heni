import { MenuProps } from 'antd';

export type MenuItem = Required<MenuProps>['items'][number];

export type PropsSidebarDesktop = {
    isCollapsed: boolean;
};
export type PropsSidebarMobile = {
    toggleCollapsed: () => void;
    collapsed: boolean;
};
