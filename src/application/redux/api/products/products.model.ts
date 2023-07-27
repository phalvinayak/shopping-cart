import { BaseFilterModel } from '@src/application/redux/models/base-filter.model';
import { BaseResponseModel } from '@src/application/redux/models/base-response.model';

export interface ProductList extends BaseResponseModel {
    readonly products: Product[];
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

export interface ProductSearch extends BaseFilterModel {
    q?: string;
}
