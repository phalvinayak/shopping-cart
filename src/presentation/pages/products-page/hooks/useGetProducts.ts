import { PAGE_LIMIT } from '@src/application/models/constants/common.constants';
import { useLazyGetListOfProductsQuery } from '@src/application/redux/api/products/products.api';
import { ProductList } from '@src/application/redux/api/products/products.model';
import { useCallback, useEffect, useState } from 'react';

type GetProductsReturnType = {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    isLoading: boolean;
    data: ProductList | null;
};

const useGetProducts = (): GetProductsReturnType => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<ProductList | null>(null);
    const [getListOfProducts] = useLazyGetListOfProductsQuery();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
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
