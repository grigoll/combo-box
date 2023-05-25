export const debounce = (callback: (...args: unknown[]) => unknown, ms: number) => {
  let interval: number | undefined;

  return (...args: unknown[]) => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      interval = undefined;
      callback(...args);
    }, ms);
  };
};
