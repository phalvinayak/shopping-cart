import Icon from '@src/presentation/shared/Icon/Icon';
import { AbsoluteCommonRoutes } from '@src/application/models/enums/routes.enum';
import LogoIcon from '@src/assets/icons/logo.svg';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import styles from '../XHeader.less';

const Logo = memo(() => {
    return (
        <Link to={AbsoluteCommonRoutes.BaseUrl} className={styles.logoIcon}>
            <Icon src={LogoIcon} />
            <span className={styles.logo}>My Cart</span>
        </Link>
    );
});

export default Logo;
