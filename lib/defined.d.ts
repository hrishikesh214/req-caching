export declare type _Cache_type = "memory" | "cookie" | "localstorage";
export interface _Cache_opts {
    maxAge?: number;
    strict?: boolean;
}
export interface _Cache_value {
    value: any;
    expires: number;
}
export interface _Cache_ele {
    key: string;
    seed: () => any;
    options?: _Cache_opts;
}
export interface _Cache_bunch extends Array<_Cache_ele> {
}
//# sourceMappingURL=defined.d.ts.map