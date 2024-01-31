import { Subscription } from '../MySubscriptions/Mysubscriptions';
import SelectBar from '../SelectBar/SelectBar';
import ChartsView from './Charts/chartsView';
import Table from './Table/Table';
import './insights.css';
import { useState } from 'react';

type subscriptionCategories =
     | 'Streaming service'
     | 'Gaming'
     | 'Clothing'
     | 'Food'
     | 'Utility'
     | 'Education'
     | 'Software'
     | 'Other';

type UserColorData = {
     category: subscriptionCategories;
     color: string;
};

type InsightsProps = {
     subscriptionsData: Subscription[];
     userColorData?: UserColorData[];
};

export default function Insights(props: InsightsProps) {
     const [currentSelect, setCurrentSelect] = useState('Table');
     function handleElementClick(event: React.MouseEvent<HTMLDivElement>) {
          setCurrentSelect(event.currentTarget.id);
     }
     return (
          <div className="select-insight-container">
               <SelectBar
                    filterElements={['Charts', 'Table', 'Annual report']}
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
