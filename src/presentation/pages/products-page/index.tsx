import ProductCard from '@src/presentation/pages/products-page/components/product-card';
import ProductsLoader from '@src/presentation/pages/products-page/components/products-loader';
import useGetProducts from '@src/presentation/pages/products-page/hooks/useGetProducts';
import { Col, Pagination, Row } from 'antd';
import style from './products-page.less';

const ProductsPage = (): JSX.Element => {
    const { currentPage, setCurrentPage, isLoading, data } = useGetProducts();

    if (isLoading) {
        return <ProductsLoader />;
    }

    return (
        <div>
            <Row gutter={16}>
                {data?.products.map((product) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
            <div className={style.pagination}>
                <Pagination
                    current={currentPage}
                    onChange={setCurrentPage}
                    total={data?.total}
                    showSizeChanger={false}
                    responsive
                />
            </div>
        </div>
    );
};

export default ProductsPage;
