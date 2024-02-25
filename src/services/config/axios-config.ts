import axios from 'axios';
import { LocalStorageKeys } from '@constants/local-storage-keys.ts';

export const instance = axios.create({
    baseURL: 'https://marathon-api.clevertec.ru/',
    withCredentials: true,
});

instance.interceptors.request.use(async (config) => {
    if (localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN) !== null) {
        const authData = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
        config.headers.Authorization = `Bearer ${authData}`;
    }

    return config;
});
