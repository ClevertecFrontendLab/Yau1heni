import { useEffect, useState } from 'react';
import { Calendar, CalendarMobile, CustomCalendarCell } from '@components/calendar';
import { AddExercisesDrawer } from '@components/drawers';
import { MainLayout } from '@components/layout';
import { ErrorTrainingModal } from '@components/modals';
import { localeCalendar } from '@constants/locale-calendar';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { getTrainingList, getTrainings, trainingActions, trainingSelectors } from '@redux/slices';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import dayjs, { Dayjs } from 'dayjs';

import './calendar-page.module.css';

const CalendarPage = () => {
    const dispatch = useAppDispatch();

    const { xs } = useBreakpoint();

    const trainings = useAppSelector(trainingSelectors.trainings);
    const isErrorOpened = useAppSelector(trainingSelectors.isError);
    const isErrorSaving = useAppSelector(trainingSelectors.isErrorSave);

    useEffect(() => {
        dispatch(getTrainingList());
        dispatch(getTrainings());
    }, [dispatch]);

    const clearError = () => {
        dispatch(trainingActions.setIsErrorSaveTraining({ isError: false }));
        dispatch(trainingActions.setIsError({ isError: false }));
    };

    const [currentMonth, setCurrentMonth] = useState(dayjs().month());
    const disabledDate = (current: Dayjs) => {
        const isCurrentMonth = current.month() === currentMonth;

        return !isCurrentMonth;
    };

    const handlePanelChange = (value: Dayjs) => {
        setCurrentMonth(value.month());
    };

    const dateFullCellRender = (date: Dayjs) => (
        <CustomCalendarCell date={date} allTrainings={trainings} />
    );

    return (
        <MainLayout isWithHeader={false} isWithFooter={false}>
            {xs ? (
                <CalendarMobile trainings={trainings} />
            ) : (
                <Calendar
                    locale={localeCalendar}
                    disabledDate={disabledDate}
                    onPanelChange={handlePanelChange}
                    onSelect={handlePanelChange}
                    dateFullCellRender={dateFullCellRender}
                />
            )}

            <AddExercisesDrawer />

            <ErrorTrainingModal
                clearError={clearError}
                isErrorSaving={isErrorSaving}
                isErrorOpened={isErrorOpened}
            />
        </MainLayout>
    );
};

export default CalendarPage;
