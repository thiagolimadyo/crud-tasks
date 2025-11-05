export default function dateFormat(data) {
  const formater = new Intl.DateTimeFormat("pt-BR");
  return formater.format(data);
}
