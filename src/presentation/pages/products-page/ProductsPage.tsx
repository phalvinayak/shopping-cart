import { ClusterOutlined } from '@ant-design/icons';
import { PageName } from '@src/application/models/enums/pageName.enum';
import { AbsoluteCommonRoutes } from '@src/application/models/enums/routes.enum';
import XCarousel from '@src/presentation/pages/products-page/components/Carousel/XCarousel';
import ProductsLoader from '@src/presentation/pages/products-page/components/products-loader/ProductLoader';
import useGetProducts from '@src/presentation/pages/products-page/hooks/useGetProducts';
import ProductList from '@src/presentation/shared/components/product-list/ProductList';
import useBreadcrumb from '@src/presentation/shared/hooks/useBreadcrumb';
import { Affix, Button, Pagination } from 'antd';
import Title from 'antd/es/typography/Title';
import { useEffect } from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import styles from './ProductsPage.less';

const ProductsPage = (): JSX.Element => {
    const { currentPage, setCurrentPage, isLoading, data } = useGetProducts();
    const { setPageBreadcrumb } = useBreadcrumb();
    const location = useLocation();
    const isIndexPage =
        matchPath({ path: AbsoluteCommonRoutes.BaseUrl }, location.pathname) !==
        null;

    useEffect(() => {
        isIndexPage
            ? setPageBreadcrumb([{ title: PageName.Home }])
            : setPageBreadcrumb([
                  { title: PageName.Home, href: AbsoluteCommonRoutes.BaseUrl },
                  { title: PageName.Products },
              ]);
    }, [setPageBreadcrumb, isIndexPage]);

    return (
        <div className={styles.container}>
            {matchPath(
                { path: AbsoluteCommonRoutes.BaseUrl },
                location.pathname
            ) !== null ? (
                <XCarousel className={styles.carousel} />
            ) : null}
            <div className={styles.heading}>
                <Title className={styles.title}>Product Listing</Title>
                <Link
                    to={AbsoluteCommonRoutes.Categories}
                    className={styles.categories}
                >
                    <Button type="primary" ghost icon={<ClusterOutlined />}>
                        Browse by Category
                    </Button>
                </Link>
            </div>
            {isLoading ? (
                <ProductsLoader />
            ) : (
                <>
                    {!!data && (
                        <>
                            <ProductList products={data} />
                            <Affix offsetBottom={0}>
                                <div className={styles.pagination}>
                                    <Pagination
                                        current={currentPage}
                                        onChange={setCurrentPage}
                                        total={data?.total}
                                        showSizeChanger={false}
                                        responsive
                                    />
                                </div>
                            </Affix>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default ProductsPage;
