import Icon from '@src/presentation/shared/Icon/Icon';
import styles from './ProductDescription.less';
import { Product } from '@src/application/redux/api/products/products.model';
import Title from 'antd/es/typography/Title';
import StarRating from '@src/assets/icons/star-rating.svg';
import { Button } from 'antd';
import { ShoppingCartOutlined, GiftFilled } from '@ant-design/icons';
import {
    discoutToActualPrice,
    numToPrice,
} from '@src/presentation/shared/utils/price.utils';
import cn from 'classnames';
import { addToCart } from '@src/application/redux/api/cart/cart.slice';
import { useDispatch } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { AppDispatch } from '@src/application/redux/store';
import { capitalize } from '@src/presentation/shared/utils/string.utils';
import {
    addToWishlist,
    removeFromWishlist,
} from '@src/application/redux/api/favorites/wishlist.slice';
import useWishlist from '@src/presentation/shared/hooks/useWishlist';

type ProductDescriptionProps = {
    product: Product;
    className?: string;
};
function ProductDescription({
    product,
    className,
}: ProductDescriptionProps): JSX.Element {
    const dispatch: Dispatch = useDispatch<AppDispatch>();
    const { isInWishlist } = useWishlist();

    const addToCartHandler = useCallback(() => {
        dispatch(addToCart(product));
    }, [dispatch, addToCart, product]);

    const addToWishlistHandler = useCallback(() => {
        dispatch(addToWishlist(product));
    }, [dispatch, addToWishlist, product]);

    const removeFromWishlistHandler = useCallback(() => {
        dispatch(removeFromWishlist(product.id));
    }, [dispatch, removeFromWishlist, product]);

    return (
        <div className={cn(className, styles.container)}>
            <Title level={3}>{capitalize(product.title, ' ')}</Title>
            <div className={styles.rating}>
                <span className={styles.number}>{product.rating}</span>
                <Icon src={StarRating} className={styles.ratingIcon} />
            </div>
            <p className={styles.description}>{product.description}</p>
            <p>
                <strong>Brand:</strong> {product.brand}
            </p>
            <p>
                <strong>Category:</strong> {product.category}
            </p>
            <div className={styles.price}>
                <span className={styles.originalPrice}>
                    $
                    {discoutToActualPrice(
                        product.price,
                        product.discountPercentage
                    )}
                </span>
                <span className={styles.finalPrice}>
                    ${numToPrice(product.price)}
                </span>
            </div>
            <div className={styles.actionBtns}>
                {isInWishlist(product.id) ? (
                    <Button
                        className={styles.addToCart}
                        type="primary"
                        shape="round"
                        icon={<GiftFilled />}
                        size="large"
                        onClick={removeFromWishlistHandler}
                    >
                        Remove from Wishlist
                    </Button>
                ) : (
                    <Button
                        className={styles.addToCart}
                        type="primary"
                        shape="round"
                        icon={<GiftFilled />}
                        size="large"
                        onClick={addToWishlistHandler}
                    >
                        Add to Wishlist
                    </Button>
                )}
                <Button
                    className={styles.addToCart}
                    type="primary"
                    shape="round"
                    icon={<ShoppingCartOutlined />}
                    size="large"
                    onClick={addToCartHandler}
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}

export default ProductDescription;
