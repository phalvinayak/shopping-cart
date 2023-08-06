import { Button, Divider } from 'antd';
import styles from '../cart-page/CartPage.less';
import Title from 'antd/es/typography/Title';
import CartProducts from '@src/presentation/shared/components/cart-products/CartProducts';
import CartSummary from '@src/presentation/shared/components/cart-summary/CartSummary';
import { Link } from 'react-router-dom';
import { AbsoluteCommonRoutes } from '@src/application/models/enums/routes.enum';
import { ShoppingCartOutlined } from '@ant-design/icons';
import cn from 'classnames';
import { useEffect } from 'react';
import useBreadcrumb from '@src/presentation/shared/hooks/useBreadcrumb';
import { PageName } from '@src/application/models/enums/pageName.enum';

function CheckoutPage(): JSX.Element {
    const { setPageBreadcrumb } = useBreadcrumb();

    useEffect(() => {
        setPageBreadcrumb([
            { title: PageName.Home, href: AbsoluteCommonRoutes.BaseUrl },
            { title: PageName.Cart, href: AbsoluteCommonRoutes.Cart },
            { title: PageName.Checkout },
        ]);
    }, [setPageBreadcrumb]);

    return (
        <div className={styles.container}>
            <Title>Checkout</Title>
            <Divider />
            <div className={styles.cartWrapper}>
                <div className={styles.cartProducts}>
                    <CartProducts edit={false} />
                    <div className={styles.editCart}>
                        <Link to={AbsoluteCommonRoutes.Cart}>
                            <Button
                                type="primary"
                                size="large"
                                icon={<ShoppingCartOutlined />}
                            >
                                Edit Cart
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className={cn(styles.cartSummary, styles.payment)}>
                    <CartSummary placeOrder={true} />
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;
