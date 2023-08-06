import { BaseFilterModel } from '@src/application/redux/models/base-filter.model';
import { BaseResponseModel } from '@src/application/redux/models/base-response.model';

export interface ProductList extends BaseResponseModel {
    readonly products: Product[] | ProductLite[];
}

export interface Product {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly price: number;
    readonly discountPercentage: number;
    readonly rating: number;
    readonly stock: number;
    readonly brand: string;
    readonly category: string;
    readonly thumbnail: string;
    readonly images: string[];
}

export type ProductLite = Omit<Product, 'images' | 'discountPercentage'>;

export type CartProduct = ProductLite & {
    count: number;
};

export interface ProductSearch extends BaseFilterModel {
    q?: string;
}
