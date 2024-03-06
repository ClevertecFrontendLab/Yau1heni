import { Breadcrumb } from 'antd';
import styles from './breadcrumbs.module.css';
import { Link } from 'react-router-dom';
import { useBreadcrumbs } from '@hooks/useBreadcrumbs.ts';

export const Breadcrumbs = () => {
    const { breadcrumbs } = useBreadcrumbs();

    return (
        <Breadcrumb className={styles.breadcrumbs}>
            {breadcrumbs.map(({ path, name }) => (
                <Breadcrumb.Item key={path}>
                    <Link to={path}>{name}</Link>
                </Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
};
