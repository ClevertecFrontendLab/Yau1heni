import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks.ts';
import { Button, Form, Row } from 'antd';
import { useEffect, useState } from 'react';
import {
    exercisesTrainingSelector,
    isDrawerAddExercisesOpenSelector,
    selectedTrainingSelector,
} from '@redux/selectors';
import { trainingActions } from '@redux/slices';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { AddExerciseItem } from './add-exercise-item/add-exercise-item.tsx';
import { emptyExercises } from '@constants/data/empty-exercise.ts';
import { Exercise } from '@common-types/training';

export const AddExercisesFormList = () => {
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();

    const [checked, setChecked] = useState<number[]>([]);

    const selectedTraining = useAppSelector(selectedTrainingSelector);
    const exercises = useAppSelector(exercisesTrainingSelector);
    const isOpen = useAppSelector(isDrawerAddExercisesOpenSelector);

    useEffect(() => {
        form.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    const formInitialValues =
        exercises && Object.keys(exercises)[0] === 'empty'
            ? [emptyExercises]
            : exercises[selectedTraining];

    const handleFormValuesChange = (_: void, allValues: FormListFieldData) => {
        const checkedIndexes = allValues.items.flatMap((el, index) => (el.checked ? index : []));
        setChecked(checkedIndexes);

        const exercisesWithoutCheckedField = allValues.items.map((exercise) => {
            delete exercise.checked;
            return exercise;
        });

        dispatch(
            trainingActions.setExercises({
                trainingType: selectedTraining,
                exercises: exercisesWithoutCheckedField as Exercise[],
            }),
        );
    };

    return (
        <Form
            form={form}
            onValuesChange={handleFormValuesChange}
            initialValues={{
                items: formInitialValues?.map((item) => ({
                    ...item,
                    checked: false,
                })),
            }}
        >
            <Form.List name='items'>
                {(fields, { add, remove }) => (
                    <>
                        {fields?.map((field) => (
                            <AddExerciseItem field={field} key={field.key} />
                        ))}
                        <Row style={{ marginTop: '24px' }}>
                            <Form.Item>
                                <Button
                                    onClick={() => add(emptyExercises)}
                                    icon={<PlusOutlined />}
                                    type={'link'}
                                >
                                    Добавить ещё
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    onClick={() => remove(checked)}
                                    icon={<CloseOutlined />}
                                    disabled={checked?.length === 0}
                                    type={'text'}
                                >
                                    Удалить
                                </Button>
                            </Form.Item>
                        </Row>
                    </>
                )}
            </Form.List>
        </Form>
    );
};

type FormListFieldData = {
    items: Exercise & { checked?: boolean }[];
};
