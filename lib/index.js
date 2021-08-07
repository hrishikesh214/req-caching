var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import driver from "./driver.js";
/**
 * Class Cache is heart of the library.
 */
var Cache = /** @class */ (function () {
    function Cache(stype) {
        if (stype === void 0) { stype = "localstorage"; }
        this.bunch = []; // lets bunch be an empty array
        this.driver = driver[stype]; // lets driver be a string
    }
    /**
     * @param {string} key
     * @param {()=>any} seed
     * @param {CACHE_OPTS} options
     * @returns {void}
     */
    Cache.prototype.add = function (key, seed, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                options = {
                    maxAge: (options === null || options === void 0 ? void 0 : options.maxAge) || { seconds: 60 },
                    strict: (options === null || options === void 0 ? void 0 : options.strict) || false,
                    encrypt: (options === null || options === void 0 ? void 0 : options.encrypt) || false,
                };
                this.bunch.push({
                    key: key,
                    value: null,
                    seed: seed,
                    options: options,
                });
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param {string} key
     * @return {any} value
     */
    Cache.prototype.get = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var temp, indexer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.driver.get(key)];
                    case 1:
                        temp = _a.sent();
                        if (!(temp === null)) return [3 /*break*/, 6];
                        indexer = this.bunch.find(function (item) { return item.key === key; });
                        if (indexer === undefined) {
                            return [2 /*return*/, new Error("NO CACHE FOUND")];
                        }
                        if (!(indexer.seed.constructor.name === "AsyncFunction")) return [3 /*break*/, 3];
                        return [4 /*yield*/, indexer.seed()];
                    case 2:
                        temp = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        temp = indexer.seed();
                        _a.label = 4;
                    case 4: return [4 /*yield*/, this.driver.save(key, temp, indexer.options)];
                    case 5:
                        if (!(_a.sent())) {
                            return [2 /*return*/, new Error("CACHE_SAVE FAILED")];
                        }
                        _a.label = 6;
                    case 6: return [2 /*return*/, temp];
                }
            });
        });
    };
    /**
     * @return {bool} value
     */
    Cache.prototype.cleanAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                try {
                    this.bunch.forEach(function (c) {
                        _this.driver.clean(c.key);
                    });
                    return [2 /*return*/, true];
                }
                catch (error) { }
                return [2 /*return*/, false];
            });
        });
    };
    return Cache;
}());
export default Cache;
//# sourceMappingURL=index.js.map