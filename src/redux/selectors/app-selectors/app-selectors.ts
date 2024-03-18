import { RootState } from '@redux/configure-store.ts';

export const isLoadingAppSelector = (state: RootState) => state.app.isLoading;
export const isErrorAppSelector = (state: RootState) => state.app.isError;
