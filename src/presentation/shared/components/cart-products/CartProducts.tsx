import { ShoppingCartOutlined } from '@ant-design/icons';
import { AbsoluteCommonRoutes } from '@src/application/models/enums/routes.enum';
import { CartProduct } from '@src/application/redux/api/products/products.model';
import useCart from '@src/presentation/shared/hooks/useCart';
import { Button } from 'antd';
import Title from 'antd/es/typography/Title';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import styles from './CartProducts.less';
import SingleCartProduct from '@src/presentation/shared/components/cart-products/single-cart-product/SingleCartProduct';

type CartProductsProps = {
    edit?: boolean;
};

function CartProducts({ edit = true }: CartProductsProps): JSX.Element {
    const { cartProducts } = useCart();
    return (
        <div className={styles.container}>
            {cartProducts.length === 0 ? (
                <div className={styles.emptyCart}>
                    <Title level={3}>Your cart is empty!</Title>
                    <Link
                        to={AbsoluteCommonRoutes.BaseUrl}
                        className={styles.continueShopping}
                    >
                        <Button
                            type="primary"
                            size="large"
                            icon={<ShoppingCartOutlined />}
                        >
                            Continue Shopping
                        </Button>
                    </Link>
                </div>
            ) : (
                <>
                    <div className={cn(styles.header, styles.products)}>
                        <div className={styles.product}>Product</div>
                        <div className={styles.quantity}>Quantity</div>
                        <div className={styles.price}>Total Price</div>
                        {edit && <div className={styles.action}></div>}
                    </div>
                    {cartProducts.map((product: CartProduct) => (
                        <SingleCartProduct key={product.id} product={product} edit={edit} />
                    ))}
                </>
            )}
        </div>
    );
}

export default CartProducts;
