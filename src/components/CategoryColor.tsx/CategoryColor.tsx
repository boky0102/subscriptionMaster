import './CategoryColor.css';

type subscriptionCategories =
     | 'Streaming'
     | 'Gaming'
     | 'Clothing'
     | 'Food'
     | 'Utility'
     | 'Education'
     | 'Software'
     | 'Other';

type CategoryColorProps = {
     name: subscriptionCategories;
     color: string;
};

export function CategoryColor(props: CategoryColorProps) {
     return (
          <div className="color-container">
               <span className="color-name">{props.name}</span>
               <div className="color" style={{ backgroundColor: props.color }}></div>
          </div>
     );
}
