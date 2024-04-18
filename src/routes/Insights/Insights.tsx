import { Subscription } from '../../components/MySubscriptions/Mysubscriptions';
import SelectBar from '../../components/SelectBar/SelectBar';
import ChartsView from './Charts/chartsView';
import Table from './Table/Table';
import './insights.css';
import { useState } from 'react';
import { UserColorData } from '../../types';

type InsightsProps = {
     subscriptionsData: Subscription[];
     userColorData: UserColorData;
};

export default function Insights(props: InsightsProps) {
     const [currentSelect, setCurrentSelect] = useState('Charts');
     function handleElementClick(event: React.MouseEvent<HTMLDivElement>) {
          setCurrentSelect(event.currentTarget.id);
     }
     return (
          <div className="select-insight-container">
               <SelectBar
                    filterElements={['Table', 'Charts', 'Annual report']}
                    handleElementClick={handleElementClick}
                    filterState={currentSelect}
               ></SelectBar>

               {currentSelect === 'Charts' && (
                    <ChartsView
                         subscriptionData={props.subscriptionsData}
                         userColors={props.userColorData}
                    ></ChartsView>
               )}
               {currentSelect === 'Table' && <Table subscriptionData={props.subscriptionsData}></Table>}
          </div>
     );
}
