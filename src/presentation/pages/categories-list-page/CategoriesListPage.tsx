import { useGetCategoriesQuery } from '@src/application/redux/api/products/products.api';
import CategoriesPageLoader from '@src/presentation/pages/categories-list-page/components/categories-page-loader/CategoriesPageLoader';
import { Col, Row } from 'antd';
import CategoryCard from '@src/presentation/pages/categories-list-page/components/CategoryCard/CategoryCard';
import { PageName } from '@src/application/models/enums/pageName.enum';
import { useEffect } from 'react';
import useBreadcrumb from '@src/presentation/shared/hooks/useBreadcrumb';
import { AbsoluteCommonRoutes } from '@src/application/models/enums/routes.enum';

function CategoriesListPage(): JSX.Element {
    const { data: categories, isLoading, isError } = useGetCategoriesQuery();
    const { setPageBreadcrumb } = useBreadcrumb();

    useEffect(() => {
        setPageBreadcrumb([
            { title: PageName.Home, href: AbsoluteCommonRoutes.BaseUrl },
            { title: PageName.CategoryList },
        ]);
    }, [setPageBreadcrumb]);
    if (isLoading) {
        return <CategoriesPageLoader />;
    }
    return (
        <div>
            <Row gutter={16}>
                {categories?.map((category: string) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={category}>
                        <CategoryCard category={category} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default CategoriesListPage;
