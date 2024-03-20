import { CalendarTwoTone, HeartFilled, ProfileOutlined, TrophyFilled } from '@ant-design/icons';
import { PageName } from '@common-types/routes';

import { MenuItem } from '../types/types.ts';

export const itemsSideBar: MenuItem[] = [
    {
        key: PageName.CALENDAR,
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
        key: PageName.PROFILE,
        icon: <ProfileOutlined style={{ color: '#003a8c' }} />,
        label: 'Профиль',
    },
];

export const itemsSideBarMobile: MenuItem[] = [
    {
        key: PageName.CALENDAR,
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
        key: PageName.PROFILE,
        label: 'Профиль',
    },
];
