import { FC } from 'react';
import styles from './feedback-item.module.css';
import { Feedback } from '@customTypes/feedback';
import { Avatar, Col, Rate, Row, Typography } from 'antd';
import { StarFilled, StarTwoTone, UserOutlined } from '@ant-design/icons';
import { formatDate } from '@utils/format-date.ts';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

export const FeedbackItem: FC<Props> = ({ feedback }) => {
    const { createdAt, message, rating, imageSrc, fullName } = feedback;

    const { xs } = useBreakpoint();

    const avatar =
        feedback.imageSrc === null ? (
            <Avatar size={64} icon={<UserOutlined />} />
        ) : (
            <Avatar size={64} src={imageSrc} alt={'avatar'} />
        );

    const characterRateHandler = ({ index, value }: { index?: number; value?: number }) => {
        if (index !== undefined && value !== undefined) {
            if (index < value) {
                return <StarFilled style={{ color: '#faad14' }} />;
            } else {
                return <StarTwoTone twoToneColor={'#faad14'} />;
            }
        }
    };

    return (
        <Row className={styles.feedbackItem}>
            <Col sm={4} xs={24}>
                <div className={styles.userInfo}>
                    {avatar}
                    <Typography.Title level={5} className={styles.fullName}>
                        {fullName}
                    </Typography.Title>
                </div>
            </Col>
            <Col sm={20} xs={24}>
                <div>
                    <Rate
                        value={rating}
                        disabled
                        character={characterRateHandler}
                        className={styles.rating}
                    />
                    {!xs && (
                        <Typography.Text type={'secondary'}>
                            {formatDate({ date: createdAt, format: 'DD.MM.YYYY' })}
                        </Typography.Text>
                    )}
                </div>
                <Typography.Paragraph type={'secondary'}>{message}</Typography.Paragraph>
            </Col>
        </Row>
    );
};

type Props = {
    feedback: Feedback;
};
