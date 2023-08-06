import { CartProduct } from '@src/application/redux/api/products/products.model';
import styles from '../CartProducts.less';
import { Link } from 'react-router-dom';
import { AbsoluteCommonRoutes } from '@src/application/models/enums/routes.enum';
import { Button, Image } from 'antd';
import Title from 'antd/es/typography/Title';
import { numToPrice } from '@src/presentation/shared/utils/price.utils';
import { DeleteTwoTone, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { capitalize } from '@src/presentation/shared/utils/string.utils';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
    updateCart,
    removeFromCart,
    deleteFromCart,
} from '@src/application/redux/api/cart/cart.slice';
import { Dispatch } from '@reduxjs/toolkit';
import { AppDispatch } from '@src/application/redux/store';

type SingleCartProductProps = {
    product: CartProduct;
    edit: boolean;
};
function SingleCartProduct({
    product,
    edit,
}: SingleCartProductProps): JSX.Element {
    const dispatch: Dispatch = useDispatch<AppDispatch>();

    const increaseQuantity = useCallback(() => {
        dispatch(updateCart(product.id));
    }, [dispatch, updateCart]);

    const decreaseQuantity = useCallback(() => {
        dispatch(removeFromCart(product.id));
    }, [dispatch, removeFromCart]);

    const deleteItem = useCallback(() => {
        dispatch(deleteFromCart(product.id));
    }, [dispatch, deleteFromCart]);

    return (
        <div className={styles.products}>
            <div className={styles.product}>
                <Link
                    to={AbsoluteCommonRoutes.ProductDetail.replace(
                        ':productId',
                        product.id.toString()
                    )}
                >
                    <Image
                        preview={false}
                        className={styles.image}
                        src={product.thumbnail}
                    />
                </Link>
                <div className={styles.detail}>
                    <Title level={5}>{capitalize(product.title)}</Title>
                    <div className={styles.scategory}>
                        <strong>Category:</strong> {product.category}
                    </div>
                    <div className={styles.brand}>
                        <strong>Brand:</strong> {product.brand}
                    </div>
                    <div className={styles.brand}>
                        <strong>Unit Price:</strong> $
                        {numToPrice(product.price)}
                    </div>
                </div>
            </div>
            <div className={styles.quantity}>
                {edit && (
                    <Button
                        ghost
                        size="small"
                        type="primary"
                        onClick={increaseQuantity}
                    >
                        <PlusOutlined />
                    </Button>
                )}
                <span className={styles.count}>{product.count}</span>
                {edit && (
                    <Button
                        ghost
                        size="small"
                        type="primary"
                        disabled={product.count === 1}
                        onClick={decreaseQuantity}
                    >
                        <MinusOutlined />
                    </Button>
                )}
            </div>
            <div className={styles.price}>
                <strong>${numToPrice(product.price * product.count)}</strong>
            </div>
            {edit && (
                <div className={styles.action}>
                    <Button
                        ghost
                        size="small"
                        type="primary"
                        onClick={deleteItem}
                    >
                        <DeleteTwoTone />
                    </Button>
                </div>
            )}
        </div>
    );
}

export default SingleCartProduct;
