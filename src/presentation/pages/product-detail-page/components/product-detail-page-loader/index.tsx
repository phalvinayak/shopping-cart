import { Skeleton, Space } from 'antd';
import styles from './product-detail-page-loader.less';

const ProductDetailPageLoader = () => {
    return (
        <div className={styles.container}>
            <Space>
                <Skeleton.Image active />
            </Space>
        </div>
    );
};

export default ProductDetailPageLoader;
