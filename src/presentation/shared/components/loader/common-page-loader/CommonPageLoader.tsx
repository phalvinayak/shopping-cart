import { Skeleton, Space } from 'antd';

const CommonPageLoader = () => {
    return (
        <div>
            <Space>
                <Skeleton.Image active />
            </Space>
        </div>
    );
};

export default CommonPageLoader;
