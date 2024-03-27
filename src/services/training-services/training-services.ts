import {
    ChangeTrainingPayload,
    Training,
    TrainingList,
    TrainingPayload,
} from '@common-types/training';

import { instance } from '../config/axios-config.ts';

export const trainingServices = {
    getTraining() {
        return instance.get<Training[]>('training');
    },
    createTraining(data: TrainingPayload) {
        return instance.post<Training>('training', data);
    },
    editTraining(data: ChangeTrainingPayload) {
        const { trainingId, payload } = data;

        return instance.put<Training>(`training/${trainingId}`, payload);
    },
    getTrainingList() {
        return instance.get<TrainingList[]>('/catalogs/training-list');
    },
};
