import { FC } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Button, Card, Image, Row, Space, Typography } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

export const SettingsTariffCard: FC<Props> = (props) => {
    const { typeCard, imageSrc, onClick, dateActiveTo, isActivityPRO = false, dateTestId } = props;

    const { xs } = useBreakpoint();
    const tariffTitle = typeCard === 'FREE' ? 'FREE tariff' : 'PRO tariff';

    const activeStatusProCard = isActivityPRO ? (
        <Typography.Text>{`активен до ${dateActiveTo}`}</Typography.Text>
    ) : (
        <Button type='primary' data-test-id='activate-tariff-btn'>
            Активировать
        </Button>
    );

    const activeStatus =
        typeCard === 'FREE' ? (
            <Button icon={<CheckOutlined />} type='text'>
                активен
            </Button>
        ) : (
            activeStatusProCard
        );

    return (
        <Card
            bodyStyle={xs ? { padding: 0 } : { padding: '16px 0' }}
            bordered={false}
            data-test-id={dateTestId}
        >
            <Space direction='vertical'>
                <Row justify='space-around' align='middle'>
                    <Typography.Title level={5}>{tariffTitle}</Typography.Title>
                    <Button type='link' style={{ marginBottom: '8px' }} onClick={onClick}>
                        Подробнее
                    </Button>
                </Row>
                <Image src={imageSrc} preview={false} />
                {activeStatus}
            </Space>
        </Card>
    );
};

type Props = {
    typeCard?: 'PRO' | 'FREE';
    onClick?: () => void;
    imageSrc: string;
    isActivityPRO?: boolean;
    dateActiveTo?: string;
    dateTestId?: string;
};
