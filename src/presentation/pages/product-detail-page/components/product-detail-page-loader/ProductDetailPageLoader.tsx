import { Skeleton, Space } from 'antd';

const ProductDetailPageLoader = () => {
    return (
        <div>
            <Space>
                <Skeleton.Image active />
            </Space>
        </div>
    );
};

export default ProductDetailPageLoader;
