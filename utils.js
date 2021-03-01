const debounce = (func, delay = 1000) => {
  let timeoutId;

  // ...arg are arguments of func
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
      // => func(...args)
      // In this case, 'event' is only parameter
    }, delay);
  };
};
