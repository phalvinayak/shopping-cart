import App from '@src/App';
import { CommonRoutes } from '@src/application/models/enums/routes.enum';
import ErrorPage from '@src/presentation/pages/error-page';
import ProductDetailPage from '@src/presentation/pages/product-detail-page';
import ProductsPage from '@src/presentation/pages/products-page';
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
                        path: CommonRoutes.ProductDetail,
                        element: <ProductDetailPage />,
                    },
                ],
            },
        ],
    },
]);

export default router;
