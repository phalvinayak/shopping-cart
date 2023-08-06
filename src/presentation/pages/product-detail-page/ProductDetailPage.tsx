import { useGetProductQuery } from '@src/application/redux/api/products/products.api';
import ProductDetail from '@src/presentation/pages/product-detail-page/components/product-detail/ProductDetail';
import ProductDetailPageLoader from '@src/presentation/pages/product-detail-page/components/product-detail-page-loader/ProductDetailPageLoader';
import { useParams } from 'react-router-dom';
import useBreadcrumb from '@src/presentation/shared/hooks/useBreadcrumb';
import { useEffect } from 'react';
import { PageName } from '@src/application/models/enums/pageName.enum';
import { AbsoluteCommonRoutes } from '@src/application/models/enums/routes.enum';

const ProductDetailPage = () => {
    const { productId } = useParams<string>();
    const { data, isLoading, error } = useGetProductQuery(productId as string);
    const { setPageBreadcrumb } = useBreadcrumb();

    useEffect(() => {
        setPageBreadcrumb([
            { title: PageName.Home, href: AbsoluteCommonRoutes.BaseUrl },
            { title: PageName.ProductDetail },
        ]);
    }, [setPageBreadcrumb]);

    if (isLoading) {
        return <ProductDetailPageLoader />;
    }
    return data ? <ProductDetail product={data} /> : null;
};

export default ProductDetailPage;
