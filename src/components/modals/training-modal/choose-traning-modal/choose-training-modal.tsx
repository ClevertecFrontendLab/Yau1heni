import { FC } from 'react';
import styles from './choose-training-modal.module.css';
import { Button, Row, Select } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import {
    exercisesTrainingSelector,
    isEditedExerciseSelector,
    isLoadingSaveTrainingSelector,
    openPopoverIdTrainingSelector,
    selectedTrainingSelector,
    trainingIdTrainingSelector,
    trainingsListSelector,
} from '@redux/selectors';
import { createTraining, editTraining, trainingActions } from '@redux/slices';
import dayjs, { Dayjs } from 'dayjs';
import { Training } from '@common-types/training';
import { optionsListBuilder } from '@utils/options-list-builder';
import { CustomModal } from '@components/modals';
import { ExercisesList } from './exercises-list/exercises-list.tsx';
import { useModalPosition } from '@hooks/useModalPosition.ts';

export const ChooseTrainingModal: FC<Props> = (props) => {
    const { date, idChooseModal, prevModalId, trainings, isMobile = false } = props;
    const dispatch = useAppDispatch();

    const { top, transform, left, right } = useModalPosition(date);

    const trainingsList = useAppSelector(trainingsListSelector);
    const selectedTraining = useAppSelector(selectedTrainingSelector);
    const exercises = useAppSelector(exercisesTrainingSelector);

    const openPopoverId = useAppSelector(openPopoverIdTrainingSelector);
    const isLoading = useAppSelector(isLoadingSaveTrainingSelector);
    const isEditedExercise = useAppSelector(isEditedExerciseSelector);
    const trainingId = useAppSelector(trainingIdTrainingSelector);

    const isOpen = openPopoverId === idChooseModal;
    const isPastOrToday = date.isSame(dayjs(), 'day') || date.isBefore(dayjs(), 'day');

    const defaultSelectValue =
        selectedTraining.length > 0 ? selectedTraining : 'Выбор типа тренировки';

    const optionsList = optionsListBuilder(trainingsList, trainings);

    const changeSelectedTrainingHandler = (value: string) => {
        dispatch(trainingActions.setSelectedTraining({ training: value }));
    };

    const goBackHandler = () => {
        dispatch(trainingActions.setOpenPopoverId({ openPopoverId: prevModalId }));
    };

    const addExerciseHandler = () => {
        dispatch(trainingActions.setIsDrawerAddExercisesOpen({ isOpen: true }));
    };

    const saveExerciseHandler = () => {
        const payload = {
            name: selectedTraining,
            date: date.toISOString(),
            isImplementation: isPastOrToday,
            exercises: exercises[selectedTraining],
        };

        if (isEditedExercise) {
            dispatch(editTraining({ trainingId, payload, isMobile }));
        } else {
            dispatch(createTraining(payload));
        }
        dispatch(trainingActions.clearExercises());
    };

    const exercisesList = exercises[selectedTraining]
        ? exercises[selectedTraining].filter(
              (exercise) => exercise?.name && exercise.name.length > 0,
          )
        : [];

    return (
        <CustomModal
            top={top}
            left={left}
            right={right}
            transform={transform}
            width={264}
            isOpen={isOpen}
        >
            <div data-test-id='modal-create-exercise' onClick={(e) => e.stopPropagation()}>
                <Row>
                    <Button
                        data-test-id='modal-exercise-training-button-close'
                        icon={<ArrowLeftOutlined />}
                        onClick={goBackHandler}
                    />
                    <Select
                        defaultValue={defaultSelectValue}
                        dropdownMatchSelectWidth={false}
                        bordered={false}
                        style={{ width: '85%', textAlign: 'start' }}
                        onChange={changeSelectedTrainingHandler}
                        options={optionsList}
                        data-test-id='modal-create-exercise-select'
                    />
                </Row>

                <div className={styles.exercisesListContainer}>
                    <ExercisesList exercises={exercisesList} />
                </div>

                <Row justify={'center'} gutter={[0, 8]}>
                    <Button
                        type={'text'}
                        className={styles.addExercisesButton}
                        onClick={addExerciseHandler}
                        disabled={!selectedTraining}
                    >
                        Добавить упражнения
                    </Button>
                    <Button
                        type={'link'}
                        disabled={exercisesList?.length === 0}
                        onClick={saveExerciseHandler}
                        loading={isLoading}
                    >
                        {isPastOrToday ? 'Сохранить изменения' : 'Сохранить'}
                    </Button>
                </Row>
            </div>
        </CustomModal>
    );
};

type Props = {
    date: Dayjs;
    idChooseModal: string;
    prevModalId: string;
    trainings: Training[];
    isMobile?: boolean;
};
