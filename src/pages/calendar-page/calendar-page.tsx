import { MainLayout } from '@components/layout';
import './calendar-page.module.css';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';

import { getTrainingList, getTrainings, trainingActions, trainingSelectors } from '@redux/slices';
import dayjs, { Dayjs } from 'dayjs';
import { Calendar, CustomCalendarCell } from '@components/calendar';
import { localeCalendar } from '@constants/locale-calendar';
import { ErrorTrainingModal } from '@components/modals';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';
import { CalendarMobile } from '@components/calendar';
import { AddExercisesDrawer } from '@components/drawers';

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

    const dateFullCellRender = (date: Dayjs) => {
        return <CustomCalendarCell date={date} allTrainings={trainings} />;
    };

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
