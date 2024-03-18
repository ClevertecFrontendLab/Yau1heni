import { Paths } from '@common-types/routes';
import { useLocation } from 'react-router-dom';

enum BreadcrumbItem {
    MAIN = 'Главная',
    FEEDBACKS = 'Отзывы пользователей',
    CALENDAR = 'Календарь',
}

const breadcrumbData = [
    {
        path: '/',
        name: BreadcrumbItem.MAIN,
    },
    {
        path: Paths.FEEDBACKS,
        name: BreadcrumbItem.FEEDBACKS,
    },
    {
        path: Paths.CALENDAR,
        name: BreadcrumbItem.CALENDAR,
    },
];

export const useBreadcrumbs = () => {
    const { pathname } = useLocation();

    const pathSegments = pathname.split('/').map((segment) => `/${segment}`);

    const breadcrumbs = breadcrumbData
        .filter((breadcrumb) => pathSegments.includes(breadcrumb.path))
        .map((breadcrumb) => ({ path: breadcrumb.path, name: breadcrumb.name }));

    return { breadcrumbs };
};
