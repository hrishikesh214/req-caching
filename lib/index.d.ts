import { _Cache_bunch, _Cache_opts } from "./defined";
/**
 * Class Cache is heart of the library.
 */
export default class Cache {
    bunch: _Cache_bunch;
    constructor();
    add(key: string, seed: () => any, options: _Cache_opts): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map