import { transformToNormalCase } from '../../../utility/string.utility';
import { Subscription } from '../../MySubscriptions/Mysubscriptions';

type TableProps = {
     subscriptionData: Subscription[];
};

export default function Table(props: TableProps) {
     return (
          <table>
               {(Object.keys(props.subscriptionData[0]) as Array<string>).map((key) => {
                    if (key !== 'id') {
                         return <th>{transformToNormalCase(key)}</th>;
                    }
               })}
          </table>
     );
}
