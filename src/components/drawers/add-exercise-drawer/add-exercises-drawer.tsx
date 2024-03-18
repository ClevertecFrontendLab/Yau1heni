import { Badge, Button, Drawer, Row, Typography } from 'antd';
import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { ColorBadge, DateFormat } from '@common-types/training';
import { trainingActions, trainingSelectors } from '@redux/slices';
import { formatDate } from '@utils/format-date';
import { AddExercisesFormList } from './add-exercises-form-list/add-exercises-form-list.tsx';
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint';

export const AddExercisesDrawer = () => {
    const dispatch = useAppDispatch();

    const { xs } = useBreakpoint();
    const selectedTraining = useAppSelector(trainingSelectors.selectedTraining);
    const isOpen = useAppSelector(trainingSelectors.isDrawerAddExercisesOpen);
    const isEdited = useAppSelector(trainingSelectors.isEditedExercise);

    const date = useAppSelector(trainingSelectors.date);
    const formatedDate = formatDate({ date, format: DateFormat.EURO_DATE });

    const onClose = () => {
        dispatch(trainingActions.setIsDrawerAddExercisesOpen({ isOpen: false }));
    };

    return (
        <Drawer
            mask={false}
            width={xs ? '100%' : 408}
            title={isEdited ? 'Редактирование' : 'Добавление упражнений'}
            placement='right'
            closeIcon={isEdited ? <EditOutlined /> : <PlusOutlined />}
            open={isOpen}
            extra={
                <Button
                    onClick={onClose}
                    data-test-id='modal-drawer-right-button-close'
                    icon={<CloseOutlined />}
                />
            }
            data-test-id='modal-drawer-right'
        >
            <Row justify={'space-between'}>
                <Badge
                    text={<Typography.Text type={'secondary'}>{selectedTraining}</Typography.Text>}
                    color={ColorBadge[selectedTraining as keyof typeof ColorBadge]}
                />
                <Typography.Text type={'secondary'}>{formatedDate}</Typography.Text>
            </Row>

            <div style={{ marginTop: '24px' }}>
                <AddExercisesFormList />
            </div>
        </Drawer>
    );
};
