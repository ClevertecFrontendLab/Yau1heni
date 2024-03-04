import axios from 'axios';
import { LocalStorageKeys } from '@constants/local-storage-keys.ts';
import { store } from '@redux/configure-store.ts';

export const instance = axios.create({
    baseURL: 'https://marathon-api.clevertec.ru/',
    withCredentials: true,
});

instance.interceptors.request.use(async (config) => {
    const accessTokenFromState = store.getState().auth?.accessToken;
    const accessTokenFromLS = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);

    if (accessTokenFromLS !== null) {
        config.headers.Authorization = `Bearer ${accessTokenFromLS}`;
    }

    if (accessTokenFromState !== null) {
        config.headers.Authorization = `Bearer ${accessTokenFromState}`;
    }

    return config;
});
