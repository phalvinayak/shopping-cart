import { SEARCH_QUERY_PARAM } from '@src/application/models/constants/common.constants';
import { useGetSearchProductsQuery } from '@src/application/redux/api/products/products.api';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './SearchPage.less';
import Title from 'antd/es/typography/Title';
import CategoryPageLoader from '@src/presentation/pages/category-page/components/CategoryPageLoader/CategoryPageLoader';
import ProductList from '@src/presentation/shared/components/product-list/ProductList';
import useBreadcrumb from '@src/presentation/shared/hooks/useBreadcrumb';
import { useEffect } from 'react';
import { PageName } from '@src/application/models/enums/pageName.enum';
import { AbsoluteCommonRoutes } from '@src/application/models/enums/routes.enum';

function SearchPage(): JSX.Element {
    const { setPageBreadcrumb } = useBreadcrumb();
    const [searchParams] = useSearchParams();
    useEffect(() => {
        setPageBreadcrumb([
            { title: PageName.Home, href: AbsoluteCommonRoutes.BaseUrl },
            { title: PageName.Search },
        ]);
    }, [setPageBreadcrumb]);

    const searchTerm = searchParams.get(SEARCH_QUERY_PARAM);
    const {
        data: products,
        isLoading,
        isError,
    } = useGetSearchProductsQuery(searchTerm as string);

    if (isLoading) {
        return <CategoryPageLoader />;
    }

    return (
        <div className={styles.container}>
            <Title className={styles.title}>
                Search Results for: {searchTerm}
            </Title>
            {products ? <ProductList products={products} /> : null}
        </div>
    );
}

export default SearchPage;
