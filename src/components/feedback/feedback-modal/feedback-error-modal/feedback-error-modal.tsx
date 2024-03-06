import { Button, Modal, Result } from 'antd';
import { feedbackActions } from '@redux/slices';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { isErrorFeedbackSelector } from '@redux/selectors';
import { replace } from 'redux-first-history';
import { Paths } from '@customTypes/routes';
import { maskStyle } from '../common-styles.ts';

export const FeedbackErrorModal = () => {
    const dispatch = useAppDispatch();

    const isError = useAppSelector(isErrorFeedbackSelector);

    const clearError = () => {
        dispatch(feedbackActions.setIsError({ isError: false }));
    };

    const okHandler = () => {
        clearError();
    };
    const cancelHandler = () => {
        clearError();
    };

    const backToMainHandler = () => {
        dispatch(replace(Paths.MAIN));
        clearError();
    };

    return (
        <Modal
            open={isError}
            onOk={okHandler}
            onCancel={cancelHandler}
            centered
            maskStyle={maskStyle}
            footer={null}
        >
            <Result
                status='500'
                title='Что-то пошло не так'
                subTitle='Произошла ошибка, попробуйте ещё раз.'
                extra={
                    <Button type='primary' onClick={backToMainHandler}>
                        Назад
                    </Button>
                }
            />
        </Modal>
    );
};
