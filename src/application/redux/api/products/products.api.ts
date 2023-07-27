import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import {
    GET_PRODUCTS,
    GET_SINGLE_PRODUCTS,
    PRODUCTS_API_BASE,
} from '@src/application/redux/api/products/products.constant';
import {
    Product,
    ProductList,
} from '@src/application/redux/api/products/products.model';
import { BaseFilterModel } from '@src/application/redux/models/base-filter.model';
import { setCommonHeaders } from '@src/application/redux/store.util';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: PRODUCTS_API_BASE,
        prepareHeaders: (headers) => setCommonHeaders(headers),
    }),
    endpoints: (build) => ({
        getListOfProducts: build.query<ProductList, BaseFilterModel>({
            query: (filter: BaseFilterModel) => {
                return {
                    url: GET_PRODUCTS,
                    method: 'GET',
                    params: filter,
                };
            },
        }),
        getProduct: build.query<Product, string>({
            query: (productId: string) => {
                return {
                    url: GET_SINGLE_PRODUCTS.replace(':productId', productId),
                    method: 'GET',
                };
            },
        }),
    }),
});

export const { useLazyGetListOfProductsQuery, useGetProductQuery } =
    productsApi;
