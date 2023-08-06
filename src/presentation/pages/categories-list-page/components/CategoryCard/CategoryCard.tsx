import { capitalize } from '@src/presentation/shared/utils/string.utils';
import { Card } from 'antd';
import styles from './CategoryCard.less';
import { Link } from 'react-router-dom';
import { AbsoluteCommonRoutes } from '@src/application/models/enums/routes.enum';

type CategoryCardProps = {
    category: string;
};

function CategoryCard({ category }: CategoryCardProps): JSX.Element {
    const capitalizedCategory = capitalize(category);
    return (
        <Link
            to={AbsoluteCommonRoutes.CategoryList.replace(
                ':category',
                category
            )}
        >
            <Card title={capitalizedCategory} className={styles.container}>
                <p>Browse products for catgory {capitalizedCategory}</p>
            </Card>
        </Link>
    );
}

export default CategoryCard;
