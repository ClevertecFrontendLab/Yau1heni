import { FC } from 'react';
import { Period } from '@common-types/profile';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks.ts';
import { profileActions } from '@redux/slices';
import { List, Radio, RadioChangeEvent } from 'antd';

export const TariffListItem: FC<Props> = ({ periods, id }) => {
    const dispatch = useAppDispatch();

    const onChange = (e: RadioChangeEvent) => {
        const payload = { days: e.target.value, tariffId: id };

        dispatch(profileActions.setPayTariffData({ tariffData: payload }));
    };

    return (
        <List
            dataSource={periods}
            renderItem={({ days, cost, text }) => (
                <List.Item data-test-id='tariff-cost'>
                    <div>{text}</div>
                    <div>{`${cost.toString().replace('.', ',')} $`}</div>
                    <Radio data-test-id={`tariff-${cost}`} onChange={onChange} value={days} />
                </List.Item>
            )}
        />
    );
};

type Props = {
    periods: Period[];
    id: string;
};
