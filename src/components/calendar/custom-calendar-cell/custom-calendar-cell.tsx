import { Dayjs } from 'dayjs';
import { FC } from 'react';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { trainingActions } from '@redux/slices';
import { formatDate } from '@utils/format-date';
import { Row } from 'antd';
import { ChooseTrainingModal, CreateTrainingModal } from '@components/modals';
import { DateFormat, Training } from '@common-types/training';
import styles from './custom-calendar-cell.module.css';
import { TrainingsList } from '@components/calendar';

export const CustomCalendarCell: FC<Props> = ({ date, allTrainings }) => {
    const dispatch = useAppDispatch();

    const formatedDate = formatDate({ date, format: DateFormat.ISO_DATE });

    const idCreateModal = `create-modal-${formatedDate}`;
    const idChooseModal = `choose-modal-${formatedDate}`;

    const handleCellClick = () => {
        dispatch(trainingActions.setDate({ date: formatedDate }));
        dispatch(trainingActions.setOpenPopoverId({ openPopoverId: idCreateModal }));
    };

    const trainings = allTrainings.filter(
        (training) =>
            formatDate({ date: training.date, format: DateFormat.ISO_DATE }) === formatedDate,
    );

    return (
        <div onClick={handleCellClick} className={styles.cellCalendar}>
            <Row justify={'end'}>{formatDate({ date, format: 'DD' })}</Row>
            <div className={styles.cellContent}>
                {trainings.length !== 0 && (
                    <TrainingsList idChooseModal={idChooseModal} trainings={trainings} />
                )}
                <CreateTrainingModal
                    trainings={trainings}
                    date={date}
                    idChooseModal={idChooseModal}
                    id={idCreateModal}
                />
                <ChooseTrainingModal
                    trainings={trainings}
                    date={date}
                    idChooseModal={idChooseModal}
                    prevModalId={idCreateModal}
                />
            </div>
        </div>
    );
};

type Props = {
    date: Dayjs;
    allTrainings: Training[];
};
