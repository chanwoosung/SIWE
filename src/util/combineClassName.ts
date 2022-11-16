export function combineClassNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(' ');
}
