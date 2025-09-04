export function debounce(fn: Function, milliseconds: number) {
  let timer: number | undefined;

  return (...args: any) => {
    clearTimeout(timer);

    timer = setTimeout((_) => {
      timer = undefined;
      fn(...args);
    }, milliseconds);
  };
}
