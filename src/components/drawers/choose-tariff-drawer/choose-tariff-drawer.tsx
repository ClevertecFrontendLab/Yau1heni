import { FC, useState } from 'react';
import { CheckCircleFilled, CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { TariffList } from '@components/settings';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { profileActions } from '@redux/slices';
import { Button, Col, Drawer, List, Row, Space, Typography } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import { tariffOptionsData } from './data/tariff-options-data.ts';

export const ChooseTariffDrawer: FC<Props> = (props) => {
    const { isOpen, onClick, dateActiveTo, isActive, dataTestId } = props;
    const dispatch = useAppDispatch();
    const { xs } = useBreakpoint();

    const [disabledPay, setDisabledPay] = useState(true);

    const closeMoreDetailsHandler = () => {
        dispatch(profileActions.setIsDrawerOpen({ isOpen: false }));
    };

    return (
        <Drawer
            open={isOpen}
            width={xs ? 360 : 408}
            title='Сравнить тарифы'
            mask={false}
            closable={false}
            destroyOnClose={true}
            placement='right'
            bodyStyle={{ padding: '32px' }}
            data-test-id={dataTestId}
            extra={
                <Button
                    onClick={closeMoreDetailsHandler}
                    data-test-id='modal-drawer-right-button-close'
                    icon={<CloseOutlined />}
                />
            }
            footer={
                !isActive && (
                    <Button
                        block={true}
                        type='primary'
                        disabled={disabledPay}
                        data-test-id='tariff-submit'
                        onClick={onClick}
                    >
                        Выбрать и оплатить
                    </Button>
                )
            }
        >
            {isActive && (
                <Row justify='center'>
                    <Typography.Title
                        level={5}
                        style={{ padding: '14px', marginBottom: '48px', color: '#030852' }}
                    >{`Ваш PRO tariff активен до ${dateActiveTo}`}</Typography.Title>
                </Row>
            )}
            <Row justify='end' style={{ marginBottom: '24px' }}>
                <Button type='text'>FREE</Button>
                <Button
                    type='link'
                    icon={isActive && <CheckCircleFilled style={{ color: '#52c41a' }} />}
                >
                    PRO
                </Button>
            </Row>

            <Space direction='vertical' size={74}>
                <List
                    dataSource={tariffOptionsData}
                    grid={{
                        gutter: 16,
                        column: 1,
                    }}
                    renderItem={({ text, statusFree }) => (
                        <List.Item>
                            <Row justify='space-between'>
                                <Col span={14}>
                                    <Typography.Text>{text}</Typography.Text>
                                </Col>
                                <Col span={1} pull={3}>
                                    {statusFree ? (
                                        <CheckCircleFilled />
                                    ) : (
                                        <CloseCircleOutlined style={{ color: '#bfbfbf' }} />
                                    )}
                                </Col>
                                <Col span={1} pull={3}>
                                    <CheckCircleFilled />
                                </Col>
                            </Row>
                        </List.Item>
                    )}
                />
                {!isActive && <TariffList setDisabledPay={setDisabledPay} />}
            </Space>
        </Drawer>
    );
};

type Props = {
    isOpen: boolean;
    isActive: boolean;
    onClick: () => void;
    dateActiveTo?: string;
    dataTestId?: string;
};
