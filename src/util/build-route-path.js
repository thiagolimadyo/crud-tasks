export default function buildRoutePath(path) {
  const pattern = /:([a-zA-Z0-9_-]+)/;
  const result = path.replace(pattern, `(?<id>[a-zA-Z0-9_-]+)`);
  const er = new RegExp(`^${result}$`);

  return er;
}
