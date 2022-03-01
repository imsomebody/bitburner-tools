export const tprint = (ns, text) => ns.tprint(text);

export const terror = (ns, error) =>
  tprint(ns, `Can't continue -> ${error}`);
