import { useGetProductsByCategoryQuery } from '@src/application/redux/api/products/products.api';
import {
    Product,
    ProductLite,
} from '@src/application/redux/api/products/products.model';
import ProductDescription from '@src/presentation/pages/product-detail-page/components/product-description/ProductDescription';
import ProductImageGallery from '@src/presentation/pages/product-detail-page/components/product-image-gallery';
import ProductCard from '@src/presentation/shared/components/product-card/ProductCard';
import { capitalize } from '@src/presentation/shared/utils/string.utils';
import { Col, Divider, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import styles from './product-detail.less';

type ProductDetailProps = {
    product: Product;
};

const ProductDetail = ({ product }: ProductDetailProps): JSX.Element => {
    const {
        data: relatedProducts,
        isLoading,
        isError,
    } = useGetProductsByCategoryQuery(product.category);

    return (
        <div className={styles.container}>
            <Title>{capitalize(product.title, ' ')}</Title>
            <Divider />
            <div className={styles.productDetail}>
                <ProductImageGallery
                    product={product}
                    className={styles.productGallery}
                />
                <ProductDescription
                    product={product}
                    className={styles.productDescription}
                />
            </div>
            <Divider />
            <Title level={3}>Related Products</Title>
            {/* @TODO loader can be shown here
            @TODO failure scenario needs to handle */}
            <Row gutter={16}>
                {relatedProducts?.products
                    .filter(
                        (relatedProduct: ProductLite) =>
                            relatedProduct.id !== product.id
                    )
                    .map((relatedProduct: ProductLite) => (
                        <Col
                            xs={24}
                            sm={12}
                            md={8}
                            lg={6}
                            key={relatedProduct.id}
                        >
                            <ProductCard product={relatedProduct} />
                        </Col>
                    ))}
            </Row>
        </div>
    );
};

export default ProductDetail;
