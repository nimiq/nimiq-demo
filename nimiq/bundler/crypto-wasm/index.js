import * as wasm from "./index_bg.wasm";
import { __wbg_set_wasm } from "./index_bg.js";

__wbg_set_wasm(wasm);
wasm.__wbindgen_start();
export {
    CryptoUtils
} from "./index_bg.js";
