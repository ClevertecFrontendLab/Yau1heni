import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    CreationStatus,
    FeedbacksInitialState,
    FeedbackPayload,
    FeedbacksResponse,
    Rating,
} from '@customTypes/feedback';
import { createAppAsyncThunk } from '@hooks/typed-react-redux-hooks.ts';
import { feedbackServices } from '@services/feedback-services';
import { isAxiosError } from 'axios';
import { StatusCode } from '@customTypes/auth';
import { LocalStorageKeys } from '@constants/local-storage-keys.ts';
import { authActions } from '@redux/slices';

const initialState: FeedbacksInitialState = {
    feedbacks: [],
    isError: false,
    rating: 0,
    message: '',
    creationStatus: CreationStatus.IDLE,
};

const slice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        setIsError(state, action: PayloadAction<{ isError: boolean }>) {
            state.isError = action.payload.isError;
        },
        setRating(state, action: PayloadAction<{ rating: Rating }>) {
            state.rating = action.payload.rating;
        },
        setMessage(state, action: PayloadAction<{ message: string }>) {
            state.message = action.payload.message;
        },
        setCreationStatus(state, action: PayloadAction<{ status: CreationStatus }>) {
            state.creationStatus = action.payload.status;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFeedbacks.pending, (state) => {
                state.isError = false;
            })
            .addCase(getFeedbacks.fulfilled, (state, action) => {
                state.isError = false;
                if (action.payload) {
                    state.feedbacks = action.payload.sort(
                        (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf(),
                    );
                }
            })
            .addCase(getFeedbacks.rejected, (state) => {
                state.isError = true;
            });
    },
});

export const { reducer: feedbackReducer, actions: feedbackActions } = slice;

export const getFeedbacks = createAppAsyncThunk<FeedbacksResponse, void>(
    'feedback/getFeedbacks',
    async (_, { rejectWithValue }) => {
        try {
            const res = await feedbackServices.getFeedbacks();
            return res.data;
        } catch (e) {
            return rejectWithValue(e);
        }
    },
);

export const createFeedback = createAppAsyncThunk<void, FeedbackPayload>(
    'feedback/createFeedback',
    async (data, { dispatch, rejectWithValue }) => {
        try {
            await feedbackServices.createFeedback(data);
            dispatch(getFeedbacks());
            dispatch(feedbackActions.setCreationStatus({ status: CreationStatus.SUCCESS }));
        } catch (e) {
            if (isAxiosError(e)) {
                dispatch(feedbackActions.setCreationStatus({ status: CreationStatus.ERROR }));
                if (e.response?.status === StatusCode.FORBIDDEN) {
                    localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
                    dispatch(authActions.setAccessToken({ accessToken: null }));
                } else {
                    rejectWithValue('feedback error');
                }
            }
        }
    },
);
