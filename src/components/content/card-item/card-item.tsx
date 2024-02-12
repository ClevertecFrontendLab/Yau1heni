import { Button, Card, Typography } from 'antd';
import { FC, ReactNode } from 'react';
import styles from './card-item.module.css';

export const CardItem: FC<Props> = ({ title, text, Icon }) => (
    <Card
        actions={[
            <Button icon={Icon} type='link'>
                {text}
            </Button>,
        ]}
        hoverable
    >
        <Typography.Text className={styles.text}>{title}</Typography.Text>
    </Card>
);

type Props = {
    title: string;
    text: string;
    Icon: ReactNode;
};
