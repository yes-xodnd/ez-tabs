export const getHostname = (url: string) => {
  return new URL(url).hostname;
};

export const once = <T extends (...args: any) => any>(fn: T) => {
  let flag = false;
  
  return (...args: Parameters<T>): ReturnType<T> | void => {
    if (flag) return;
    
    flag = true;    
    return fn(...args);
  };
};