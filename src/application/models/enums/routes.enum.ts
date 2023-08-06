export enum AbsoluteCommonRoutes {
    BaseUrl = '/',
    Products = '/products',
    ProductsPage = '/products/page/:page',
    ProductDetail = '/product/:productId',
    Categories = '/categories',
    CategoryList = '/categories/:category',
    Cart = '/cart',
    Checkout = '/checkout',
    OrderStatus = '/order-status',
    Search = '/search',
    Wishlist = '/wishlist',
    NotFound = '/404',
}

export enum CommonRoutes {
    BaseUrl = '',
    Products = '/products',
    ProductsPage = '/products/page/:page',
    ProductDetail = 'product/:productId',
    Categories = 'categories',
    CategoryList = 'categories/:category',
    Cart = 'cart',
    Checkout = 'checkout',
    OrderStatus = 'order-status',
    Search = 'search',
    Wishlist = 'wishlist',
    NotFound = '404',
}
