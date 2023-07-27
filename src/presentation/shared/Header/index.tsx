import { Header } from 'antd/es/layout/layout';
import styles from './Header.less';

const CHeader = () => {
    return (
        <Header>
            <div className={styles.container}>
                <div className="logo">My Cart</div>
                <div className="search"></div>
                <div className="quickActions"></div>
            </div>
        </Header>
    );
};

export default CHeader;
