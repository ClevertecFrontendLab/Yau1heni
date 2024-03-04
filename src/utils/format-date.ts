import dayjs from 'dayjs';

export const formatDate = ({ date, format }: Args) => dayjs(date).format(format);

type Args = {
    date: Date;
    format: string;
};
