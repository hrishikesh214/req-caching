import { CACHE_OPTS } from "./defined";
declare const driver: {
    memory: {
        save: (key: string, value: any) => Promise<boolean>;
        get: (key: string) => Promise<string>;
    };
    cookie: {
        save: (key: string, value: any) => Promise<boolean>;
        get: (key: string) => Promise<string>;
    };
    localstorage: {
        save: (key: string, v: any, opts: CACHE_OPTS) => Promise<boolean>;
        get: (key: string) => Promise<any>;
    };
};
export default driver;
//# sourceMappingURL=driver.d.ts.map