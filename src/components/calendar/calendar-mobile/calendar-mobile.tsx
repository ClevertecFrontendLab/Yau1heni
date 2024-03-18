import styles from './calendar-mobile.module.css';
import { Calendar } from '@components/calendar';
import { localeCalendar } from '@constants/locale-calendar';
import { createPortal } from 'react-dom';
import { ChooseTrainingModal, CreateTrainingModal } from '@components/modals';
import { formatDate } from '@utils/format-date';
import { DateFormat, Training } from '@common-types/training';
import dayjs, { Dayjs } from 'dayjs';
import { trainingActions } from '@redux/slices';
import { FC, useState } from 'react';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';

export const CalendarMobile: FC<Props> = ({ trainings }) => {
    const dispatch = useAppDispatch();

    const [selectedValue, setSelectedValue] = useState(dayjs());
    const onSelect = (value: Dayjs) => {
        setSelectedValue(value);

        dispatch(
            trainingActions.setDate({
                date: formatDate({ date: value, format: DateFormat.ISO_DATE }),
            }),
        );

        dispatch(trainingActions.setOpenPopoverId({ openPopoverId: 'create-modal' }));
    };

    const trainingsForMobileModal = trainings.filter(
        (training) =>
            formatDate({
                date: training.date,
                format: 'YYYY-MM-DD',
            }) === formatDate({ date: selectedValue, format: DateFormat.ISO_DATE }),
    );

    const dateCellRender = (date: Dayjs) => {
        const formatedDate = formatDate({ date, format: DateFormat.ISO_DATE });

        const isTrainingDay = trainings.find(
            ({ date }) => formatDate({ date, format: DateFormat.ISO_DATE }) === formatedDate,
        );

        if (!isTrainingDay) return null;

        return <div className={styles.cellTrainingDay} />;
    };

    return (
        <div>
            <Calendar
                locale={localeCalendar}
                fullscreen={false}
                onSelect={onSelect}
                dateCellRender={dateCellRender}
            />

            {createPortal(
                <CreateTrainingModal
                    trainings={trainingsForMobileModal}
                    date={selectedValue}
                    id={'create-modal'}
                    idChooseModal={'choose-modal'}
                />,
                document.body,
            )}
            {createPortal(
                <ChooseTrainingModal
                    trainings={trainingsForMobileModal}
                    date={selectedValue}
                    prevModalId={'create-modal'}
                    idChooseModal={'choose-modal'}
                    isMobile
                />,
                document.body,
            )}
        </div>
    );
};

type Props = {
    trainings: Training[];
};
