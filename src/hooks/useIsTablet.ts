import * as React from "react";

const TABLET_MIN_WIDTH = 768;
const TABLET_MAX_WIDTH = 1024;

export const useIsTablet = () => {
  const [isTablet, setIsTablet] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const check = () => {
      const width = window.innerWidth;
      setIsTablet(width >= TABLET_MIN_WIDTH && width <= TABLET_MAX_WIDTH);
    };

    check();
    window.addEventListener("resize", check);

    return () => {
      window.removeEventListener("resize", check);
    };
  }, []);

  return isTablet;
};

