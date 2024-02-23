import { useState, useEffect } from "react";

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleMediaQueryChange = (event) => {
      setMatches(event.matches);
    };

    mediaQuery.addListener(handleMediaQueryChange);
    setMatches(mediaQuery.matches);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, [query]);

  return matches;
};