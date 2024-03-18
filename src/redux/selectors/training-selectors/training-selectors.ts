import { RootState } from '@redux/configure-store.ts';

export const trainingsSelector = (state: RootState) => state.training.trainings;
export const trainingsListSelector = (state: RootState) => state.training.trainingsList;
export const selectedTrainingSelector = (state: RootState) => state.training.selectedTraining;
export const exercisesTrainingSelector = (state: RootState) => state.training.exercises;
export const dateTrainingSelector = (state: RootState) => state.training.date;

export const openPopoverIdTrainingSelector = (state: RootState) => state.training.openPopoverId;
export const trainingIdTrainingSelector = (state: RootState) => state.training.trainingId;

export const isErrorTrainingSelector = (state: RootState) => state.training.isError;
export const isErrorTrainingMainSelector = (state: RootState) => state.training.isErrorMain;
export const isErrorSaveTrainingSelector = (state: RootState) => state.training.isErrorSaveTraining;
export const isLoadingSaveTrainingSelector = (state: RootState) =>
    state.training.isLoadingSaveTraining;
export const isDrawerAddExercisesOpenSelector = (state: RootState) =>
    state.training.isDrawerAddExercisesOpen;
export const isEditedExerciseSelector = (state: RootState) => state.training.isEditedExercise;
