export type Parameters = {
    repeat: boolean;
    period: number;
    jointTraining: boolean;
    participants: string[] | [];
};

export type Exercise = {
    _id?: string;
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation: boolean;
};

export type Training = {
    _id: string;
    name: string;
    date: string;
    isImplementation: boolean;
    userId: string;
    parameters: Parameters;
    exercises: Exercise[];
};

export type TrainingPayload = {
    name: string;
    date: string;
    isImplementation?: boolean;
    parameters?: Parameters;
    exercises: Exercise[];
};

export type ChangeTrainingPayload = {
    payload: TrainingPayload;
    trainingId: string;
};

export type TrainingInitialState = {
    trainings: Training[];
    trainingsList: TrainingList[];
    selectedTraining: string;
    exercises: Record<string, Exercise[]>;
    date: string;
    editedExercise: Exercise[];

    trainingId: string;
    openPopoverId: string;
    isError: boolean;
    isErrorMain: boolean;
    isErrorSaveTraining: boolean;
    isLoadingSaveTraining: boolean;
    isDrawerAddExercisesOpen: boolean;
    isEditedExercise: boolean;
    isEditedExercisePast: boolean;
};

export type TrainingList = {
    name: string;
    key: string;
};

export enum ColorBadge {
    Ноги = 'red',
    Руки = 'yellow',
    Силовая = 'green',
    Спина = 'orange',
    Грудь = 'pink',
}

export enum DateFormat {
    ISO_DATE = 'YYYY-MM-DD',
    EURO_DATE = 'DD.MM.YYYY',
}
