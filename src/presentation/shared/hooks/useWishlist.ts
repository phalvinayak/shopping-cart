import { selectFavorite } from '@src/application/redux/api/favorites/wishlist.slice';
import {
    ProductList,
    ProductLite,
} from '@src/application/redux/api/products/products.model';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

type HookReturnType = {
    wishlistCount: number;
    wishlistProducts: ProductList;
    isInWishlist: (id: number) => boolean;
};

function useWishlist(): HookReturnType {
    const { count, products } = useSelector(selectFavorite);

    const wishlistProducts = useMemo(() => {
        const productsArr: ProductLite[] = Object.values(products);
        return { products: productsArr, total: productsArr.length };
    }, [products]);

    const isInWishlist = useCallback(
        (id: number) => {
            return products.hasOwnProperty(id.toString());
        },
        [products]
    );

    return {
        wishlistCount: count,
        wishlistProducts,
        isInWishlist,
    };
}

export default useWishlist;
