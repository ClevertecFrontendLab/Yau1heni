import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authServices } from '@services/auth-services';
import {
    StatusCode,
    AuthInitialState,
    AuthData,
    CheckEmail,
    ChangePasswordData,
} from '@customTypes/auth';
import { push, replace } from 'redux-first-history';
import { Paths } from '@customTypes/routes';
import { createAppAsyncThunk } from '@hooks/typed-react-redux-hooks.ts';
import { isAxiosError } from 'axios';

const initialState: AuthInitialState = {
    isLoading: false,
    isRememberMe: true,
    isLoggedIn: false,
    registrationData: null,
    checkEmail: null,
    confirmCode: '',
    changePasswordData: null,
    isErrorConfirmEmail: false,
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setFormData(state, action: PayloadAction<AuthData>) {
            state.registrationData = action.payload;
        },
        setIsRememberMe(state, action: PayloadAction<{ isRememberMe: boolean }>) {
            state.isRememberMe = action.payload.isRememberMe;
        },
        setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn;
        },
        setCHeckEmail(state, action: PayloadAction<CheckEmail>) {
            state.checkEmail = action.payload;
        },
        setConfirmEmail(state, action: PayloadAction<{ code: string }>) {
            state.confirmCode = action.payload.code;
        },
        setChangePasswordData(state, action: PayloadAction<ChangePasswordData>) {
            state.changePasswordData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(confirmEmail.fulfilled, (state) => {
                state.isErrorConfirmEmail = false;
            })
            .addCase(confirmEmail.pending, (state) => {
                state.isErrorConfirmEmail = false;
            })
            .addCase(confirmEmail.rejected, (state) => {
                state.isErrorConfirmEmail = true;
                state.confirmCode = '';
            })
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

export const { reducer: authReducer, actions: authActions } = slice;

export const registration = createAppAsyncThunk<void, AuthData>(
    'auth/registration',
    async (data, { dispatch }) => {
        dispatch(authActions.setFormData(data));

        try {
            if (data !== null) {
                await authServices.registration({ email: data.email, password: data.password });
                dispatch(push(Paths.SUCCESS, { from: data.pathname }));
            }
        } catch (e) {
            if (isAxiosError(e)) {
                if (e.response?.status === StatusCode.USER_EXISTS) {
                    dispatch(push(Paths.ERROR_USER_EXIST, { from: data?.pathname }));
                } else {
                    dispatch(push(Paths.ERROR_REGISTRATION, { from: data?.pathname }));
                }
            } else dispatch(push(Paths.ERROR_REGISTRATION, { from: data?.pathname }));
        }
    },
);

export const retryRegistration = createAppAsyncThunk<void, void>(
    'auth/retryRegistration',
    async (_, thunkAPI) => {
        const { dispatch, getState } = thunkAPI;
        const data = getState().auth?.registrationData;

        try {
            dispatch(push(Paths.REGISTRATION));
            if (data !== null) dispatch(registration(data));
        } catch (e) {
            if (isAxiosError(e)) {
                console.log(e);
            }
        }
    },
);

export const login = createAppAsyncThunk<void, AuthData>(
    'auth/login',
    async (data, { dispatch, getState }) => {
        const isRememberMe = getState().auth?.isRememberMe;

        try {
            if (data !== null) {
                const res = await authServices.login({
                    email: data.email,
                    password: data.password,
                });
                isRememberMe && localStorage.setItem('accessToken', res.data.accessToken);
                dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
                dispatch(push(Paths.MAIN));
            }
        } catch (e) {
            if (isAxiosError(e)) {
                dispatch(push(Paths.ERROR_LOGIN, { from: data?.pathname }));
            }
        }
    },
);

export const checkEmail = createAppAsyncThunk<void, CheckEmail>(
    'auth/checkEmail',
    async (data, { dispatch }) => {
        dispatch(authActions.setCHeckEmail(data));

        try {
            if (data !== null) {
                await authServices.checkEmail({ email: data.email });
                dispatch(push(Paths.CONFIRM_EMAIL, { from: data.pathname }));
            }
        } catch (e) {
            if (isAxiosError(e)) {
                if (
                    e.response?.status === StatusCode.NOT_FOUND_404 ||
                    e.response?.data.message === 'Email не найден'
                ) {
                    dispatch(push(Paths.ERROR_CHECK_EMAIL_NO_EXIST, { from: data?.pathname }));
                } else {
                    dispatch(push(Paths.ERROR_CHECK_EMAIL, { from: data?.pathname }));
                }
            } else {
                dispatch(push(Paths.ERROR_CHECK_EMAIL, { from: data?.pathname }));
            }
        }
    },
);

export const retryCheckEmail = createAppAsyncThunk<void, void>(
    'auth/retryRegistration',
    async (_, thunkAPI) => {
        const { dispatch, getState } = thunkAPI;
        const data = getState().auth.checkEmail;

        try {
            if (data !== null) {
                dispatch(checkEmail(data));
                dispatch(push(Paths.REGISTRATION, { from: data.pathname }));
            }
        } catch (e) {
            if (isAxiosError(e)) {
                console.log(e);
            }
        }
    },
);

export const confirmEmail = createAppAsyncThunk<void, string>(
    'auth/confirmEmail',
    async (code, { dispatch, getState, rejectWithValue }) => {
        const data = getState().auth.checkEmail;

        try {
            if (data !== null) {
                await authServices.confirmEmail({ email: data.email, code });
                dispatch(push(Paths.CHANGE_PASSWORD, { from: data?.pathname }));
            } else {
                return rejectWithValue('error confirm email');
            }
        } catch (e) {
            return rejectWithValue('error confirm email');
        }
    },
);

export const changePassword = createAppAsyncThunk<void, ChangePasswordData>(
    'auth/changePasswordData',
    async (data, { dispatch }) => {
        dispatch(authActions.setChangePasswordData(data));

        try {
            if (data) {
                await authServices.changePassword({
                    password: data.password,
                    confirmPassword: data.confirmPassword,
                });
                dispatch(replace(Paths.SUCCESS_CHANGE_PASSWORD, { from: data.pathname }));
            }
        } catch (e) {
            if (isAxiosError(e)) {
                if (e.response?.status) {
                    dispatch(push(Paths.ERROR_CHANGE_PASSWORD, { from: data?.pathname }));
                }
            }
        }
    },
);

export const retryChangePassword = createAppAsyncThunk<void, void>(
    'auth/retryChangePassword',
    async (_, thunkAPI) => {
        const { dispatch, getState } = thunkAPI;
        const data = getState().auth.changePasswordData;

        try {
            dispatch(push(Paths.CHANGE_PASSWORD, { from: data?.pathname }));
            if (data !== null) dispatch(changePassword(data));
        } catch (e) {
            console.log(e);
        }
    },
);
