import { Skeleton, Space } from 'antd';

const ProductsLoader = () => {
    return (
        <div>
            <Space>
                <Skeleton.Image active />
            </Space>
        </div>
    );
};

export default ProductsLoader;
