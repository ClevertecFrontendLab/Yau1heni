import { appReducer, authReducer, feedbackReducer, trainingReducer } from '@redux/slices';
import { ReducersMapObject } from '@reduxjs/toolkit';

const reducers = {
    app: appReducer,
    auth: authReducer,
    feedback: feedbackReducer,
    training: trainingReducer,
};

export const rootReducerBuilder = (additionalReducers: ReducersMapObject) => ({
    ...reducers,
    ...additionalReducers,
});
