import { CardItem } from './card-item/card-item.tsx';
import { Col, Row, Typography } from 'antd';
import styles from './main-content.module.css';
import { itemsCards } from './card-item/data/items.tsx';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { getTrainings } from '@redux/slices';
import { PageName } from '@common-types/routes';

export const MainContent = () => {
    const dispatch = useAppDispatch();

    const pageTurnHandler = (type: string) => {
        if (type === PageName.CALENDAR) dispatch(getTrainings());
    };

    const cardsList = itemsCards.map((card) => (
        <Col key={card.id} md={8} sm={24} xs={24}>
            <CardItem
                Icon={card.icon}
                title={card.title}
                text={card.text}
                dataTestId={card.dataTestId}
                toPath={card.toPath}
                onclick={() => pageTurnHandler(card.text)}
            />
        </Col>
    ));

    return (
        <div className={styles.mainContentContainer}>
            <Typography.Paragraph className={styles.textTarget}>
                С CleverFit ты сможешь:
                <br /> — планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;
                <br /> — отслеживать свои достижения в разделе статистики, сравнивая свои результаты
                с нормами и рекордами;
                <br /> — создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы о
                тренировках;
                <br /> — выполнять расписанные тренировки для разных частей тела, следуя подробным
                инструкциям и советам профессиональных тренеров.
            </Typography.Paragraph>

            <Typography.Paragraph className={styles.description}>
                CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не
                откладывай на завтра — начни тренироваться уже сегодня!
            </Typography.Paragraph>
            <Row gutter={[16, 8]}>{cardsList}</Row>
        </div>
    );
};
