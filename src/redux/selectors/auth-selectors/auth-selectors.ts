import { RootState } from '@redux/configure-store.ts';

export const isLoadingAuthSelector = (state: RootState) => state.auth.isLoading;
export const isRememberMeAuthSelector = (state: RootState) => state.auth.isRememberMe;
export const isLoggedInAuthSelector = (state: RootState) => state.auth.isLoggedIn;
export const isErrorConfirmEmailAuthSelector = (state: RootState) => state.auth.isErrorConfirmEmail;
export const checkEmailAuthSelector = (state: RootState) => state.auth.checkEmail?.email || '';
export const codeAuthSelector = (state: RootState) => state.auth.confirmCode;
