import { Carousel, Image } from 'antd';
import BannerImg01 from '@src/assets/banner/banner-01.jpg';
import BannerImg02 from '@src/assets/banner/banner-02.jpg';
import BannerImg03 from '@src/assets/banner/banner-03.jpg';

type XCarouselProps = {
    className?: string;
};

function XCarousel({ className }: XCarouselProps): JSX.Element {
    return (
        <Carousel autoplay className={className}>
            <div>
                <Image
                    src={BannerImg01}
                    alt="Shopoing cart Banner Image 1"
                    preview={false}
                    height={350}
                    width="100%"
                />
            </div>
            <div>
                <Image
                    src={BannerImg02}
                    alt="Shopoing cart Banner Image 2"
                    preview={false}
                    height={350}
                    width="100%"
                />
            </div>
            <div>
                <Image
                    src={BannerImg03}
                    alt="Shopoing cart Banner Image 1"
                    preview={false}
                    height={350}
                    width="100%"
                />
            </div>
        </Carousel>
    );
}

export default XCarousel;
