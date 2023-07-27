import { Product } from '@src/application/redux/api/products/products.model';
import styles from './product-detail.less';
import Title from 'antd/es/typography/Title';
import { Divider, Image } from 'antd';

type ProductDetailProps = {
    product: Product;
};

const ProductDetail = ({ product }: ProductDetailProps): JSX.Element => {
    return (
        <div className={styles.container}>
            <Title>{product.title}</Title>
            <Divider />
            <Image.PreviewGroup items={product.images.slice(1)}>
                <Image src={product.images[0]} />
            </Image.PreviewGroup>
        </div>
    );
};

export default ProductDetail;
