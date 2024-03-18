import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

export const formatDate = ({ date, format }: Args) => dayjs(date).format(format);

type Args = {
    date: Dayjs | string | Date;
    format: string;
};
