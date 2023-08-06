import { CreditCardOutlined } from '@ant-design/icons';
import { AbsoluteCommonRoutes } from '@src/application/models/enums/routes.enum';
import { clearCart } from '@src/application/redux/api/cart/cart.slice';
import supportedPayment from '@src/assets/icons/payment-options.png';
import useCart from '@src/presentation/shared/hooks/useCart';
import { numToPrice } from '@src/presentation/shared/utils/price.utils';
import { Button, Divider, Input, Space } from 'antd';
import Title from 'antd/es/typography/Title';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import styles from './CartSummary.less';
import { LoadingOutlined } from '@ant-design/icons';
import { AppDispatch } from '@src/application/redux/store';

type CartSummaryProps = {
    placeOrder?: boolean;
};

function CartSummary({ placeOrder = false }: CartSummaryProps): JSX.Element {
    const {
        cartTotal,
        totalCartProduct,
        isCartEmpty,
        placeOrder: placeOrderFn,
        shippingTaxes,
        grandTotal,
    } = useCart();
    const dispatch: AppDispatch = useDispatch();
    const navigate: NavigateFunction = useNavigate();
    const [loader, setLoader] = useState<boolean>(false);

    const placeOrderHandler: () => Promise<void> = async () => {
        setLoader(true);
        try {
            await placeOrderFn();
            dispatch(clearCart());
            navigate(AbsoluteCommonRoutes.OrderStatus, {
                state: {
                    orderId: Date.now(),
                },
            });
        } catch (e: any) {
            console.warn(e.message);
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className={styles.container}>
            {placeOrder ? (
                <>
                    <Title level={3}>Card Details</Title>
                    <div className={styles.cartTypesText}>Card Types</div>
                    <img
                        className={styles.cardTypes}
                        src={supportedPayment}
                        alt="PayPal Visa Master card Amex"
                    />
                    <div className={styles.paymentForm}>
                        <Space direction="vertical">
                            <Input placeholder="Cardholder's Name" />
                            <Input placeholder="Card Number" />
                            <Space direction="horizontal">
                                <Input placeholder="Expiration" />
                                <Input placeholder="CVV" />
                            </Space>
                        </Space>
                    </div>
                </>
            ) : (
                <Title level={3}>Order Summary</Title>
            )}
            <Divider />
            <div className={styles.summary}>
                <div className={styles.row}>
                    <span>Total Items: </span>
                    <strong>{totalCartProduct}</strong>
                </div>
                <div className={styles.row}>
                    <span>Cart Total: </span>
                    <strong>${numToPrice(cartTotal)}</strong>
                </div>
                <div className={styles.row}>
                    <span>Shipping and Taxes: </span>
                    <strong>${numToPrice(shippingTaxes)}</strong>
                </div>
                <div className={styles.row}>
                    <span>Grand Total: </span>
                    <strong>${numToPrice(grandTotal)}</strong>
                </div>
            </div>
            <Divider />
            {!isCartEmpty && !placeOrder ? (
                <Link to={AbsoluteCommonRoutes.Checkout}>
                    <Button
                        block
                        type="primary"
                        size="large"
                        icon={<CreditCardOutlined />}
                    >
                        Checkout
                    </Button>
                </Link>
            ) : null}

            {!isCartEmpty && placeOrder ? (
                <Button
                    block
                    type="primary"
                    size="large"
                    icon={<CreditCardOutlined />}
                    disabled={loader}
                    className={styles.placeOrderBtn}
                    onClick={placeOrderHandler}
                >
                    Place Order {loader ? <LoadingOutlined /> : null}
                </Button>
            ) : null}
        </div>
    );
}

export default CartSummary;
