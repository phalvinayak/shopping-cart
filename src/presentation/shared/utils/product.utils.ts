import {
    CartProduct,
    Product,
    ProductLite,
} from '@src/application/redux/api/products/products.model';

export function getCartProduct(product: Product): CartProduct {
    const { images, discountPercentage, ...productLite } = product;
    return { ...productLite, count: 0 };
}

export function getProductLite(product: Product | ProductLite): ProductLite {
    if (
        product.hasOwnProperty('images') &&
        product.hasOwnProperty('discountPercentage')
    ) {
        const { images, discountPercentage, ...productLite } =
            product as Product;
        return { ...productLite };
    }
    return product;
}
