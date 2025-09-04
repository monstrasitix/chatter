import { useEffect, useState } from "react";
import { debounce } from "@/utils/function";

export function useScreenWidth() {
  const [width, setWidth] = useState(innerWidth);

  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      setWidth(innerWidth);
    }, 100);

    addEventListener("resize", debouncedHandleResize);

    return () => {
      removeEventListener("resize", debouncedHandleResize);
    };
  });

  return width;
}
