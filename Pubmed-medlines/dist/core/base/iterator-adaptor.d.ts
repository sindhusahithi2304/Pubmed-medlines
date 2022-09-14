export declare class IteratorAdaptor<T, B> implements IterableIterator<T> {
    private base;
    private adaptor;
    readonly return?: (value?: any) => IteratorResult<T>;
    readonly throw?: (error?: any) => IteratorResult<T>;
    constructor(base: Iterator<B>, adaptor: (b: B) => T);
    static forIterable<B, T>(iterable: Iterable<B>, adaptor: (b: B) => T): IterableIterator<T>;
    private translate;
    next(value?: any): IteratorResult<T, any>;
    [Symbol.iterator](): IterableIterator<T>;
}
//# sourceMappingURL=iterator-adaptor.d.ts.map