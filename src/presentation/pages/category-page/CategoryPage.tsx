import { CaretRightOutlined } from '@ant-design/icons';
import { PageName } from '@src/application/models/enums/pageName.enum';
import { AbsoluteCommonRoutes } from '@src/application/models/enums/routes.enum';
import { useGetProductsByCategoryQuery } from '@src/application/redux/api/products/products.api';
import CategoryPageLoader from '@src/presentation/pages/category-page/components/CategoryPageLoader/CategoryPageLoader';
import ProductList from '@src/presentation/shared/components/product-list/ProductList';
import useBreadcrumb from '@src/presentation/shared/hooks/useBreadcrumb';
import { capitalize } from '@src/presentation/shared/utils/string.utils';
import Title from 'antd/es/typography/Title';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CategoryPage.less';

function CategoryPage(): JSX.Element {
    const { category } = useParams<string>();
    const { setPageBreadcrumb } = useBreadcrumb();

    useEffect(() => {
        setPageBreadcrumb([
            { title: PageName.Home, href: AbsoluteCommonRoutes.BaseUrl },
            {
                title: PageName.CategoryList,
                href: AbsoluteCommonRoutes.Categories,
            },
            { title: PageName.CategoryProducts },
        ]);
    }, [setPageBreadcrumb]);

    const {
        data: products,
        isLoading,
        isError,
    } = useGetProductsByCategoryQuery(category as string);

    const categoryTitle = capitalize(category as string);

    if (isLoading) {
        return <CategoryPageLoader />;
    }
    return (
        <div className={styles.container}>
            <Title className={styles.title}>
                {categoryTitle} <CaretRightOutlined /> Listing
            </Title>
            {products ? <ProductList products={products} /> : null}
        </div>
    );
}

export default CategoryPage;
