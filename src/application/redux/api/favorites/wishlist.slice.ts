import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    Product,
    ProductLite,
} from '@src/application/redux/api/products/products.model';
import { RootState } from '@src/application/redux/store';
import { getProductLite } from '@src/presentation/shared/utils/product.utils';

type Favorite = {
    count: number;
    products: {
        [productId: string]: ProductLite;
    };
};

const initialState: Favorite = {
    count: 0,
    products: {},
};

export const wishlistSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addToWishlist: (
            state: Favorite,
            action: PayloadAction<Product | ProductLite>
        ) => {
            if (!state.products[action.payload.id]) {
                const productLite: ProductLite = getProductLite(action.payload);
                state.products[productLite.id] = productLite;
                state.count++;
            }
        },
        removeFromWishlist: (
            state: Favorite,
            action: PayloadAction<number>
        ) => {
            if (state.products[action.payload]) {
                delete state.products[action.payload];
                state.count--;
            }
        },
    },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export const selectFavorite = (state: RootState) => state[wishlistSlice.name];
