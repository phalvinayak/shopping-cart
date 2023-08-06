import { selectCart } from '@src/application/redux/api/cart/cart.slice';
import {
    Product,
    CartProduct,
} from '@src/application/redux/api/products/products.model';
import { useTimer } from '@src/presentation/shared/hooks/useTimer';
import { numToPrice } from '@src/presentation/shared/utils/price.utils';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

type HookReturnType = {
    totalCartProduct: number;
    cartTotal: number;
    shippingTaxes: number;
    grandTotal: number;
    cartProducts: CartProduct[];
    placeOrder: () => Promise<void>;
    isCartEmpty: boolean;
};

const PLACE_ORDER_TIME = 2000;

function useCart(): HookReturnType {
    const { totalCount, items } = useSelector(selectCart);
    const [orderTimer] = useTimer(PLACE_ORDER_TIME);

    const cartDetail: {
        cartTotal: number;
        cartProducts: CartProduct[];
        shippingTaxes: number;
        grandTotal: number;
    } = useMemo(() => {
        let cartTotal: number = 0;
        let cartProducts: CartProduct[] = [];
        for (const productId in items) {
            const product: CartProduct = items[productId];
            cartTotal += product.price * product.count;
            cartProducts.push(product);
        }
        const shippingTaxes: number = cartTotal * 0.04;
        const grandTotal: number = cartTotal + shippingTaxes;
        return {
            cartTotal,
            cartProducts,
            shippingTaxes,
            grandTotal,
        };
    }, [items]);

    const isCartEmpty = useMemo(() => totalCount === 0, [totalCount]);

    const placeOrder: () => Promise<void> = useCallback(async () => {
        await orderTimer();
    }, []);

    return {
        totalCartProduct: totalCount,
        isCartEmpty,
        placeOrder,
        ...cartDetail,
    };
}

export default useCart;
