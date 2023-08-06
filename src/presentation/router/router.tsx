import App from '@src/App';
import { CommonRoutes } from '@src/application/models/enums/routes.enum';
import CartPage from '@src/presentation/pages/cart-page/CartPage';
import CategoriesListPage from '@src/presentation/pages/categories-list-page/CategoriesListPage';
import CategoryPage from '@src/presentation/pages/category-page/CategoryPage';
import CheckoutPage from '@src/presentation/pages/checkout-page/CheckoutPage';
import ErrorPage from '@src/presentation/pages/error-page/ErrorPage';
import PlaceOrderPage from '@src/presentation/pages/order-status-page/OrderStatusPage';
import ProductDetailPage from '@src/presentation/pages/product-detail-page/ProductDetailPage';
import ProductsPage from '@src/presentation/pages/products-page/ProductsPage';
import SearchPage from '@src/presentation/pages/search-page/SearchPage';
import WishlistPage from '@src/presentation/pages/wishlist-page/WishlistPage';
import { ROOT_ROUTE_ID } from '@src/presentation/router/router.constants';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        id: ROOT_ROUTE_ID,
        errorElement: <ErrorPage />,
        children: [
            {
                path: CommonRoutes.BaseUrl,
                children: [
                    {
                        index: true,
                        element: <ProductsPage />,
                    },
                    {
                        path: CommonRoutes.Products,
                        element: <ProductsPage />,
                    },
                    {
                        path: CommonRoutes.ProductsPage,
                        element: <ProductsPage />,
                    },
                    {
                        path: CommonRoutes.ProductDetail,
                        element: <ProductDetailPage />,
                    },
                    {
                        path: CommonRoutes.Categories,
                        element: <CategoriesListPage />,
                    },
                    {
                        path: CommonRoutes.CategoryList,
                        element: <CategoryPage />,
                    },
                    {
                        path: CommonRoutes.Cart,
                        element: <CartPage />,
                    },
                    {
                        path: CommonRoutes.Checkout,
                        element: <CheckoutPage />,
                    },
                    {
                        path: CommonRoutes.OrderStatus,
                        element: <PlaceOrderPage />,
                    },
                    {
                        path: CommonRoutes.Search,
                        element: <SearchPage />,
                    },
                    {
                        path: CommonRoutes.Wishlist,
                        element: <WishlistPage />,
                    },
                ],
            },
        ],
    },
]);

export default router;
