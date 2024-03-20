import { SettingOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

import styles from './header.module.css';

export const Header = () => {
    const { xs } = useBreakpoint();

    return (
        <div className={styles.header}>
            <Row justify='space-between' gutter={16}>
                <Col span={20}>
                    <Typography.Text className={styles.text}>
                        Приветствуем тебя в CleverFit — приложении,
                        <br /> которое поможет тебе добиться своей мечты!
                    </Typography.Text>
                </Col>
                <Col span={4}>
                    {xs ? (
                        <SettingOutlined />
                    ) : (
                        <Button type='text' icon={<SettingOutlined />}>
                            Настройки
                        </Button>
                    )}
                </Col>
            </Row>
        </div>
    );
};
