import { Skeleton, Space } from 'antd';
import styles from './products-page-loader.less';

const ProductsLoader = () => {
    return (
        <div className={styles.container}>
            <Space>
                <Skeleton.Image active />
            </Space>
        </div>
    );
};

export default ProductsLoader;
