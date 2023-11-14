type AddIconProps = {
     className: string;
};

export default function AddIcon(props: AddIconProps) {
     return (
          <svg
               width="800px"
               height="800px"
               viewBox="0 0 24 24"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
               className={props.className}
          >
               <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-5.5-9a1 1 0 1 1 0-2H11V6.5a1 1 0 1 1 2 0V11h4.5a1 1 0 1 1 0 2H13v4.5a1 1 0 1 1-2 0V13H6.5z"
                    fill="currentColor"
               />
          </svg>
     );
}