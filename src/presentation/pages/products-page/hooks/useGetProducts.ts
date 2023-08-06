import { PAGE_LIMIT } from '@src/application/models/constants/common.constants';
import { AbsoluteCommonRoutes } from '@src/application/models/enums/routes.enum';
import { useLazyGetListOfProductsQuery } from '@src/application/redux/api/products/products.api';
import { ProductList } from '@src/application/redux/api/products/products.model';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type GetProductsReturnType = {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    isLoading: boolean;
    data: ProductList | null;
};

const useGetProducts = (): GetProductsReturnType => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<ProductList | null>(null);
    const [getListOfProducts] = useLazyGetListOfProductsQuery();
    const navigate = useNavigate();
    const { page } = useParams<string>();
    const currentPage = page ? parseInt(page, 10) : 1;

    const setCurrentPage = useCallback(
        (page: number) => {
            navigate(
                AbsoluteCommonRoutes.ProductsPage.replace(
                    ':page',
                    page.toString()
                )
            );
        },
        [navigate]
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const currentPage = page ? parseInt(page, 10) : 1;
                const response: ProductList = await getListOfProducts(
                    {
                        limit: PAGE_LIMIT,
                        skip: (currentPage - 1) * PAGE_LIMIT,
                    },
                    true
                ).unwrap();
                setData(response);
            } catch (err: any) {
                setData({
                    products: [],
                    total: 0,
                });
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [getListOfProducts, currentPage]);

    return {
        currentPage,
        setCurrentPage,
        isLoading,
        data,
    };
};

export default useGetProducts;
