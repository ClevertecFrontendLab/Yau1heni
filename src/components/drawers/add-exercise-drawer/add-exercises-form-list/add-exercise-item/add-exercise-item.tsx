import { FC } from 'react';
import { Checkbox, Col, Form, FormListFieldData, Input, InputNumber, Row, Space } from 'antd';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';

export const AddExerciseItem: FC<Props> = ({ field }) => (
    <>
        <Row justify={'space-between'}>
            <Form.Item {...field} name={[field.name, 'name']}>
                <Input
                    data-test-id={`modal-drawer-right-input-exercise${field.name}`}
                    placeholder={'Упражнение'}
                />
            </Form.Item>
            <Form.Item {...field} valuePropName='checked' name={[field.name, 'checked']}>
                <Checkbox data-test-id={`modal-drawer-right-checkbox-exercise${field.name}`} />
            </Form.Item>
        </Row>

        <Space.Compact block>
            <Col>
                <div>Подходы, раз</div>
                <Form.Item
                    {...field}
                    name={[field.name, 'replays']}
                    data-test-id={`modal-drawer-right-input-quantity${field.name}`}
                >
                    <InputNumber controls={false} addonBefore={<PlusOutlined />} />
                </Form.Item>
            </Col>
            <Col>
                <div>Вес, кг</div>
                <Form.Item
                    {...field}
                    name={[field.name, 'weight']}
                    data-test-id={`modal-drawer-right-input-weight${field.name}`}
                >
                    <InputNumber controls={false} addonAfter={<CloseOutlined />} />
                </Form.Item>
            </Col>
            <Col>
                <div>Количество</div>
                <Form.Item
                    {...field}
                    name={[field.name, 'approaches']}
                    data-test-id={`modal-drawer-right-input-approach${field.name}`}
                >
                    <InputNumber controls={false} />
                </Form.Item>
            </Col>
        </Space.Compact>
    </>
);

type Props = {
    field: FormListFieldData;
};
