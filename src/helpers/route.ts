export const getRoutePath = (path: string) => {
  const parsedPath = path.startsWith('/') ? path.slice(1) : path;

  let startPath = process.env.BASE_ROUTE;
  startPath = startPath.startsWith('/') ? startPath.slice(1) : startPath;
  startPath = startPath.endsWith('/') ? startPath.slice(0, -1) : startPath;

  return `/${startPath}/${parsedPath}`;
};
