import { FC } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Switch, Tooltip, Typography } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

export const SettingAdditionalItem: FC<Props> = (props) => {
    const { tooltipTitle, title, onChange, checked, dateTestId, switchDisabled = false } = props;
    const { xs } = useBreakpoint();

    return (
        <Row justify='space-between' style={{ maxWidth: '505px', marginBottom: '18px' }}>
            <Col span={20}>
                <Typography.Text style={{ marginRight: '4px' }}>{title}</Typography.Text>
                <Tooltip placement={xs ? 'top' : 'bottom'} title={tooltipTitle}>
                    <InfoCircleOutlined
                        data-test-id={dateTestId?.iconId}
                        style={{ color: '#8c8c8c' }}
                    />
                </Tooltip>
            </Col>
            <Col span={2} pull={xs ? 2 : 0}>
                <Switch
                    size={xs ? 'small' : 'default'}
                    disabled={switchDisabled}
                    data-test-id={dateTestId?.switchId}
                    defaultChecked={checked}
                    onChange={onChange}
                />
            </Col>
        </Row>
    );
};

type Props = {
    title: string;
    tooltipTitle: string;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    dateTestId?: { iconId: string; switchId: string };
    switchDisabled?: boolean;
};
