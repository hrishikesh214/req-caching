import { CACHE_TYPE, CACHE_BUNCH, CACHE_OPTS } from "./defined";
/**
 * Class Cache is heart of the library.
 */
export default class Cache {
    bunch: CACHE_BUNCH;
    driver: any;
    constructor(stype?: CACHE_TYPE);
    /**
     * @param {string} key
     * @param {()=>any} seed
     * @param {CACHE_OPTS} options
     * @returns {void}
     */
    add(key: string, seed: () => any, options: CACHE_OPTS): Promise<void>;
    /**
     * @param {string} key
     * @return {any} value
     */
    get(key: string): Promise<any>;
}
//# sourceMappingURL=index.d.ts.map