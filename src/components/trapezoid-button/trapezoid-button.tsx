import styles from './trapezoid-button.module.css';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { FC } from 'react';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

export const TrapezoidButton: FC<Props> = ({ collapsed, toggleCollapsed, dataTestId }) => {
    const { xs } = useBreakpoint();

    const leftPositionValue = collapsed ? { ['left']: '0' } : { ['left']: '106px' };
    const buttonPositionStyle = xs ? leftPositionValue : {};

    return (
        <div
            data-test-id={dataTestId}
            role='button'
            tabIndex={0}
            className={styles.trapezoid}
            style={buttonPositionStyle}
            onClick={toggleCollapsed}
        >
            <span>{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</span>
        </div>
    );
};

type Props = {
    collapsed: boolean;
    toggleCollapsed: () => void;
    dataTestId: string;
};
