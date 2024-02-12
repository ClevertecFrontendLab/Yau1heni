import styles from './trapezoid-button.module.css';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { FC } from 'react';

export const TrapezoidButton: FC<Props> = ({ collapsed, toggleCollapsed }) => (
    <div
        data-test-id='sider-switch'
        role='button'
        tabIndex={0}
        className={styles.trapezoid}
        onClick={toggleCollapsed}
    >
        <span>{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</span>
    </div>
);

type Props = {
    collapsed: boolean;
    toggleCollapsed: () => void;
};
