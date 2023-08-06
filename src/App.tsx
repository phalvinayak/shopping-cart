import { HeartTwoTone } from '@ant-design/icons';
import XBreadcrumb from '@src/presentation/shared/components/breadcrumb/XBreadcrumb';
import XHeader from '@src/presentation/shared/components/header/XHeader';
import { Layout } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import styles from './App.less';

function App(): JSX.Element {
    return (
        <Layout>
            <XHeader />
            <ScrollRestoration />
            <Content className={styles.container}>
                <XBreadcrumb />
                <Layout className={styles.layout}>
                    <Content>
                        <Outlet />
                    </Content>
                </Layout>
            </Content>
            <Footer className={styles.footer}>
                Shopping Cart ©{new Date().getFullYear()} | Made with{' '}
                <HeartTwoTone twoToneColor="#eb2f96" /> by @phalvinayak
            </Footer>
        </Layout>
    );
}

export default App;
