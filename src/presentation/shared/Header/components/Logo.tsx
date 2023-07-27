import Icon from '@shared/Icon';
import LogoIcon from 'assets/icons/logo.svg';
import { memo } from 'react';

const Logo = memo(() => {
    return <Icon src={LogoIcon} />;
});

export default Logo;
