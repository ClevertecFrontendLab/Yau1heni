import { Button, Card, Col, Row, Typography } from 'antd';
import styles from './footer.module.css';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

export const Footer = () => {
    const { xs } = useBreakpoint();

    const styleButtonFeedback = xs
        ? { ['letterSpacing']: '0.8px', ['paddingTop']: '30px' }
        : { ['letterSpacing']: '0.8px' };

    return (
        <Row
            justify={{
                ['md']: 'space-between',
                ['xs']: 'center',
            }}
        >
            <Col
                lg={7}
                md={{
                    order: 1,
                    span: 10,
                }}
                sm={{ order: 0 }}
                xs={22}
            >
                <Card
                    actions={[
                        <Button icon={<AndroidFilled />} type='text'>
                            Android OS
                        </Button>,
                        <Button icon={<AppleFilled />} type='text'>
                            Apple iOS
                        </Button>,
                    ]}
                >
                    <Col>
                        <Button type='link' className={styles.button}>
                            Скачать на телефон
                        </Button>
                    </Col>
                    <Col>
                        <Typography.Text>Доступно в PRO-тарифе</Typography.Text>
                    </Col>
                </Card>
            </Col>
            <Row align={'bottom'}>
                <Button style={styleButtonFeedback} type='link'>
                    Смотреть отзывы
                </Button>
            </Row>
        </Row>
    );
};
