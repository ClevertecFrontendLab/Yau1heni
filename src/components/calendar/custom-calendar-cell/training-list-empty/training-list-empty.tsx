import { Empty } from 'antd';
import EmptyLogo from '@assets/icons/empty-image.svg?react';

export const TrainingListEmpty = () => (
    <Empty description={null} image={<EmptyLogo width={32} height={32} />} />
);
