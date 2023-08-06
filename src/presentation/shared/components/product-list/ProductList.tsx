import {
    ProductLite,
    ProductList as Products,
} from '@src/application/redux/api/products/products.model';
import ProductCard from '@src/presentation/shared/components/product-card/ProductCard';
import { Col, Row } from 'antd';

type CategoryListProps = {
    products: Products;
};

function ProductList({ products }: CategoryListProps): JSX.Element {
    return (
        <div>
            <Row gutter={16}>
                {products.products.map((product: ProductLite) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                        <ProductCard product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default ProductList;
