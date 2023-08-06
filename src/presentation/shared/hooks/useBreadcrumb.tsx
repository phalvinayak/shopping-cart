import {
    BreadcrumbMenuItem,
    selectBreadcrumb,
    setBreadcrumb,
} from '@src/application/redux/api/breadcrumb/breadcrumb.slice';
import { AppDispatch } from '@src/application/redux/store';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

type HookReturnType = {
    setPageBreadcrumb: (items: BreadcrumbMenuItem[]) => void;
    breadcrumbs: BreadcrumbMenuItem[];
};

function useBreadcrumb(): HookReturnType {
    const dispatch: AppDispatch = useDispatch();
    const items: BreadcrumbMenuItem[] = useSelector(selectBreadcrumb);

    const setPageBreadcrumb = useCallback(
        (items: BreadcrumbMenuItem[]) => {
            dispatch(setBreadcrumb(items));
        },
        [dispatch]
    );

    const breadcrumbs = useMemo(() => {
        return items.map((item: BreadcrumbMenuItem) => {
            if (item.href) {
                return {
                    title: <Link to={item.href}>{item.title}</Link>,
                };
            }
            return item;
        });
    }, [items]);

    return {
        setPageBreadcrumb,
        breadcrumbs,
    };
}

export default useBreadcrumb;
