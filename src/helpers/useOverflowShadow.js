import { useState } from "react";

export function useOverflowShadow() {
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  const onScrollHandler = (event) => {
    setScrollTop(event.target.scrollTop);
    setScrollHeight(event.target.scrollHeight);
    setClientHeight(event.target.clientHeight);
  };


  function getBoxShadow() {
        const isBottom = clientHeight === scrollHeight - scrollTop;
        const isTop = scrollTop === 0;
        const isBetween = scrollTop > 0 && clientHeight < scrollHeight - scrollTop;
    
        let boxShadow = "none";
        const top = "inset 0 8px 15px -5px rgb(150 150 150 / 0.5)";
        const bottom = "inset 0 -8px 15px -5px rgb(150 150 150 / 0.5)";

        if (isTop) {
        boxShadow = bottom;
        } else if (isBetween) {
        boxShadow = `${top}, ${bottom}`;
        } else if (isBottom) {
        boxShadow = top;
        }
        return boxShadow;
    }   

  return { boxShadow: getBoxShadow(), onScrollHandler };
}