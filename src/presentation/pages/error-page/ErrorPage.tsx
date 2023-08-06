import { AlertFilled, HeartTwoTone } from '@ant-design/icons';
import styles from '@src/App.less';
import { PageName } from '@src/application/models/enums/pageName.enum';
import { AbsoluteCommonRoutes } from '@src/application/models/enums/routes.enum';
import XBreadcrumb from '@src/presentation/shared/components/breadcrumb/XBreadcrumb';
import XHeader from '@src/presentation/shared/components/header/XHeader';
import useBreadcrumb from '@src/presentation/shared/hooks/useBreadcrumb';
import { Layout } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import { useEffect } from 'react';

const ErrorPage = () => {
    const { setPageBreadcrumb } = useBreadcrumb();

    useEffect(() => {
        setPageBreadcrumb([
            { title: PageName.Home, href: AbsoluteCommonRoutes.BaseUrl },
            { title: PageName.Error },
        ]);
    }, [setPageBreadcrumb]);

    return (
        <Layout>
            <XHeader />
            <Content className={styles.container}>
                <XBreadcrumb />
                <Layout className={styles.layout}>
                    <Content>
                        <div className={styles.wrapper}>
                            <AlertFilled className={styles.icon} />
                            <Title level={3}>Oops something went wrong!</Title>
                            <p>Please start over from home page</p>
                        </div>
                    </Content>
                </Layout>
            </Content>
            <Footer className={styles.footer}>
                Shopping Cart ©{new Date().getFullYear()} | Made with{' '}
                <HeartTwoTone twoToneColor="#eb2f96" /> by @phalvinayak
            </Footer>
        </Layout>
    );
};

export default ErrorPage;
