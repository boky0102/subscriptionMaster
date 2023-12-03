type AddIconProps = {
     className: string;
};

export default function AddIcon(props: AddIconProps) {
     return (
          <svg
               width="666.66669"
               height="666.66669"
               viewBox="0 0 20.000001 20.000001"
               fill="none"
               version="1.1"
               id="svg1"
               className={props.className}
               xmlns="http://www.w3.org/2000/svg"
          >
               <defs id="defs1" />
               <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M 10,20 C 15.523,20 20,15.523 20,10 20,4.477 15.523,0 10,0 4.477,0 0,4.477 0,10 0,15.523 4.477,20 10,20 Z M 4.5,11 a 1,1 0 1 1 0,-2 H 9 V 4.5 a 1,1 0 1 1 2,0 V 9 h 4.5 a 1,1 0 1 1 0,2 H 11 v 4.5 a 1,1 0 1 1 -2,0 V 11 Z"
                    fill="currentColor"
                    id="path1"
               />
          </svg>
     );
}
