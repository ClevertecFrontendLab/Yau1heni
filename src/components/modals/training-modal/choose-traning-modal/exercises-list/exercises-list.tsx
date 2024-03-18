import { Button, Row, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { trainingActions, trainingSelectors } from '@redux/slices';
import { FC } from 'react';
import { Exercise } from '@common-types/training';
import { TrainingListEmpty } from '@components/calendar';

export const ExercisesList: FC<Props> = ({ exercises }) => {
    const dispatch = useAppDispatch();

    const selectedTraining = useAppSelector(trainingSelectors.selectedTraining);

    const editExerciseHandler = () => {
        if (exercises.length > 0) {
            dispatch(
                trainingActions.setExercises({
                    trainingType: selectedTraining,
                    exercises: exercises,
                }),
            );
        }
        dispatch(trainingActions.setIsDrawerAddExercisesOpen({ isOpen: true }));
        dispatch(trainingActions.setIsEditedExercises({ isEdited: true }));
    };

    const exercisesListRender =
        exercises.length > 0 ? (
            exercises.map((exercise, index) => (
                <Row justify={'space-between'} key={index}>
                    <Typography.Text type={'secondary'}>{exercise.name}</Typography.Text>

                    <Button
                        data-test-id={`modal-update-training-edit-button${index}`}
                        onClick={editExerciseHandler}
                        icon={<EditOutlined style={{ color: '#2f54eb' }} />}
                    />
                </Row>
            ))
        ) : (
            <TrainingListEmpty />
        );

    return <>{exercisesListRender}</>;
};

type Props = {
    exercises: Exercise[];
};
