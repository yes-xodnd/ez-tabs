type F = (...args: any) => any;

export const getHostname = (url: string) => {
  return new URL(url).hostname;
};

export const once = <T extends F>(fn: T) => {
  let flag = false;
  
  return (...args: Parameters<T>): ReturnType<T> | void => {
    if (flag) return;
    
    flag = true;    
    return fn(...args);
  };
};

export const throttle = <T extends F>(callback: T, t: number) => {
  let timer: number | null = null;
  
  return (...args: Parameters<T>): void => {
    if (timer) return;
    
    timer = window.setTimeout(() => { 
      callback(...args); 
      timer = null;
    }, t);
  };
};

export const debounce = <T extends F>(callback: T, t: number = 300) => {
  let timer: number | null = null;

  return (...args: Parameters<T>): void => {
    if (timer) clearTimeout(timer);
    timer = window.setTimeout(() => callback(...args), t);
  }
}