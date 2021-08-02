export declare type CACHE_TYPE = "memory" | "cookie" | "localstorage";
export interface CACHE_OPTS {
    maxAge?: {
        seconds?: number;
        minutes?: number;
        hours?: number;
    };
    strict?: boolean;
    encrypt?: boolean;
}
export interface CACHE_VALUE {
    value: any | null;
    expires: number;
}
export interface CACHE_ELEMENT {
    key: string;
    value: CACHE_VALUE | null;
    seed: () => any;
    options?: CACHE_OPTS;
}
export interface CACHE_BUNCH extends Array<CACHE_ELEMENT> {
}
export interface CACHE_DRIVER {
    save: () => Promise<any>;
    get: () => Promise<any>;
}
export declare const after_time: any;
//# sourceMappingURL=defined.d.ts.map