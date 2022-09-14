import { ArrayView } from "./array-view";
/**
 * A generic interface describing a name and associated value
 */
export interface NameValuePair<U, V> {
    name: U;
    value: V;
}
/**
 * An {@link ArrayView} of {@link NameValuePair}
 */
export interface NameValueArrayView<U, V> extends ArrayView<NameValuePair<U, V>> {
    getName(index: number): U;
    getValue(index: number): V;
    items(): IterableIterator<NameValuePair<U, V>>;
    names(): IterableIterator<U>;
    values(): IterableIterator<V>;
}
/**
 * A helper class for creating {@link NameValueArrayView} instances
 */
export declare class NameValueArrayViewHelper {
    /**
     * Creates a {@link NameValueArrayView} from an array of {@link NameValuePair} items
     *
     * @param items An array of `NameValuePair` items
     */
    static fromArray<U, V>(items: NameValuePair<U, V>[]): NameValueArrayView<U, V>;
    static fromObjects<T>(items: T[], nameKey: keyof T, valueKey: keyof T): NameValueArrayView<T[keyof T], T[keyof T]>;
    static from<T, U, V>(items: T[], nameSelector: (t: T) => U, valueSelector: (t: T) => V): NameValueArrayView<U, V>;
}
//# sourceMappingURL=item-array-view.d.ts.map