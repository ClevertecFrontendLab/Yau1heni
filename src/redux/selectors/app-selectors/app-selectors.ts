import { RootState } from '@redux/configure-store.ts';

export const isLoadingAppSelector = (state: RootState) => state.app.isLoading;
