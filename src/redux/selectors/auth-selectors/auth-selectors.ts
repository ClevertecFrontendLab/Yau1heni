import { RootState } from '@redux/configure-store.ts';

export const isRememberMeAuthSelector = (state: RootState) => state.auth.isRememberMe;
export const isErrorConfirmEmailAuthSelector = (state: RootState) => state.auth.isErrorConfirmEmail;
export const checkEmailAuthSelector = (state: RootState) => state.auth.checkEmail?.email || '';
export const codeAuthSelector = (state: RootState) => state.auth.confirmCode;
export const accessTokenAuthSelector = (state: RootState) => state.auth.accessToken;
