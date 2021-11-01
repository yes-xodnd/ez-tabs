import { getHostname, once } from '.';


describe('Hostname', () => {
  
  test('get hostname from url', () => {
    const url = 'https://www.some-random-site.com/search?keyword=omg&date=20211101';
    expect(getHostname(url)).toBe('www.some-random-site.com');
  });
});

describe('Once', () => {
  
  test('only called once', () => {
    const fn = jest.fn();
    const fnOnce = once(fn);
    
    fnOnce();
    fnOnce();
    fnOnce();

    expect(fn).toBeCalledTimes(1);
  });
});
