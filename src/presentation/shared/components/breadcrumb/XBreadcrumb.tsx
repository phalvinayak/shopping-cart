import { Breadcrumb } from 'antd';
import styles from './XBreadcrumb.less';
import { RightOutlined } from '@ant-design/icons';
import useBreadcrumb from '@src/presentation/shared/hooks/useBreadcrumb';

function XBreadcrumb(): JSX.Element {
    const { breadcrumbs } = useBreadcrumb();
    return (
        <Breadcrumb
            className={styles.breadCrumb}
            items={breadcrumbs}
            separator={<RightOutlined />}
        />
    );
}

export default XBreadcrumb;
