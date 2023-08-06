import { Skeleton, Space } from 'antd';

const CategoriesPageLoader = () => {
    return (
        <div>
            <Space>
                <Skeleton.Image active />
            </Space>
        </div>
    );
};

export default CategoriesPageLoader;
