import { Button, Input, Modal, Rate } from 'antd';
import { ChangeEvent, FC } from 'react';
import { Rating } from '@common-types/feedback';
import { createFeedback, feedbackActions } from '@redux/slices';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import styles from './feedback-create-modal.module.css';
import { StarFilled, StarTwoTone } from '@ant-design/icons';
import { maskStyle } from '../common-styles.ts';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { messageFeedbackSelector, ratingFeedbackSelector } from '@redux/selectors';

export const FeedbackCreateModal: FC<Props> = ({ isModalOpen, setIsModalOpen }) => {
    const dispatch = useAppDispatch();

    const { xs } = useBreakpoint();

    const rating = useAppSelector(ratingFeedbackSelector);
    const message = useAppSelector(messageFeedbackSelector);

    const okHandler = () => {
        setIsModalOpen(false);
        dispatch(createFeedback({ rating, message }));
    };

    const cancelHandler = () => {
        setIsModalOpen(false);
    };

    const setRatingHandler = (rating: number) => {
        dispatch(feedbackActions.setRating({ rating: rating as Rating }));
    };

    const onChangeMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(feedbackActions.setMessage({ message: e.target.value }));
    };

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
        <Modal
            title={'Ваш отзыв'}
            open={isModalOpen}
            onOk={okHandler}
            onCancel={cancelHandler}
            centered
            maskStyle={maskStyle}
            bodyStyle={xs ? { padding: '16px' } : {}}
            footer={[
                <Button
                    onClick={okHandler}
                    type={'primary'}
                    disabled={rating === 0}
                    block={xs}
                    key={'new-review-submit-button'}
                    data-test-id='new-review-submit-button'
                >
                    Опубликовать
                </Button>,
            ]}
        >
            <Rate
                value={rating}
                onChange={setRatingHandler}
                className={styles.rating}
                character={characterRateHandler}
            />
            <Input.TextArea
                autoSize
                className={styles.textarea}
                bordered={false}
                value={message}
                onChange={onChangeMessageHandler}
                placeholder={'Расскажите, почему Вам понравилось наше приложение.'}
            />
        </Modal>
    );
};

type Props = {
    isModalOpen: boolean;
    setIsModalOpen: (isModalOpen: boolean) => void;
};
