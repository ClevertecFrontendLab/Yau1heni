import { replace } from 'redux-first-history';
import { Paths } from '@customTypes/routes';
import { AppDispatch } from '@redux/configure-store.ts';

export const navigateTo = (args: NavigationArgs): void => {
    const { dispatch, currentPath, toPath } = args;
    dispatch(replace(toPath, { from: currentPath }));
};

export type NavigationArgs = {
    dispatch: AppDispatch;
    toPath: Paths;
    currentPath?: string;
};
