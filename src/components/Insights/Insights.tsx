import { Subscription } from '../MySubscriptions/Mysubscriptions';
import SelectBar from '../SelectBar/SelectBar';
import ChartsView from './Charts/chartsView';
import Table from './Table/Table';
import './insights.css';
import { useState } from 'react';

type InsightsProps = {
     subscriptionsData: Subscription[];
};

export default function Insights(props: InsightsProps) {
     const [currentSelect, setCurrentSelect] = useState('Table');
     function handleElementClick(event: React.MouseEvent<HTMLDivElement>) {
          setCurrentSelect(event.currentTarget.id);
     }
     return (
          <div className="select-insight-container">
               <SelectBar
                    filterElements={['Charts', 'Table', 'Fun facts']}
                    handleElementClick={handleElementClick}
                    filterState={currentSelect}
               ></SelectBar>

               {currentSelect === 'Charts' && <ChartsView></ChartsView>}
               {currentSelect === 'Table' && <Table subscriptionData={props.subscriptionsData}></Table>}
          </div>
     );
}
