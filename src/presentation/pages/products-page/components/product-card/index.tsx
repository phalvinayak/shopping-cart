import { Card, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Product } from '@src/application/redux/api/products/products.model';
import style from './product.less';
import Paragraph from 'antd/es/typography/Paragraph';
import { Link } from 'react-router-dom';
import StarRating from '@src/assets/icons/star-rating.svg';

import Icon from '@src/presentation/shared/Icon';
import { AbsoluteCommonRoutes } from '@src/application/models/enums/routes.enum';

type ProductType = {
    product: Product;
};

const ProductCard = ({ product }: ProductType): JSX.Element => {
    const { Text } = Typography;
    return (
        <Link
            to={AbsoluteCommonRoutes.ProductDetail.replace(
                ':productId',
                product.id.toString()
            )}
        >
            <Card
                hoverable
                className={style.productCard}
                cover={
                    <img
                        alt={product.title}
                        src={product.thumbnail}
                        className={style.image}
                    />
                }
            >
                <span className={style.rating}>
                    <span className={style.number}>{product.rating}</span>
                    <Icon src={StarRating} className={style.ratingIcon} />
                </span>
                <Meta
                    title={product.title}
                    description={
                        <Paragraph ellipsis={{ rows: 2, symbol: '...' }}>
                            {product.description}
                        </Paragraph>
                    }
                />
                <div className={style.price}>
                    <span>
                        By: <Text strong>{product.brand}</Text>
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
