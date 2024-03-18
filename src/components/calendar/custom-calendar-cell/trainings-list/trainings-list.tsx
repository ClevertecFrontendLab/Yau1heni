import { FC } from 'react';
import { Badge, Button, Row, Typography } from 'antd';
import { ColorBadge, Training } from '@common-types/training';
import { EditOutlined } from '@ant-design/icons';
import { trainingActions } from '@redux/slices';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { TrainingListEmpty } from '../training-list-empty/training-list-empty.tsx';

export const TrainingsList: FC<Props> = (props) => {
    const { isEditable = false, trainings, idChooseModal } = props;
    const dispatch = useAppDispatch();

    const onEditTrainingHandler = (training: Training) => {
        const { name, exercises, _id } = training;

        dispatch(trainingActions.setExercises({ trainingType: name, exercises: exercises }));
        dispatch(trainingActions.setSelectedTraining({ training: name }));
        dispatch(trainingActions.setTrainingId({ trainingId: _id }));
        dispatch(trainingActions.setOpenPopoverId({ openPopoverId: idChooseModal }));
    };

    const trainingsListNotEmpty = (isEditable: boolean, trainings: Training[]) =>
        trainings?.map((training, index) =>
            isEditable ? (
                <Row
                    justify={'space-between'}
                    key={index}
                    onClick={() => onEditTrainingHandler(training)}
                >
                    <Badge
                        text={
                            <Typography.Text disabled={training.isImplementation}>
                                {training.name}
                            </Typography.Text>
                        }
                        color={ColorBadge[training.name as keyof typeof ColorBadge]}
                    />
                    <Button
                        data-test-id={`modal-update-training-edit-button${index}`}
                        disabled={training.isImplementation}
                        icon={<EditOutlined />}
                    />
                </Row>
            ) : (
                <Row key={index}>
                    <Badge
                        text={
                            <Typography.Text disabled={training.isImplementation}>
                                {training.name}
                            </Typography.Text>
                        }
                        color={ColorBadge[training.name as keyof typeof ColorBadge]}
                    />
                </Row>
            ),
        );

    return trainings.length === 0 ? (
        <TrainingListEmpty />
    ) : (
        trainingsListNotEmpty(isEditable, trainings)
    );
};

type Props = {
    trainings: Training[];
    isEditable?: boolean;
    idChooseModal: string;
};
