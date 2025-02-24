export const dateToString = (d: Date) => `${d.toLocaleDateString('fr-CA')} ${d.toLocaleTimeString('fr-CH')}`;
export const devNull = (..._: any[]): void => undefined;
export const getTimestamp = (): string => `[${dateToString(new Date())}]`;