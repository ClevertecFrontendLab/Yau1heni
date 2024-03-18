import { CalendarOutlined, HeartFilled, IdcardOutlined } from '@ant-design/icons';
import { Paths } from '@common-types/routes';

export const itemsCards = [
    {
        id: 'items-card-1',
        title: 'Расписать тренировки',
        icon: <HeartFilled style={{ color: '#003a8c' }} />,
        text: 'Тренировка',
        dataTestId: '',
        toPath: Paths.MAIN,
    },
    {
        id: 'items-card-2',
        title: 'Назначить календарь',
        icon: <CalendarOutlined style={{ color: '#003a8c' }} />,
        text: 'Календарь',
        dataTestId: 'menu-button-calendar',
        toPath: Paths.CALENDAR,
    },
    {
        id: 'items-card-3',
        title: 'Заполнить профиль',
        icon: <IdcardOutlined style={{ color: '#003a8c' }} />,
        text: 'Профиль',
        dataTestId: '',
        toPath: Paths.MAIN,
    },
];
