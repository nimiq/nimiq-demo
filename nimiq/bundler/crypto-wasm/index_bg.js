export class CryptoUtils {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CryptoUtilsFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_cryptoutils_free(ptr, 0);
    }
    /**
     * Encrypts a message with an [OTP] [KDF] and the given parameters.
     * The KDF uses Argon2d for hashing.
     *
     * [OTP]: https://en.wikipedia.org/wiki/One-time_pad
     * [KDF]: https://en.wikipedia.org/wiki/Key_derivation_function
     * @param {Uint8Array} message
     * @param {Uint8Array} key
     * @param {Uint8Array} salt
     * @param {number} iterations
     * @returns {Promise<Uint8Array>}
     */
    static otpKdf(message, key, salt, iterations) {
        const ptr0 = passArray8ToWasm0(message, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(key, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passArray8ToWasm0(salt, wasm.__wbindgen_malloc);
        const len2 = WASM_VECTOR_LEN;
        const ret = wasm.cryptoutils_otpKdf(ptr0, len0, ptr1, len1, ptr2, len2, iterations);
        return ret;
    }
}
if (Symbol.dispose) CryptoUtils.prototype[Symbol.dispose] = CryptoUtils.prototype.free;
export function __wbg_Error_960c155d3d49e4c2(arg0, arg1) {
    const ret = Error(getStringFromWasm0(arg0, arg1));
    return ret;
}
export function __wbg___wbindgen_is_function_3baa9db1a987f47d(arg0) {
    const ret = typeof(arg0) === 'function';
    return ret;
}
export function __wbg___wbindgen_is_undefined_29a43b4d42920abd(arg0) {
    const ret = arg0 === undefined;
    return ret;
}
export function __wbg___wbindgen_throw_6b64449b9b9ed33c(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
}
export function __wbg__wbg_cb_unref_b46c9b5a9f08ec37(arg0) {
    arg0._wbg_cb_unref();
}
export function __wbg_call_a24592a6f349a97e() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.call(arg1, arg2);
    return ret;
}, arguments); }
export function __wbg_new_from_slice_b5ea43e23f6008c0(arg0, arg1) {
    const ret = new Uint8Array(getArrayU8FromWasm0(arg0, arg1));
    return ret;
}
export function __wbg_new_typed_323f37fd55ab048d(arg0, arg1) {
    try {
        var state0 = {a: arg0, b: arg1};
        var cb0 = (arg0, arg1) => {
            const a = state0.a;
            state0.a = 0;
            try {
                return wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___js_sys_7ff7cdb33730fe00___Function_fn_wasm_bindgen_8e56df5fa3736b7e___JsValue_____wasm_bindgen_8e56df5fa3736b7e___sys__Undefined___js_sys_7ff7cdb33730fe00___Function_fn_wasm_bindgen_8e56df5fa3736b7e___JsValue_____wasm_bindgen_8e56df5fa3736b7e___sys__Undefined_______true_(a, state0.b, arg0, arg1);
            } finally {
                state0.a = a;
            }
        };
        const ret = new Promise(cb0);
        return ret;
    } finally {
        state0.a = 0;
    }
}
export function __wbg_queueMicrotask_5d15a957e6aa920e(arg0) {
    queueMicrotask(arg0);
}
export function __wbg_queueMicrotask_f8819e5ffc402f36(arg0) {
    const ret = arg0.queueMicrotask;
    return ret;
}
export function __wbg_resolve_e6c466bc1052f16c(arg0) {
    const ret = Promise.resolve(arg0);
    return ret;
}
export function __wbg_static_accessor_GLOBAL_8cfadc87a297ca02() {
    const ret = typeof global === 'undefined' ? null : global;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_static_accessor_GLOBAL_THIS_602256ae5c8f42cf() {
    const ret = typeof globalThis === 'undefined' ? null : globalThis;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_static_accessor_SELF_e445c1c7484aecc3() {
    const ret = typeof self === 'undefined' ? null : self;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_static_accessor_WINDOW_f20e8576ef1e0f17() {
    const ret = typeof window === 'undefined' ? null : window;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_then_8e16ee11f05e4827(arg0, arg1) {
    const ret = arg0.then(arg1);
    return ret;
}
export function __wbindgen_cast_0000000000000001(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Externref], shim_idx: 22, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___wasm_bindgen_8e56df5fa3736b7e___JsValue__core_9b3796e30d99ddb7___result__Result_____wasm_bindgen_8e56df5fa3736b7e___JsError___true_);
    return ret;
}
export function __wbindgen_init_externref_table() {
    const table = wasm.__wbindgen_externrefs;
    const offset = table.grow(4);
    table.set(0, undefined);
    table.set(offset + 0, undefined);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
}
function wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___wasm_bindgen_8e56df5fa3736b7e___JsValue__core_9b3796e30d99ddb7___result__Result_____wasm_bindgen_8e56df5fa3736b7e___JsError___true_(arg0, arg1, arg2) {
    const ret = wasm.wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___wasm_bindgen_8e56df5fa3736b7e___JsValue__core_9b3796e30d99ddb7___result__Result_____wasm_bindgen_8e56df5fa3736b7e___JsError___true_(arg0, arg1, arg2);
    if (ret[1]) {
        throw takeFromExternrefTable0(ret[0]);
    }
}

function wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___js_sys_7ff7cdb33730fe00___Function_fn_wasm_bindgen_8e56df5fa3736b7e___JsValue_____wasm_bindgen_8e56df5fa3736b7e___sys__Undefined___js_sys_7ff7cdb33730fe00___Function_fn_wasm_bindgen_8e56df5fa3736b7e___JsValue_____wasm_bindgen_8e56df5fa3736b7e___sys__Undefined_______true_(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___js_sys_7ff7cdb33730fe00___Function_fn_wasm_bindgen_8e56df5fa3736b7e___JsValue_____wasm_bindgen_8e56df5fa3736b7e___sys__Undefined___js_sys_7ff7cdb33730fe00___Function_fn_wasm_bindgen_8e56df5fa3736b7e___JsValue_____wasm_bindgen_8e56df5fa3736b7e___sys__Undefined_______true_(arg0, arg1, arg2, arg3);
}

const CryptoUtilsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_cryptoutils_free(ptr >>> 0, 1));

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_externrefs.set(idx, obj);
    return idx;
}

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => wasm.__wbindgen_destroy_closure(state.a, state.b));

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(ptr, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function makeMutClosure(arg0, arg1, f) {
    const state = { a: arg0, b: arg1, cnt: 1 };
    const real = (...args) => {

        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            state.a = a;
            real._wbg_cb_unref();
        }
    };
    real._wbg_cb_unref = () => {
        if (--state.cnt === 0) {
            wasm.__wbindgen_destroy_closure(state.a, state.b);
            state.a = 0;
            CLOSURE_DTORS.unregister(state);
        }
    };
    CLOSURE_DTORS.register(real, state, state);
    return real;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;


let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}
