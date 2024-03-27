import { FC } from 'react';
import { CloseCircleTwoTone, CloseOutlined } from '@ant-design/icons';
import { maskStyle } from '@components/modals/common-styles.ts';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { getTrainingList, getTrainings, trainingActions } from '@redux/slices';
import { Button, Col, Modal, Row, Typography } from 'antd';

export const ErrorTrainingModal: FC<Props> = ({ isErrorOpened, isErrorSaving, clearError }) => {
    const dispatch = useAppDispatch();

    const isError = isErrorSaving || isErrorOpened;

    const textTitle = isErrorOpened
        ? 'При открытии данных произошла ошибка'
        : 'При сохранении данных произошла ошибка';
    const text = isErrorOpened ? 'Попробуйте еще раз' : 'Придётся попробовать ещё раз';
    const textButton = isErrorOpened ? 'Обновить' : 'Закрыть';
    const colorIcon = isErrorOpened ? '#1890ff' : '#ff4d4f';

    const backToCalendarHandler = () => {
        clearError();
    };

    const retryRequestHandler = () => {
        if (isErrorSaving) {
            dispatch(getTrainings());
            dispatch(trainingActions.clearExercises());
            dispatch(trainingActions.setSelectedTraining({ training: '' }));
        }

        if (isErrorOpened) {
            dispatch(getTrainingList());
        }

        clearError();
    };

    return (
        <Modal
            open={isError}
            width={384}
            footer={null}
            closable={false}
            centered={true}
            maskStyle={maskStyle}
        >
            <Row align='top'>
                <Col span={3}>
                    <CloseCircleTwoTone style={{ fontSize: '24px' }} twoToneColor={colorIcon} />
                </Col>
                <Col span={17}>
                    <Typography.Title level={5} data-test-id='modal-error-user-training-title'>
                        {textTitle}
                    </Typography.Title>
                    <Typography.Text
                        type='secondary'
                        data-test-id='modal-error-user-training-subtitle'
                    >
                        {text}
                    </Typography.Text>
                </Col>

                <Button
                    icon={<CloseOutlined />}
                    onClick={backToCalendarHandler}
                    data-test-id='modal-error-user-training-button-close'
                />
            </Row>

            <Row justify='end' style={{ marginTop: '16px' }}>
                <Button
                    type='primary'
                    onClick={retryRequestHandler}
                    data-test-id='modal-error-user-training-button'
                >
                    {textButton}
                </Button>
            </Row>
        </Modal>
    );
};

type Props = {
    isErrorOpened: boolean;
    isErrorSaving: boolean;
    clearError: () => void;
};
