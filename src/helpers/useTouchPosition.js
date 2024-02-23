import { useEffect, useState } from "react";

export const useTouchPosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const setFromEvent = (e) => {
      setPosition({ x: e.touches[0].pageX, y: e.touches[0].pageY });
    }
    
    window.addEventListener("touchstart", setFromEvent);

    return () => {
      window.removeEventListener("touchmove", setFromEvent);
    };
  }, []);

  return position;
};