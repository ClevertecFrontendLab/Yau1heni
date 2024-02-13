import { CalendarTwoTone, HeartFilled, ProfileOutlined, TrophyFilled } from '@ant-design/icons';
import { MenuItem } from '../types/types.ts';

export const itemsSideBar: MenuItem[] = [
    {
        key: '1',
        icon: <CalendarTwoTone twoToneColor={['#003a8c', '#003a8c']} />,
        label: 'Календарь',
    },
    {
        key: '2',
        icon: <HeartFilled style={{ color: '#003a8c' }} />,
        label: 'Тренировки',
    },
    {
        key: '3',
        icon: <TrophyFilled style={{ color: '#003a8c' }} />,
        label: 'Достижения',
    },
    {
        key: '4',
        icon: <ProfileOutlined style={{ color: '#003a8c' }} />,
        label: 'Профиль',
    },
];

export const itemsSideBarMobile: MenuItem[] = [
    {
        key: '1',
        label: 'Календарь',
    },
    {
        key: '2',
        label: 'Тренировки',
    },
    {
        key: '3',
        label: 'Достижения',
    },
    {
        key: '4',
        label: 'Профиль',
    },
];
