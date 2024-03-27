import { FC, PropsWithChildren, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ErrorServerModal } from '@components/modals';
import { SettingsButton } from '@components/settings';
import { Sidebar } from '@components/sidebar';
import { TrapezoidButton } from '@components/trapezoid-button';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { trainingActions, trainingSelectors } from '@redux/slices';
import { Button, Layout, Row, Typography } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import styles from './basic-layout.module.css';

export const BasicLayout: FC<Props> = (props) => {
    const { title, onclick, typeTitle = 'text', children, dataTestId } = props;

    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useAppDispatch();

    const { xs } = useBreakpoint();
    const isError = useAppSelector(trainingSelectors.isErrorMain);
    const clearError = () => {
        dispatch(trainingActions.setIsErrorMain({ isError: false }));
    };

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout>
            <Sidebar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
            <Layout>
                {/* <Breadcrumbs /> */}
                <div className={styles.header}>
                    <Row justify='space-between' align='middle'>
                        {typeTitle === 'text' ? (
                            <Typography.Title level={4}>{title}</Typography.Title>
                        ) : (
                            <Button
                                onClick={onclick}
                                icon={<ArrowLeftOutlined />}
                                data-test-id={dataTestId}
                            >
                                {title}
                            </Button>
                        )}

                        <SettingsButton />
                    </Row>
                </div>

                <div className={styles.backgroundImageContainer}>
                    <Layout.Content>
                        {!xs && (
                            <TrapezoidButton
                                collapsed={collapsed}
                                toggleCollapsed={toggleCollapsed}
                                dataTestId='sider-switch'
                            />
                        )}
                        <div className={styles.content}>{children}</div>
                        <ErrorServerModal clearError={clearError} isError={isError} />
                    </Layout.Content>
                </div>
            </Layout>
        </Layout>
    );
};

type Props = {
    title?: string;
    typeTitle?: 'button' | 'text';
    onclick?: () => void;
    dataTestId?: string;
} & PropsWithChildren;
