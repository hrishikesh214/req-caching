import { CACHE_TYPE, CACHE_BUNCH, CACHE_OPTS, CACHE_DRIVER } from "./defined";
/**
 * Class Cache is heart of the library.
 */
export default class Cache {
    bunch: CACHE_BUNCH;
    driver: CACHE_DRIVER;
    constructor(stype?: CACHE_TYPE);
    /**
     * @param {string} key
     * @param {()=>any} seed
     * @param {CACHE_OPTS} options
     * @returns {void}
     */
    add(key: string, seed: () => any, options: CACHE_OPTS): Promise<void>;
    ver(): any;
    /**
     * @param {string} key
     * @return {any} value
     */
    get(key: string): Promise<any>;
    /**
     * @return {bool} value
     */
    cleanAll(): Promise<boolean>;
}
//# sourceMappingURL=index.d.ts.map