export type OnChange<T, K = void> = (value: T) => K;

export interface LabelValue<T> {
  label: string;
  value: T;
}
