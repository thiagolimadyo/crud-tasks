export default function buildRoutePath(url) {
  const pattern = /:([a-zA-Z0-9_-]+)/;
  const pathWithParams = url.replace(pattern, `(?<id>[a-zA-Z0-9_-]+)`);
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);

  return pathRegex;
}
