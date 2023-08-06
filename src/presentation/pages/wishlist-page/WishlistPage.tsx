import { PageName } from '@src/application/models/enums/pageName.enum';
import { AbsoluteCommonRoutes } from '@src/application/models/enums/routes.enum';
import ProductList from '@src/presentation/shared/components/product-list/ProductList';
import useBreadcrumb from '@src/presentation/shared/hooks/useBreadcrumb';
import useWishlist from '@src/presentation/shared/hooks/useWishlist';
import Title from 'antd/es/typography/Title';
import { useEffect } from 'react';

function WishlistPage(): JSX.Element {
    const { wishlistProducts } = useWishlist();
    const { setPageBreadcrumb } = useBreadcrumb();

    useEffect(() => {
        setPageBreadcrumb([
            { title: PageName.Home, href: AbsoluteCommonRoutes.BaseUrl },
            { title: PageName.Wishlist },
        ]);
    }, [setPageBreadcrumb]);

    return (
        <div>
            <Title>Wishlist Products</Title>
            {wishlistProducts ? (
                <ProductList products={wishlistProducts} />
            ) : null}
        </div>
    );
}

export default WishlistPage;
