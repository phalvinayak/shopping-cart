import { Card, Typography } from 'antd';
import { MouseEventHandler, MouseEvent } from 'react';
import Meta from 'antd/es/card/Meta';
import {
    Product,
    ProductLite,
} from '@src/application/redux/api/products/products.model';
import styles from './product-card.less';
import Paragraph from 'antd/es/typography/Paragraph';
import { Link } from 'react-router-dom';
import StarRating from '@src/assets/icons/star-rating.svg';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import Icon from '@src/presentation/shared/Icon/Icon';
import { AbsoluteCommonRoutes } from '@src/application/models/enums/routes.enum';
import { capitalize } from '@src/presentation/shared/utils/string.utils';
import useWishlist from '@src/presentation/shared/hooks/useWishlist';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
    addToWishlist,
    removeFromWishlist,
} from '@src/application/redux/api/favorites/wishlist.slice';
import { AppDispatch } from '@src/application/redux/store';

type ProductType = {
    product: Product | ProductLite;
};

const ProductCard = ({ product }: ProductType): JSX.Element => {
    const { Text } = Typography;
    const { isInWishlist } = useWishlist();
    const dispatch: AppDispatch = useDispatch();

    const addToWishlistHandler: (e: MouseEvent) => void = useCallback(
        (e: MouseEvent) => {
            e.preventDefault();
            dispatch(addToWishlist(product));
        },
        [dispatch, addToWishlist, product]
    );

    const removeFromWishlistHandler: (e: MouseEvent) => void = useCallback(
        (e: MouseEvent) => {
            e.preventDefault();
            dispatch(removeFromWishlist(product.id));
        },
        [dispatch, removeFromWishlist, product]
    );

    return (
        <Link
            to={AbsoluteCommonRoutes.ProductDetail.replace(
                ':productId',
                product.id.toString()
            )}
        >
            <Card
                hoverable
                className={styles.productCard}
                cover={
                    <img
                        alt={product.title}
                        src={product.thumbnail}
                        className={styles.image}
                    />
                }
            >
                {isInWishlist(product.id) ? (
                    <HeartFilled
                        className={styles.heart}
                        onClick={removeFromWishlistHandler}
                    />
                ) : (
                    <HeartOutlined
                        className={styles.heart}
                        onClick={addToWishlistHandler}
                    />
                )}
                <span className={styles.rating}>
                    <span className={styles.number}>{product.rating}</span>
                    <Icon src={StarRating} className={styles.ratingIcon} />
                </span>
                <Meta
                    title={capitalize(product.title, ' ')}
                    description={
                        <Paragraph ellipsis={{ rows: 2, symbol: '...' }}>
                            {product.description}
                        </Paragraph>
                    }
                />
                <div className={styles.price}>
                    <span>
                        By: <Text strong>{capitalize(product.brand)}</Text>
                    </span>
                    <span>
                        Price: <Text strong>${product.price}</Text>
                    </span>
                </div>
            </Card>
        </Link>
    );
};

export default ProductCard;
