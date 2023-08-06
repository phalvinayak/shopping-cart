import styles from './CartPage.less';
import CartProducts from '@src/presentation/shared/components/cart-products/CartProducts';
import CartSummary from '@src/presentation/shared/components/cart-summary/CartSummary';
import { Button, Divider } from 'antd';
import Title from 'antd/es/typography/Title';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { clearCart } from '@src/application/redux/api/cart/cart.slice';
import { AppDispatch } from '@src/application/redux/store';
import useCart from '@src/presentation/shared/hooks/useCart';
import useBreadcrumb from '@src/presentation/shared/hooks/useBreadcrumb';
import { PageName } from '@src/application/models/enums/pageName.enum';
import { AbsoluteCommonRoutes } from '@src/application/models/enums/routes.enum';

function CartPage(): JSX.Element {
    const { isCartEmpty } = useCart();
    const dispatch: Dispatch = useDispatch<AppDispatch>();
    const { setPageBreadcrumb } = useBreadcrumb();

    useEffect(() => {
        setPageBreadcrumb([
            { title: PageName.Home, href: AbsoluteCommonRoutes.BaseUrl },
            { title: PageName.Cart },
        ]);
    }, [setPageBreadcrumb]);

    const clearCartHandler = useCallback(() => {
        dispatch(clearCart());
    }, [dispatch, clearCart]);
    return (
        <div className={styles.container}>
            <Title>Your Bag</Title>
            <Divider />
            <div className={styles.cartWrapper}>
                <div className={styles.cartProducts}>
                    <CartProducts />
                    {!isCartEmpty && (
                        <div className={styles.editCart}>
                            <Button
                                type="primary"
                                size="large"
                                danger
                                icon={<ShoppingCartOutlined />}
                                onClick={clearCartHandler}
                            >
                                Clear Cart
                            </Button>
                        </div>
                    )}
                </div>
                <div className={styles.cartSummary}>
                    <CartSummary />
                </div>
            </div>
        </div>
    );
}

export default CartPage;
