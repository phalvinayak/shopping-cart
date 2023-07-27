import { useGetProductQuery } from '@src/application/redux/api/products/products.api';
import { Navigate, useParams } from 'react-router-dom';
import styles from './product-detail.less';
import Title from 'antd/es/typography/Title';
import ProductDetailPageLoader from '@src/presentation/pages/product-detail-page/components/product-detail-page-loader';
import { Divider } from 'antd';
import { loadavg } from 'os';
import ProductDetail from '@src/presentation/pages/product-detail-page/components/product-detail';

const ProductDetailPage = () => {
    const { productId } = useParams<string>();
    const { data, isLoading, error } = useGetProductQuery(productId as string);
    if (isLoading) {
        return <ProductDetailPageLoader />;
    }
    return data ? <ProductDetail product={data} /> : null;
};

export default ProductDetailPage;
