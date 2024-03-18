import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    isError: false,
};

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsError(state, action: PayloadAction<{ isError: boolean }>) {
            state.isError = action.payload.isError;
        },
    },
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
