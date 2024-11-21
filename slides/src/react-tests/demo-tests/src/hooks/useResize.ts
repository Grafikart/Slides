import {useEffect, useRef} from "react";

/**
 * Call the callback when window is resized
 */
export function useResize (cb: (args: {width: number, height: number}) => void) {
  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      cb({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [cb]); // Re-run if callback changes
}
