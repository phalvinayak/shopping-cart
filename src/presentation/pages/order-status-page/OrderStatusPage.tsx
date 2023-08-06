import Title from 'antd/es/typography/Title';
import styles from './OrderStatusPage.less';
import { Divider } from 'antd';
import { LikeFilled } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';
import useBreadcrumb from '@src/presentation/shared/hooks/useBreadcrumb';
import { useEffect } from 'react';
import { PageName } from '@src/application/models/enums/pageName.enum';
import { AbsoluteCommonRoutes } from '@src/application/models/enums/routes.enum';

type OrderStatusState = {
    orderId?: number;
};

function OrderStatusPage(): JSX.Element {
    const locaton = useLocation();
    const state = locaton.state as OrderStatusState;
    const { setPageBreadcrumb } = useBreadcrumb();

    useEffect(() => {
        setPageBreadcrumb([
            { title: PageName.Home, href: AbsoluteCommonRoutes.BaseUrl },
            { title: PageName.Checkout, href: AbsoluteCommonRoutes.Checkout },
            { title: PageName.Wishlist },
        ]);
    }, [setPageBreadcrumb]);

    return (
        <div className={styles.container}>
            <Title>Order Status</Title>
            <Divider />
            <div className={styles.wrapper}>
                <LikeFilled className={cn(styles.icon, styles.success)} />
                <Title level={3}>Thank you for your order!</Title>
                <p>
                    Your order <strong>#{state?.orderId}</strong> has been
                    placed successfully!
                </p>
            </div>
        </div>
    );
}

export default OrderStatusPage;
