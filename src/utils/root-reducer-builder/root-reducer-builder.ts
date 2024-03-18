import { appReducer, authReducer, feedbackReducer, trainingReducer } from '@redux/slices';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const reducers = {
    app: appReducer,
    auth: authReducer,
    feedback: feedbackReducer,
    training: trainingReducer,
};

export const rootReducerBuilder = (additionalReducers: ReducersMapObject) => {
    return combineReducers({
        ...reducers,
        ...additionalReducers,
    });
};
