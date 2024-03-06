import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
};

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.isLoading = true;
                },
            )
            .addMatcher(
                (action) => action.type.endsWith('/fulfilled'),
                (state) => {
                    state.isLoading = false;
                },
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state) => {
                    state.isLoading = false;
                },
            );
    },
});

export const { reducer: appReducer, actions: appActions } = slice;
