import { CardItem } from '@components/content/card-item/card-item.tsx';
import { Col, Row, Typography } from 'antd';
import styles from './main-content.module.css';
import { itemsCards } from '@components/content/card-item/data/items.tsx';

export const MainContent = () => {
    const cardsList = itemsCards.map((card) => (
        <Col key={card.id} md={8} xs={24}>
            <CardItem Icon={card.icon} title={card.title} text={card.text} />
        </Col>
    ));

    return (
        <div className={styles.mainContentContainer}>
            <Typography.Paragraph
                type='secondary'
                className={styles.textTarget}
                style={{
                    marginBottom: '24px',
                }}
            >
                С CleverFit ты сможешь:
                <br /> — планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;
                <br /> — отслеживать свои достижения в разделе статистики, сравнивая свои результаты
                с нормами и рекордами;
                <br /> — создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о
                тренировках;
                <br /> — выполнять расписанные тренировки для разных частей тела, следуя подробным
                инструкциям и советам профессиональных тренеров.
            </Typography.Paragraph>

            <Typography.Paragraph
                className={styles.description}
                style={{
                    marginBottom: '16px',
                }}
            >
                CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не
                откладывай на завтра — начни тренироваться уже сегодня!
            </Typography.Paragraph>
            <Row gutter={[16, 8]}>{cardsList}</Row>
        </div>
    );
};
