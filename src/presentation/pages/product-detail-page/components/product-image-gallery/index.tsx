import { Product } from '@src/application/redux/api/products/products.model';
import { Image } from 'antd';
import cn from 'classnames';
import { useState } from 'react';
import styles from './product-image-gallery.less';

type ProductGalleryProps = {
    product: Product;
    className?: string;
};

function ProductImageGallery({
    product,
    className,
}: ProductGalleryProps): JSX.Element {
    const [imgIndex, setImgIndex] = useState<number>(0);
    return (
        <div className={cn(styles.gallery, className)}>
            <div className={styles.productImgfulliew}>
                <Image.PreviewGroup items={product.images}>
                    <Image src={product.images[imgIndex]} />
                </Image.PreviewGroup>
            </div>
            <div className={styles.productImgPreview}>
                {product.images.map((img: string, index: number) => (
                    <Image
                        rootClassName={cn(index === imgIndex ? 'selected' : '')}
                        key={img}
                        src={img}
                        alt={product.title}
                        preview={false}
                        className={styles.imgThumbnail}
                        onClick={() => setImgIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductImageGallery;
