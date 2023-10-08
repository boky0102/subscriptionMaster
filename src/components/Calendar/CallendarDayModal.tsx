import './CallendarDayModal.css';

type CalendarDayModalProps = {
     isOpen: boolean;
     handleModalClose: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export default function CalendarDayModal(props: CalendarDayModalProps) {
     if (props.isOpen) {
          return (
               <>
                    <div className="calendar-modal-container" onClick={props.handleModalClose}></div>
                    <div className="calendar-modal-content"></div>
               </>
          );
     } else {
          return null;
     }
}
