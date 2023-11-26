import { useEffect, useState } from 'react';

type WindowDimensions = {
     width: number;
     height: number;
};

function getWindowSize() {
     const { innerWidth: width, innerHeight: height } = window;
     return {
          width,
          height,
     };
}

export function useWindowDimensions() {
     const [windowDimensions, setWindowDimensions] = useState({} as WindowDimensions);
     useEffect(() => {
          function handleResize() {
               setWindowDimensions(getWindowSize());
          }
          window.addEventListener('resize', handleResize);

          return () => window.removeEventListener('resize', handleResize);
     }, []);

     return windowDimensions;
}
