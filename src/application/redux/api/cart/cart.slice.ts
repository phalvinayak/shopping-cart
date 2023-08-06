import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    CartProduct,
    Product,
} from '@src/application/redux/api/products/products.model';
import { RootState } from '@src/application/redux/store';
import { getCartProduct } from '@src/presentation/shared/utils/product.utils';

type Cart = {
    totalCount: number;
    items: {
        [productId: string]: CartProduct;
    };
};

const initialState: Cart = {
    totalCount: 0,
    items: {},
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state: Cart, action: PayloadAction<Product>) => {
            state.totalCount++;
            if (state.items[action.payload.id]) {
                state.items[action.payload.id].count++;
            } else {
                const productLite = getCartProduct(action.payload);
                state.items[action.payload.id] = {
                    ...productLite,
                    count: 1,
                };
            }
        },
        updateCart: (state: Cart, action: PayloadAction<number>) => {
            if (state.items[action.payload]) {
                state.totalCount++;
                state.items[action.payload].count++;
            }
        },
        removeFromCart: (state: Cart, action: PayloadAction<number>) => {
            if (
                state.items[action.payload] &&
                state.items[action.payload].count >= 2
            ) {
                state.totalCount--;
                state.items[action.payload].count--;
            }
        },
        deleteFromCart: (state: Cart, action: PayloadAction<number>) => {
            if (
                state.items[action.payload] &&
                state.items[action.payload].count >= 1
            ) {
                state.totalCount =
                    state.totalCount - state.items[action.payload].count;
                delete state.items[action.payload];
            }
        },
        clearCart: () => {
            return initialState;
        },
    },
});

export const {
    addToCart,
    updateCart,
    clearCart,
    removeFromCart,
    deleteFromCart,
} = cartSlice.actions;

export const selectCart = (state: RootState) => state[cartSlice.name];
