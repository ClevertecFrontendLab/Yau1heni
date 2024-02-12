import { MenuProps } from 'antd';

export type MenuItem = Required<MenuProps>['items'][number];

export type PropsSidebarDesktop = {
    isCollapsed: boolean;
};
export type PropsSidebarMobile = {
    setCollapsed: (collapsed: boolean) => void;
    collapsed: boolean;
};
