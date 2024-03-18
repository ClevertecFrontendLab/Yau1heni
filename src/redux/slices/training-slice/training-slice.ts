import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from '@hooks/typed-react-redux-hooks.ts';
import { trainingServices } from '@services/training-services';
import {
    ChangeTrainingPayload,
    DateFormat,
    Exercise,
    Training,
    TrainingInitialState,
    TrainingList,
    TrainingPayload,
} from '@common-types/training';
import { push } from 'redux-first-history';
import { Paths } from '@common-types/routes';
import { formatDate } from '@utils/format-date';

export const emptyExercise = {
    name: '',
    replays: 1,
    weight: 0,
    isImplementation: false,
    approaches: 1,
};

const initialState: TrainingInitialState = {
    trainings: [],
    trainingsList: [],
    selectedTraining: '',
    exercises: { ['empty']: [emptyExercise] },
    date: '',
    editedExercise: [],

    isDrawerAddExercisesOpen: false,
    openPopoverId: '',
    trainingId: '',
    isLoadingSaveTraining: false,

    isError: false,
    isErrorMain: false,
    isErrorSaveTraining: false,

    isEditedExercise: false,
    isEditedExercisePast: false,
};

const slice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        setIsError(state, action: PayloadAction<{ isError: boolean }>) {
            state.isError = action.payload.isError;
        },
        setIsErrorMain(state, action: PayloadAction<{ isError: boolean }>) {
            state.isErrorMain = action.payload.isError;
        },
        setIsErrorSaveTraining(state, action: PayloadAction<{ isError: boolean }>) {
            state.isErrorSaveTraining = action.payload.isError;
        },
        setIsDrawerAddExercisesOpen(state, action: PayloadAction<{ isOpen: boolean }>) {
            state.isDrawerAddExercisesOpen = action.payload.isOpen;
        },
        setIsEditedExercises(state, action: PayloadAction<{ isEdited: boolean }>) {
            state.isEditedExercise = action.payload.isEdited;
        },
        setDate(state, action: PayloadAction<{ date: string }>) {
            state.date = action.payload.date;
        },
        setOpenPopoverId(state, action: PayloadAction<{ openPopoverId: string }>) {
            state.openPopoverId = action.payload.openPopoverId;
        },
        setTrainingId(state, action: PayloadAction<{ trainingId: string }>) {
            state.trainingId = action.payload.trainingId;
        },
        setSelectedTraining(state, action: PayloadAction<{ training: string }>) {
            state.selectedTraining = action.payload.training;
        },
        setExercises(
            state,
            action: PayloadAction<{ trainingType: string; exercises: Exercise[] }>,
        ) {
            state.exercises = { [action.payload.trainingType]: [...action.payload.exercises] };
        },
        clearExercises(state) {
            state.exercises = { ['empty']: [emptyExercise] };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTrainings.pending, (state) => {
                state.isErrorMain = false;
            })
            .addCase(getTrainings.fulfilled, (state, action) => {
                state.isErrorMain = false;
                if (action.payload) {
                    state.trainings = action.payload;
                }
            })
            .addCase(getTrainings.rejected, (state) => {
                state.isErrorMain = true;
            })

            .addCase(getTrainingList.pending, (state) => {
                state.isError = false;
            })
            .addCase(getTrainingList.fulfilled, (state, action) => {
                state.isError = false;
                if (action.payload) {
                    state.trainingsList = action.payload;
                }
            })
            .addCase(getTrainingList.rejected, (state) => {
                state.isError = true;
            })

            .addCase(createTraining.pending, (state) => {
                state.isErrorSaveTraining = false;
                state.isLoadingSaveTraining = true;
            })
            .addCase(createTraining.fulfilled, (state) => {
                state.isErrorSaveTraining = false;
                state.isLoadingSaveTraining = false;
                state.isDrawerAddExercisesOpen = false;
                state.selectedTraining = '';
            })
            .addCase(createTraining.rejected, (state) => {
                state.isErrorSaveTraining = true;
                state.isLoadingSaveTraining = false;
                state.openPopoverId = '';
                state.isDrawerAddExercisesOpen = false;
            })
            .addCase(editTraining.pending, (state) => {
                state.isErrorSaveTraining = false;
                state.isLoadingSaveTraining = true;
            })
            .addCase(editTraining.fulfilled, (state) => {
                state.isErrorSaveTraining = false;
                state.isLoadingSaveTraining = false;
                state.isDrawerAddExercisesOpen = false;
                state.selectedTraining = '';
            })
            .addCase(editTraining.rejected, (state) => {
                state.isErrorSaveTraining = true;
                state.isLoadingSaveTraining = false;
                state.openPopoverId = '';
                state.isDrawerAddExercisesOpen = false;
            });
    },
});

export const { reducer: trainingReducer, actions: trainingActions } = slice;

export const getTrainings = createAppAsyncThunk<Training[], void>(
    'training/getTrainings',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await trainingServices.getTraining();
            dispatch(push(Paths.CALENDAR));
            return res.data;
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

export const getTrainingList = createAppAsyncThunk<TrainingList[], void>(
    'training/getTrainingList',
    async (_, { rejectWithValue }) => {
        try {
            const res = await trainingServices.getTrainingList();
            return res.data;
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

export const createTraining = createAppAsyncThunk<void, TrainingPayload>(
    'training/createTraining',
    async (data, { dispatch, rejectWithValue }) => {
        const formatedDate = formatDate({ date: data.date, format: DateFormat.ISO_DATE });
        const openPopoverId = `create-modal-${formatedDate}`;

        try {
            await trainingServices.createTraining(data);
            dispatch(getTrainings());
            dispatch(trainingActions.setOpenPopoverId({ openPopoverId }));
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

export const editTraining = createAppAsyncThunk<
    void,
    ChangeTrainingPayload & { isMobile?: boolean }
>('training/editTraining', async (data, { dispatch, rejectWithValue }) => {
    const formatedDate = formatDate({ date: data.payload.date, format: DateFormat.ISO_DATE });
    const openPopoverId = `create-modal-${formatedDate}`;

    try {
        await trainingServices.editTraining(data);
        dispatch(getTrainings());
        dispatch(
            trainingActions.setOpenPopoverId({
                openPopoverId: data.isMobile ? 'create-modal' : `${openPopoverId}`,
            }),
        );
    } catch (e) {
        return rejectWithValue(e);
    }
});
