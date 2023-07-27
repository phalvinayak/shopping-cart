import { Breadcrumb, Button, Layout } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import style from './App.less';
import Header from '@src/presentation/shared/Header';
import { Outlet } from 'react-router-dom';

function App(): JSX.Element {
    return (
        <Layout>
            <Header />
            <Content className={style.container}>
                <Layout className={style.layout}>
                    <Content>
                        <Outlet />
                    </Content>
                </Layout>
            </Content>
            <Footer className={style.footer}>
                Shopping Cart ©2023 Created by @phalvinayak
            </Footer>
        </Layout>
    );
}

export default App;
