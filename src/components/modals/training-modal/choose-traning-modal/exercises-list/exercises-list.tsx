import { Button, Row, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { selectedTrainingSelector } from '@redux/selectors';
import { trainingActions } from '@redux/slices';
import { FC } from 'react';
import { Exercise } from '@common-types/training';
import { TrainingListEmpty } from '@components/calendar';

export const ExercisesList: FC<Props> = ({ exercises }) => {
    const dispatch = useAppDispatch();

    const selectedTraining = useAppSelector(selectedTrainingSelector);

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
                        icon={<EditOutlined />}
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
