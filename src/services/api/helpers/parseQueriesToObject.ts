export const parseQueriesToObject = (url: string) => {
  const re = /([a-z]+)=([^&]+)/gi;
  const founded = url.matchAll(re);

  return Array.from(founded).reduce((prev: { [key: string]: string }, next) => {
    prev[next[1]] = next[2];
    return prev;
  }, {});
};
