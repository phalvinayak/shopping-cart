import { memo } from 'react';

type IconProps = {
    className?: string;
    src: string;
    alt?: string;
};

const Icon = ({ className, src, alt, ...rest }: IconProps): JSX.Element => {
    return (
        <img className={className} src={src} alt={!!alt ? alt : ''} {...rest} />
    );
};

export default memo(Icon);
