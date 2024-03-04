import { Button, Col, Row, Typography } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import styles from './header.module.css';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

export const Header = () => {
    const { xs } = useBreakpoint();

    return (
        <div className={styles.header}>
            <Row justify='space-between'>
                <Col span={19}>
                    <Typography.Text className={styles.text}>
                        Приветствуем тебя в CleverFit — приложении,
                        <br /> которое поможет тебе добиться своей мечты!
                    </Typography.Text>
                </Col>
                <Col span={3}>
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
