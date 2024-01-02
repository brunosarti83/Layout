import { flushSync } from "react-dom";

export const viewTransitionWrapper = (CB) => {
    if (document.startViewTransition) {
        document.startViewTransition(() => {
          flushSync(CB)
        })
      } else {
        CB();
      }
} 