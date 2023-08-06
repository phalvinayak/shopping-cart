import { ShoppingTwoTone, GiftTwoTone } from '@ant-design/icons';
import { SEARCH_QUERY_PARAM } from '@src/application/models/constants/common.constants';
import { AbsoluteCommonRoutes } from '@src/application/models/enums/routes.enum';
import Logo from '@src/presentation/shared/components/header/components/Logo';
import useCart from '@src/presentation/shared/hooks/useCart';
import { Badge, InputRef } from 'antd';
import Search from 'antd/es/input/Search';
import { Header } from 'antd/es/layout/layout';
import { RefObject, useCallback, useRef } from 'react';
import { Link, createSearchParams, useNavigate } from 'react-router-dom';
import styles from './XHeader.less';
import useWishlist from '@src/presentation/shared/hooks/useWishlist';

const XHeader = () => {
    const { totalCartProduct } = useCart();
    const { wishlistCount: favoriteCount } = useWishlist();
    const navigate = useNavigate();
    const searchRef: RefObject<InputRef> = useRef<InputRef>(null);

    const handleSearch = useCallback(() => {
        if (searchRef?.current) {
            const searchTerm = searchRef.current.input?.value;
            if (searchTerm && searchTerm.length > 0) {
                navigate({
                    pathname: AbsoluteCommonRoutes.Search,
                    search: createSearchParams({
                        [SEARCH_QUERY_PARAM]: searchTerm,
                    }).toString(),
                });
            }
        }
    }, [navigate, searchRef]);
    return (
        <Header className={styles.header}>
            <div className={styles.container}>
                <Logo />
                <div className={styles.search}>
                    <Search
                        placeholder="Search Products"
                        allowClear
                        enterButton="Search"
                        size="large"
                        onSearch={handleSearch}
                        ref={searchRef}
                    />
                </div>
                <div className={styles.quickActions}>
                    <Link to={AbsoluteCommonRoutes.Wishlist}>
                        <Badge count={favoriteCount} className={styles.badge}>
                            <GiftTwoTone className={styles.icon} />
                        </Badge>
                    </Link>
                    <Link to={AbsoluteCommonRoutes.Cart}>
                        <Badge
                            count={totalCartProduct}
                            className={styles.badge}
                        >
                            <ShoppingTwoTone className={styles.icon} />
                        </Badge>
                    </Link>
                </div>
            </div>
        </Header>
    );
};

export default XHeader;
