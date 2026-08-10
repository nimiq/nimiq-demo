/**
 * @enum {0 | 1 | 2 | 3}
 */
export const AccountType = Object.freeze({
    Basic: 0, "0": "Basic",
    Vesting: 1, "1": "Vesting",
    HTLC: 2, "2": "HTLC",
    Staking: 3, "3": "Staking",
});

/**
 * An object representing a Nimiq address.
 * Offers methods to parse and format addresses from and to strings.
 */
export class Address {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Address.prototype);
        obj.__wbg_ptr = ptr;
        AddressFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        AddressFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_address_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.address___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Compares this address to the other address.
     *
     * Returns -1 if this address is smaller than the other address, 0 if they are equal,
     * and 1 if this address is larger than the other address.
     * @param {Address} other
     * @returns {number}
     */
    compare(other) {
        _assertClass(other, Address);
        const ret = wasm.address_compare(this.__wbg_ptr, other.__wbg_ptr);
        return ret;
    }
    /**
     * Deserializes an address from a byte array.
     * @param {Uint8Array} bytes
     * @returns {Address}
     */
    static deserialize(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.address_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Address.__wrap(ret[0]);
    }
    /**
     * Returns if this address is equal to the other address.
     * @param {Address} other
     * @returns {boolean}
     */
    equals(other) {
        _assertClass(other, Address);
        const ret = wasm.address_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Parses an address from an {@link Address} instance, a hex string representation, or a byte array.
     *
     * Throws when an address cannot be parsed from the argument.
     * @param {Address | string | Uint8Array} addr
     * @returns {Address}
     */
    static fromAny(addr) {
        const ret = wasm.address_fromAny(addr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Address.__wrap(ret[0]);
    }
    /**
     * Computes the multisig address of a list of signer public keys.
     * @param {(PublicKey | string | Uint8Array)[]} public_keys
     * @param {number} num_signers
     * @returns {Address}
     */
    static fromPublicKeys(public_keys, num_signers) {
        const ret = wasm.address_fromPublicKeys(public_keys, num_signers);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Address.__wrap(ret[0]);
    }
    /**
     * Parses an address from a string representation, either user-friendly or hex format.
     *
     * Throws when an address cannot be parsed from the string.
     * @param {string} str
     * @returns {Address}
     */
    static fromString(str) {
        const ptr0 = passStringToWasm0(str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.address_fromString(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Address.__wrap(ret[0]);
    }
    /**
     * Parses an address from its user-friendly string representation.
     *
     * Throws when an address cannot be parsed from the string.
     * @param {string} str
     * @returns {Address}
     */
    static fromUserFriendlyAddress(str) {
        const ptr0 = passStringToWasm0(str, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.address_fromUserFriendlyAddress(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Address.__wrap(ret[0]);
    }
    /**
     * @param {Uint8Array} bytes
     */
    constructor(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.address_new(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        AddressFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The all-zeroes burn address.
     * @returns {Address}
     */
    static get NULL() {
        const ret = wasm.address_null();
        return Address.__wrap(ret);
    }
    /**
     * Returns the byte representation of the address.
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.address_serialize(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Formats the address into hex format.
     * @returns {string}
     */
    toHex() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.address_toHex(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Formats the address into a plain string format.
     * @returns {string}
     */
    toPlain() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.address_toPlain(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Formats the address into user-friendly IBAN format.
     * @returns {string}
     */
    toUserFriendlyAddress() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.address_toUserFriendlyAddress(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) Address.prototype[Symbol.dispose] = Address.prototype.free;

/**
 * A BLS keypair
 * It is used by validators to vote during Tendermint rounds.
 * This is just a wrapper around our internal BLS structs
 */
export class BLSKeyPair {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(BLSKeyPair.prototype);
        obj.__wbg_ptr = ptr;
        BLSKeyPairFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BLSKeyPairFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_blskeypair_free(ptr, 0);
    }
    /**
     * Derives a keypair from an existing private key.
     * @param {BLSSecretKey} private_key
     * @returns {BLSKeyPair}
     */
    static derive(private_key) {
        _assertClass(private_key, BLSSecretKey);
        const ret = wasm.blskeypair_derive(private_key.__wbg_ptr);
        return BLSKeyPair.__wrap(ret);
    }
    /**
     * Deserializes a keypair from a byte array.
     * @param {Uint8Array} bytes
     * @returns {BLSKeyPair}
     */
    static deserialize(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.blskeypair_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BLSKeyPair.__wrap(ret[0]);
    }
    /**
     * Generates a new keypair from secure randomness.
     * @returns {BLSKeyPair}
     */
    static generate() {
        const ret = wasm.blskeypair_generate();
        return BLSKeyPair.__wrap(ret);
    }
    /**
     * @param {BLSSecretKey} secret_key
     * @param {BLSPublicKey} public_key
     */
    constructor(secret_key, public_key) {
        _assertClass(secret_key, BLSSecretKey);
        _assertClass(public_key, BLSPublicKey);
        const ret = wasm.blskeypair_new(secret_key.__wbg_ptr, public_key.__wbg_ptr);
        this.__wbg_ptr = ret >>> 0;
        BLSKeyPairFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Gets the keypair's public key.
     * @returns {BLSPublicKey}
     */
    get publicKey() {
        const ret = wasm.blskeypair_publicKey(this.__wbg_ptr);
        return BLSPublicKey.__wrap(ret);
    }
    /**
     * Gets the keypair's secret key.
     * @returns {BLSSecretKey}
     */
    get secretKey() {
        const ret = wasm.blskeypair_secretKey(this.__wbg_ptr);
        return BLSSecretKey.__wrap(ret);
    }
    /**
     * Serializes to a byte array.
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.blskeypair_serialize(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Formats the keypair into a hex string.
     * @returns {string}
     */
    toHex() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.blskeypair_toHex(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) BLSKeyPair.prototype[Symbol.dispose] = BLSKeyPair.prototype.free;

/**
 * The public part of the BLS keypair.
 * This is specified in the staking contract to verify votes from Validators.
 */
export class BLSPublicKey {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(BLSPublicKey.prototype);
        obj.__wbg_ptr = ptr;
        BLSPublicKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BLSPublicKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_blspublickey_free(ptr, 0);
    }
    /**
     * Derives a public key from an existing private key.
     * @param {BLSSecretKey} secret_key
     * @returns {BLSPublicKey}
     */
    static derive(secret_key) {
        _assertClass(secret_key, BLSSecretKey);
        const ret = wasm.blspublickey_derive(secret_key.__wbg_ptr);
        return BLSPublicKey.__wrap(ret);
    }
    /**
     * Deserializes a public key from a byte array.
     * @param {Uint8Array} bytes
     * @returns {BLSPublicKey}
     */
    static deserialize(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.blspublickey_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BLSPublicKey.__wrap(ret[0]);
    }
    /**
     * Parses a public key from its hex representation.
     * @param {string} hex
     * @returns {BLSPublicKey}
     */
    static fromHex(hex) {
        const ptr0 = passStringToWasm0(hex, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.blspublickey_fromHex(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BLSPublicKey.__wrap(ret[0]);
    }
    /**
     * Creates a new public key from a byte array.
     * @param {Uint8Array} bytes
     */
    constructor(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.blspublickey_new(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        BLSPublicKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Serializes the public key to a byte array.
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.blspublickey_serialize(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Formats the public key into a hex string.
     * @returns {string}
     */
    toHex() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.blspublickey_toHex(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) BLSPublicKey.prototype[Symbol.dispose] = BLSPublicKey.prototype.free;

/**
 * The secret part of the BLS keypair.
 * This is specified in the config file, and is used by Validators to vote.
 */
export class BLSSecretKey {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(BLSSecretKey.prototype);
        obj.__wbg_ptr = ptr;
        BLSSecretKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BLSSecretKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_blssecretkey_free(ptr, 0);
    }
    /**
     * Deserializes a private key from a byte array.
     * @param {Uint8Array} bytes
     * @returns {BLSSecretKey}
     */
    static deserialize(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.blssecretkey_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BLSSecretKey.__wrap(ret[0]);
    }
    /**
     * Parses a private key from its hex representation.
     * @param {string} hex
     * @returns {BLSSecretKey}
     */
    static fromHex(hex) {
        const ptr0 = passStringToWasm0(hex, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.blssecretkey_fromHex(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return BLSSecretKey.__wrap(ret[0]);
    }
    /**
     * Generates a new private key from secure randomness.
     * @returns {BLSSecretKey}
     */
    static generate() {
        const ret = wasm.blssecretkey_generate();
        return BLSSecretKey.__wrap(ret);
    }
    /**
     * Creates a new private key from a byte array.
     * @param {Uint8Array} bytes
     */
    constructor(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.blssecretkey_new(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        BLSSecretKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Serializes the private key to a byte array.
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.blssecretkey_serialize(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Formats the private key into a hex string.
     * @returns {string}
     */
    toHex() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.blssecretkey_toHex(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) BLSSecretKey.prototype[Symbol.dispose] = BLSSecretKey.prototype.free;

/**
 * Use this to provide initialization-time configuration to the Client.
 * This is a simplified version of the configuration that is used for regular nodes,
 * since not all configuration knobs are available when running inside a browser.
 */
export class ClientConfiguration {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ClientConfigurationFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_clientconfiguration_free(ptr, 0);
    }
    /**
     * Returns a plain configuration object to be passed to `Client.create`.
     * @returns {PlainClientConfiguration}
     */
    build() {
        const ret = wasm.clientconfiguration_build(this.__wbg_ptr);
        return ret;
    }
    /**
     * Sets the desired number of peers the client should try to connect to.
     * Default is `12`.
     * @param {number} desired_peer_count
     */
    desiredPeerCount(desired_peer_count) {
        wasm.clientconfiguration_desiredPeerCount(this.__wbg_ptr, desired_peer_count);
    }
    /**
     * Sets the log level that is used when logging to the console.
     *
     * Possible values are `'trace' | 'debug' | 'info' | 'warn' | 'error'`.
     * Default is `'info'`.
     * @param {string} log_level
     */
    logLevel(log_level) {
        const ptr0 = passStringToWasm0(log_level, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.clientconfiguration_logLevel(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Sets the network ID the client should use. Input is case-insensitive.
     *
     * Possible values are `'MainAlbatross' | 'TestAlbatross' | 'DevAlbatross'`.
     * Default is `'MainAlbatross'`.
     * @param {string} network
     */
    network(network) {
        const ptr0 = passStringToWasm0(network, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.clientconfiguration_network(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * Sets the maximum network buffer size, which should be greater than 0
     * Default is `1024`.
     * @param {number} network_buffer_size
     */
    networkBufferSize(network_buffer_size) {
        wasm.clientconfiguration_networkBufferSize(this.__wbg_ptr, network_buffer_size);
    }
    /**
     * Creates a default client configuration that can be used to change the client's configuration.
     *
     * Use its `instantiateClient()` method to launch the client and connect to the network.
     */
    constructor() {
        const ret = wasm.clientconfiguration_new();
        this.__wbg_ptr = ret >>> 0;
        ClientConfigurationFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Sets whether the client should only connect to secure WebSocket connections.
     * Default is `true`.
     * @param {boolean} only_secure_ws_connections
     */
    onlySecureWsConnections(only_secure_ws_connections) {
        wasm.clientconfiguration_onlySecureWsConnections(this.__wbg_ptr, only_secure_ws_connections);
    }
    /**
     * Sets the maximum number of peers the client should connect to.
     * Default is `50`.
     * @param {number} peer_count_max
     */
    peerCountMax(peer_count_max) {
        wasm.clientconfiguration_peerCountMax(this.__wbg_ptr, peer_count_max);
    }
    /**
     * Sets the maximum number of peers the client should connect to per IP address.
     * Default is `10`.
     * @param {number} peer_count_per_ip_max
     */
    peerCountPerIpMax(peer_count_per_ip_max) {
        wasm.clientconfiguration_peerCountPerIpMax(this.__wbg_ptr, peer_count_per_ip_max);
    }
    /**
     * Sets the maximum number of peers the client should connect to per subnet.
     * Default is `10`.
     * @param {number} peer_count_per_subnet_max
     */
    peerCountPerSubnetMax(peer_count_per_subnet_max) {
        wasm.clientconfiguration_peerCountPerSubnetMax(this.__wbg_ptr, peer_count_per_subnet_max);
    }
    /**
     * Sets the list of seed nodes that are used to connect to the Nimiq Albatross network.
     *
     * Each array entry must be a proper Multiaddr format string.
     *
     * Throws when an entry cannot be deserialized as a string.
     * @param {any[]} seeds
     */
    seedNodes(seeds) {
        const ptr0 = passArrayJsValueToWasm0(seeds, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.clientconfiguration_seedNodes(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * Sets the sync mode that should be used.
     * Only "light" and "pico" are supported for web clients
     * Default is "pico"
     * @param {string} sync_mode
     */
    syncMode(sync_mode) {
        const ptr0 = passStringToWasm0(sync_mode, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.clientconfiguration_syncMode(this.__wbg_ptr, ptr0, len0);
    }
}
if (Symbol.dispose) ClientConfiguration.prototype[Symbol.dispose] = ClientConfiguration.prototype.free;

/**
 * A cryptographic commitment to a {@link RandomSecret}. The commitment is public, while the secret is, well, secret.
 */
export class Commitment {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Commitment.prototype);
        obj.__wbg_ptr = ptr;
        CommitmentFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CommitmentFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_commitment_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.commitment___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Derives a commitment from an existing random secret.
     * @param {RandomSecret} random_secret
     * @returns {Commitment}
     */
    static derive(random_secret) {
        _assertClass(random_secret, RandomSecret);
        const ret = wasm.commitment_derive(random_secret.__wbg_ptr);
        return Commitment.__wrap(ret);
    }
    /**
     * Deserializes a commitment from a byte array.
     *
     * Throws when the byte array contains less than 32 bytes.
     * @param {Uint8Array} bytes
     * @returns {Commitment}
     */
    static deserialize(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.commitment_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Commitment.__wrap(ret[0]);
    }
    /**
     * Returns if this commitment is equal to the other commitment.
     * @param {Commitment} other
     * @returns {boolean}
     */
    equals(other) {
        _assertClass(other, Commitment);
        const ret = wasm.commitment_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Parses a commitment from a {@link Commitment} instance, a hex string representation, or a byte array.
     *
     * Throws when a Commitment cannot be parsed from the argument.
     * @param {Commitment | string | Uint8Array} commitment
     * @returns {Commitment}
     */
    static fromAny(commitment) {
        const ret = wasm.commitment_fromAny(commitment);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Commitment.__wrap(ret[0]);
    }
    /**
     * Parses a commitment from its hex representation.
     *
     * Throws when the string is not valid hex format or when it represents less than 32 bytes.
     * @param {string} hex
     * @returns {Commitment}
     */
    static fromHex(hex) {
        const ptr0 = passStringToWasm0(hex, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.commitment_fromHex(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Commitment.__wrap(ret[0]);
    }
    /**
     * Creates a new commitment from a byte array.
     *
     * Throws when the byte array is not exactly 32 bytes long.
     * @param {Uint8Array} bytes
     */
    constructor(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.commitment_new(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        CommitmentFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Serializes the commitment to a byte array.
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.commitment_serialize(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {number}
     */
    get serializedSize() {
        const ret = wasm.commitment_serialized_size(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    static get SIZE() {
        const ret = wasm.commitment_size();
        return ret >>> 0;
    }
    /**
     * Sums up multiple commitments into one aggregated commitment.
     *
     * Attention: This is a simple summation, not a MuSig2 aggregation! For MuSig2 aggregation, use {@link Commitment.sumMuSig2}.
     * @param {(Commitment | string | Uint8Array)[]} commitments
     * @returns {Commitment}
     */
    static sum(commitments) {
        const ret = wasm.commitment_sum(commitments);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Commitment.__wrap(ret[0]);
    }
    /**
     * Aggregates commitments into one aggregated commitment using the MuSig2 scheme.
     *
     * - Each commitment group must correspond to the public key at the same index in the `publicKeys` array.
     * - The number of commitment groups and public keys must be the same.
     * - Each commitment group must contain exactly `MUSIG2_PARAMETER_V = 2` commitments.
     * - The `data` parameter is the same data that will be signed using the aggregated commitment, e.g. the serialized content of a transaction.
     *
     * Returns the aggregated commitment.
     * @param {(PublicKey | string | Uint8Array)[]} public_keys
     * @param {(Commitment | string | Uint8Array)[][]} commitment_groups
     * @param {Uint8Array} data
     * @returns {Commitment}
     */
    static sumMuSig2(public_keys, commitment_groups, data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.commitment_sumMuSig2(public_keys, commitment_groups, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Commitment.__wrap(ret[0]);
    }
    /**
     * Formats the commitment into a hex string.
     * @returns {string}
     */
    toHex() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.commitment_toHex(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) Commitment.prototype[Symbol.dispose] = Commitment.prototype.free;

/**
 * A structure holding both a random secret and its corresponding public commitment.
 * This is similar to a `KeyPair`.
 */
export class CommitmentPair {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CommitmentPair.prototype);
        obj.__wbg_ptr = ptr;
        CommitmentPairFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CommitmentPairFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_commitmentpair_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.commitmentpair___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @returns {Commitment}
     */
    get commitment() {
        const ret = wasm.commitmentpair_commitment(this.__wbg_ptr);
        return Commitment.__wrap(ret);
    }
    /**
     * Derives a commitment pair from an existing random secret.
     * @param {RandomSecret} random_secret
     * @returns {CommitmentPair}
     */
    static derive(random_secret) {
        _assertClass(random_secret, RandomSecret);
        const ret = wasm.commitmentpair_derive(random_secret.__wbg_ptr);
        return CommitmentPair.__wrap(ret);
    }
    /**
     * Deserializes a commitment pair from a byte array.
     *
     * Throws when the byte array contains less than 32 bytes.
     * @param {Uint8Array} bytes
     * @returns {CommitmentPair}
     */
    static deserialize(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.commitmentpair_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return CommitmentPair.__wrap(ret[0]);
    }
    /**
     * Returns if this commitment pair is equal to the other commitment pair.
     * @param {CommitmentPair} other
     * @returns {boolean}
     */
    equals(other) {
        _assertClass(other, CommitmentPair);
        const ret = wasm.commitmentpair_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Parses a commitment pair from a {@link CommitmentPair} instance, a hex string representation, or a byte array.
     *
     * Throws when a CommitmentPair cannot be parsed from the argument.
     * @param {CommitmentPair | string | Uint8Array} pair
     * @returns {CommitmentPair}
     */
    static fromAny(pair) {
        const ret = wasm.commitmentpair_fromAny(pair);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return CommitmentPair.__wrap(ret[0]);
    }
    /**
     * Parses a commitment pair from its hex representation.
     *
     * Throws when the string is not valid hex format or when it represents less than 32 bytes.
     * @param {string} hex
     * @returns {CommitmentPair}
     */
    static fromHex(hex) {
        const ptr0 = passStringToWasm0(hex, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.commitmentpair_fromHex(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return CommitmentPair.__wrap(ret[0]);
    }
    /**
     * @returns {CommitmentPair}
     */
    static generate() {
        const ret = wasm.commitmentpair_generate();
        return CommitmentPair.__wrap(ret);
    }
    /**
     * @param {RandomSecret} random_secret
     * @param {Commitment} commitment
     */
    constructor(random_secret, commitment) {
        _assertClass(random_secret, RandomSecret);
        _assertClass(commitment, Commitment);
        const ret = wasm.commitmentpair_new(random_secret.__wbg_ptr, commitment.__wbg_ptr);
        this.__wbg_ptr = ret >>> 0;
        CommitmentPairFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {RandomSecret}
     */
    get secret() {
        const ret = wasm.commitmentpair_secret(this.__wbg_ptr);
        return RandomSecret.__wrap(ret);
    }
    /**
     * Serializes the commitment pair to a byte array.
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.commitmentpair_serialize(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {number}
     */
    get serializedSize() {
        const ret = wasm.commitmentpair_serialized_size(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    static get SIZE() {
        const ret = wasm.commitmentpair_size();
        return ret >>> 0;
    }
    /**
     * Formats the commitment pair into a hex string.
     * @returns {string}
     */
    toHex() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.commitmentpair_toHex(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) CommitmentPair.prototype[Symbol.dispose] = CommitmentPair.prototype.free;

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
     * Computes a 64-byte [HMAC]-SHA512 hash from the input key and data.
     *
     * [HMAC]: https://en.wikipedia.org/wiki/HMAC
     * @param {Uint8Array} key
     * @param {Uint8Array} data
     * @returns {Uint8Array}
     */
    static computeHmacSha512(key, data) {
        const ptr0 = passArray8ToWasm0(key, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.cryptoutils_computeHmacSha512(ptr0, len0, ptr1, len1);
        var v3 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v3;
    }
    /**
     * Computes a [PBKDF2]-over-SHA512 key from the password with the given parameters.
     *
     * [PBKDF2]: https://en.wikipedia.org/wiki/PBKDF2
     * @param {Uint8Array} password
     * @param {Uint8Array} salt
     * @param {number} iterations
     * @param {number} derived_key_length
     * @returns {Uint8Array}
     */
    static computePBKDF2sha512(password, salt, iterations, derived_key_length) {
        const ptr0 = passArray8ToWasm0(password, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(salt, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.cryptoutils_computePBKDF2sha512(ptr0, len0, ptr1, len1, iterations, derived_key_length);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v3 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v3;
    }
    /**
     * Generates a secure random byte array of the given length.
     * @param {number} length
     * @returns {Uint8Array}
     */
    static getRandomValues(length) {
        const ret = wasm.cryptoutils_getRandomValues(length);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
}
if (Symbol.dispose) CryptoUtils.prototype[Symbol.dispose] = CryptoUtils.prototype.free;

/**
 * The non-secret (public) part of an ES256 asymmetric key pair that is typically used to digitally verify or encrypt data.
 */
export class ES256PublicKey {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ES256PublicKey.prototype);
        obj.__wbg_ptr = ptr;
        ES256PublicKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ES256PublicKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_es256publickey_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.es256publickey___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Compares this public key to the other public key.
     *
     * Returns -1 if this public key is smaller than the other public key, 0 if they are equal,
     * and 1 if this public key is larger than the other public key.
     * @param {ES256PublicKey} other
     * @returns {number}
     */
    compare(other) {
        _assertClass(other, ES256PublicKey);
        const ret = wasm.es256publickey_compare(this.__wbg_ptr, other.__wbg_ptr);
        return ret;
    }
    /**
     * Deserializes a public key from a byte array.
     *
     * Throws when the byte array contains less than 33 bytes.
     * @param {Uint8Array} bytes
     * @returns {ES256PublicKey}
     */
    static deserialize(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.es256publickey_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ES256PublicKey.__wrap(ret[0]);
    }
    /**
     * Returns if this public key is equal to the other public key.
     * @param {ES256PublicKey} other
     * @returns {boolean}
     */
    equals(other) {
        _assertClass(other, ES256PublicKey);
        const ret = wasm.es256publickey_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Parses a public key from its hex representation.
     *
     * Throws when the string is not valid hex format or when it represents less than 33 bytes.
     * @param {string} hex
     * @returns {ES256PublicKey}
     */
    static fromHex(hex) {
        const ptr0 = passStringToWasm0(hex, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.es256publickey_fromHex(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ES256PublicKey.__wrap(ret[0]);
    }
    /**
     * Deserializes a public key from its raw representation.
     * @param {Uint8Array} raw_bytes
     * @returns {ES256PublicKey}
     */
    static fromRaw(raw_bytes) {
        const ptr0 = passArray8ToWasm0(raw_bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.es256publickey_fromRaw(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ES256PublicKey.__wrap(ret[0]);
    }
    /**
     * Deserializes a public key from its SPKI representation.
     * @param {Uint8Array} spki_bytes
     * @returns {ES256PublicKey}
     */
    static fromSpki(spki_bytes) {
        const ptr0 = passArray8ToWasm0(spki_bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.es256publickey_fromSpki(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ES256PublicKey.__wrap(ret[0]);
    }
    /**
     * Creates a new public key from a byte array.
     *
     * Compatible with the `-7` COSE algorithm identifier.
     *
     * ## Example
     *
     * ```javascript
     * // Create/register a credential with the Webauthn API:
     * const cred = await navigator.credentials.create({
     *     publicKey: {
     *         pubKeyCredParams: [{
     *             type: "public-key",
     *             alg: -7, // ES256 = ECDSA over P-256 with SHA-256
     *        }],
     *        // ...
     *     },
     * });
     *
     * // Then create an instance of ES256PublicKey from the credential response:
     * const publicKey = new Nimiq.ES256PublicKey(new Uint8Array(cred.response.getPublicKey()));
     * ```
     * @param {Uint8Array} bytes
     */
    constructor(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.es256publickey_new(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        ES256PublicKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Serializes the public key to a byte array.
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.es256publickey_serialize(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Gets the public key's address.
     * @returns {Address}
     */
    toAddress() {
        const ret = wasm.es256publickey_toAddress(this.__wbg_ptr);
        return Address.__wrap(ret);
    }
    /**
     * Formats the public key into a hex string.
     * @returns {string}
     */
    toHex() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.es256publickey_toHex(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Verifies that a signature is valid for this public key and the provided data.
     * @param {ES256Signature} signature
     * @param {Uint8Array} data
     * @returns {boolean}
     */
    verify(signature, data) {
        _assertClass(signature, ES256Signature);
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.es256publickey_verify(this.__wbg_ptr, signature.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
}
if (Symbol.dispose) ES256PublicKey.prototype[Symbol.dispose] = ES256PublicKey.prototype.free;

/**
 * An ES256 Signature represents a cryptographic proof that an ES256 private key signed some data.
 * It can be verified with the private key's public key.
 */
export class ES256Signature {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ES256Signature.prototype);
        obj.__wbg_ptr = ptr;
        ES256SignatureFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ES256SignatureFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_es256signature_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.es256signature___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Deserializes an ES256 signature from a byte array.
     *
     * Throws when the byte array contains less than 64 bytes.
     * @param {Uint8Array} bytes
     * @returns {ES256Signature}
     */
    static deserialize(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.es256signature_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ES256Signature.__wrap(ret[0]);
    }
    /**
     * Parses an ES256 signature from its ASN.1 representation.
     * @param {Uint8Array} bytes
     * @returns {ES256Signature}
     */
    static fromAsn1(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.es256signature_fromAsn1(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ES256Signature.__wrap(ret[0]);
    }
    /**
     * Parses an ES256 signature from its hex representation.
     *
     * Throws when the string is not valid hex format or when it represents less than 64 bytes.
     * @param {string} hex
     * @returns {ES256Signature}
     */
    static fromHex(hex) {
        const ptr0 = passStringToWasm0(hex, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.es256signature_fromHex(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ES256Signature.__wrap(ret[0]);
    }
    /**
     * Serializes the signature to a byte array.
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.es256signature_serialize(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Formats the signature into a hex string.
     * @returns {string}
     */
    toHex() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.es256signature_toHex(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) ES256Signature.prototype[Symbol.dispose] = ES256Signature.prototype.free;

export class Hash {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        HashFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_hash_free(ptr, 0);
    }
    /**
     * Computes a 32-byte [Blake2b] hash from the input data.
     *
     * Blake2b is used for example to compute a public key's address.
     *
     * [Blake2b]: https://en.wikipedia.org/wiki/BLAKE_(hash_function)
     * @param {Uint8Array} data
     * @returns {Uint8Array}
     */
    static computeBlake2b(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.hash_computeBlake2b(ptr0, len0);
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
    /**
     * Computes an [Argon2d] hash with some Nimiq-specific parameters.
     *
     * `iterations` specifies the number of iterations done in the hash
     * function. It can be used to control the hash computation time.
     * Increasing this will make it harder for an attacker to brute-force the
     * password.
     *
     * `derived_key_length` specifies the number of bytes that are output.
     *
     * [Argon2d]: https://en.wikipedia.org/wiki/Argon2
     * @param {Uint8Array} password
     * @param {Uint8Array} salt
     * @param {number} iterations
     * @param {number} derived_key_length
     * @returns {Uint8Array}
     */
    static computeNimiqArgon2d(password, salt, iterations, derived_key_length) {
        const ptr0 = passArray8ToWasm0(password, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(salt, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.hash_computeNimiqArgon2d(ptr0, len0, ptr1, len1, iterations, derived_key_length);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v3 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v3;
    }
    /**
     * Computes an [Argon2id] hash with some Nimiq-specific parameters.
     *
     * `iterations` specifies the number of iterations done in the hash
     * function. It can be used to control the hash computation time.
     * Increasing this will make it harder for an attacker to brute-force the
     * password.
     *
     * `derived_key_length` specifies the number of bytes that are output.
     *
     * [Argon2id]: https://en.wikipedia.org/wiki/Argon2
     * @param {Uint8Array} password
     * @param {Uint8Array} salt
     * @param {number} iterations
     * @param {number} derived_key_length
     * @returns {Uint8Array}
     */
    static computeNimiqArgon2id(password, salt, iterations, derived_key_length) {
        const ptr0 = passArray8ToWasm0(password, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(salt, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.hash_computeNimiqArgon2id(ptr0, len0, ptr1, len1, iterations, derived_key_length);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v3 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v3;
    }
    /**
     * Computes a 32-byte [SHA256] hash from the input data.
     *
     * [SHA256]: https://en.wikipedia.org/wiki/SHA-2
     * @param {Uint8Array} data
     * @returns {Uint8Array}
     */
    static computeSha256(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.hash_computeSha256(ptr0, len0);
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
    /**
     * Computes a 64-byte [SHA512] hash from the input data.
     *
     * [SHA512]: https://en.wikipedia.org/wiki/SHA-2
     * @param {Uint8Array} data
     * @returns {Uint8Array}
     */
    static computeSha512(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.hash_computeSha512(ptr0, len0);
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
}
if (Symbol.dispose) Hash.prototype[Symbol.dispose] = Hash.prototype.free;

/**
 * Utility class providing methods to parse Hashed Time Locked Contract transaction data and proofs.
 */
export class HashedTimeLockedContract {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        HashedTimeLockedContractFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_hashedtimelockedcontract_free(ptr, 0);
    }
    /**
     * Parses the data of a Hashed Time Locked Contract creation transaction into a plain object.
     * @param {Uint8Array} data
     * @returns {PlainTransactionRecipientData}
     */
    static dataToPlain(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.hashedtimelockedcontract_dataToPlain(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * Parses the proof of a Hashed Time Locked Contract settlement transaction into a plain object.
     * @param {Uint8Array} proof
     * @returns {PlainTransactionProof}
     */
    static proofToPlain(proof) {
        const ptr0 = passArray8ToWasm0(proof, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.hashedtimelockedcontract_proofToPlain(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
}
if (Symbol.dispose) HashedTimeLockedContract.prototype[Symbol.dispose] = HashedTimeLockedContract.prototype.free;

/**
 * A keypair represents a private key and its respective public key.
 * It is used for signing data, usually transactions.
 */
export class KeyPair {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(KeyPair.prototype);
        obj.__wbg_ptr = ptr;
        KeyPairFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        KeyPairFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_keypair_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.keypair___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Derives a keypair from an existing private key.
     * @param {PrivateKey} private_key
     * @returns {KeyPair}
     */
    static derive(private_key) {
        _assertClass(private_key, PrivateKey);
        const ret = wasm.keypair_derive(private_key.__wbg_ptr);
        return KeyPair.__wrap(ret);
    }
    /**
     * Deserializes a keypair from a byte array.
     *
     * Throws when the byte array contains less than 64 bytes.
     * @param {Uint8Array} bytes
     * @returns {KeyPair}
     */
    static deserialize(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.keypair_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return KeyPair.__wrap(ret[0]);
    }
    /**
     * Parses a keypair from its hex representation.
     *
     * Throws when the string is not valid hex or does not represent a 64-byte keypair
     * (optionally followed by a 1-byte lock-state flag, as produced by `toHex`).
     * @param {string} hex
     * @returns {KeyPair}
     */
    static fromHex(hex) {
        const ptr0 = passStringToWasm0(hex, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.keypair_fromHex(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return KeyPair.__wrap(ret[0]);
    }
    /**
     * Generates a new keypair from secure randomness.
     * @returns {KeyPair}
     */
    static generate() {
        const ret = wasm.keypair_generate();
        return KeyPair.__wrap(ret);
    }
    /**
     * @param {PrivateKey} private_key
     * @param {PublicKey} public_key
     */
    constructor(private_key, public_key) {
        _assertClass(private_key, PrivateKey);
        _assertClass(public_key, PublicKey);
        const ret = wasm.keypair_new(private_key.__wbg_ptr, public_key.__wbg_ptr);
        this.__wbg_ptr = ret >>> 0;
        KeyPairFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Gets the keypair's private key.
     * @returns {PrivateKey}
     */
    get privateKey() {
        const ret = wasm.keypair_privateKey(this.__wbg_ptr);
        return PrivateKey.__wrap(ret);
    }
    /**
     * Gets the keypair's public key.
     * @returns {PublicKey}
     */
    get publicKey() {
        const ret = wasm.keypair_publicKey(this.__wbg_ptr);
        return PublicKey.__wrap(ret);
    }
    /**
     * Serializes the keypair to a byte array.
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.keypair_serialize(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Signs arbitrary data, returns a signature object.
     * @param {Uint8Array} data
     * @returns {Signature}
     */
    sign(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.keypair_sign(this.__wbg_ptr, ptr0, len0);
        return Signature.__wrap(ret);
    }
    /**
     * Signs a transaction and sets the signature proof on the transaction object.
     * @param {Transaction} transaction
     */
    signTransaction(transaction) {
        _assertClass(transaction, Transaction);
        const ret = wasm.keypair_signTransaction(this.__wbg_ptr, transaction.__wbg_ptr);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * Gets the keypair's address.
     * @returns {Address}
     */
    toAddress() {
        const ret = wasm.keypair_toAddress(this.__wbg_ptr);
        return Address.__wrap(ret);
    }
    /**
     * Formats the keypair into a hex string.
     * @returns {string}
     */
    toHex() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.keypair_toHex(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) KeyPair.prototype[Symbol.dispose] = KeyPair.prototype.free;

/**
 * A Merkle path consisting of a sequence of hashes that can be used to verify the inclusion of a leaf in a Merkle tree.
 */
export class MerklePath {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(MerklePath.prototype);
        obj.__wbg_ptr = ptr;
        MerklePathFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        MerklePathFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_merklepath_free(ptr, 0);
    }
    /**
     * Computes the Merkle root of the path given a leaf hash.
     * @param {Uint8Array} leaf
     * @returns {Uint8Array}
     */
    computeRoot(leaf) {
        const ptr0 = passArray8ToWasm0(leaf, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.merklepath_computeRoot(this.__wbg_ptr, ptr0, len0);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
    /**
     * Deserializes a Merkle path from a byte array.
     * @param {Uint8Array} data
     * @returns {MerklePath}
     */
    static deserialize(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.merklepath_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return MerklePath.__wrap(ret[0]);
    }
    /**
     * Returns the hashes in the Merkle path.
     * @returns {Uint8Array[]}
     */
    get hashes() {
        const ret = wasm.merklepath_hashes(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Returns the length of the Merkle path.
     * @returns {number}
     */
    get length() {
        const ret = wasm.merklepath_length(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Serializes the Merkle path into a byte array.
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.merklepath_serialize(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
}
if (Symbol.dispose) MerklePath.prototype[Symbol.dispose] = MerklePath.prototype.free;

/**
 * The Merkle tree is a data structure that allows for efficient verification of the membership of an element in a set.
 */
export class MerkleTree {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        MerkleTreeFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_merkletree_free(ptr, 0);
    }
    /**
     * Computes the root of a Merkle tree from a list of Uint8Arrays.
     * @param {Uint8Array[]} values
     * @returns {Uint8Array}
     */
    static computeRoot(values) {
        const ptr0 = passArrayJsValueToWasm0(values, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.merkletree_computeRoot(ptr0, len0);
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
}
if (Symbol.dispose) MerkleTree.prototype[Symbol.dispose] = MerkleTree.prototype.free;

/**
 * A partial signature is a signature of one of the co-signers in a multisig.
 * Combining all partial signatures yields the full signature (combining is done through summation).
 */
export class PartialSignature {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PartialSignature.prototype);
        obj.__wbg_ptr = ptr;
        PartialSignatureFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PartialSignatureFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_partialsignature_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.partialsignature___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Creates a new partial signature for the MuSig2 scheme.
     *
     * - `ownCommitmentPairs` must be 2 pairs of random secret and commitments generated for this signing session.
     * - `otherCommitments` must contain 2 commitments each for all other signers.
     *
     * Returns the created partial signature.
     * @param {PrivateKey} own_private_key
     * @param {PublicKey} own_public_key
     * @param {(CommitmentPair | string | Uint8Array)[]} own_commitment_pairs
     * @param {(PublicKey | string | Uint8Array)[]} other_public_keys
     * @param {(Commitment | string | Uint8Array)[][]} other_commitments
     * @param {Uint8Array} data
     * @returns {PartialSignature}
     */
    static create(own_private_key, own_public_key, own_commitment_pairs, other_public_keys, other_commitments, data) {
        _assertClass(own_private_key, PrivateKey);
        _assertClass(own_public_key, PublicKey);
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.partialsignature_create(own_private_key.__wbg_ptr, own_public_key.__wbg_ptr, own_commitment_pairs, other_public_keys, other_commitments, ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return PartialSignature.__wrap(ret[0]);
    }
    /**
     * Deserializes a partial signature from a byte array.
     *
     * Throws when the byte array contains less than 32 bytes.
     * @param {Uint8Array} bytes
     * @returns {PartialSignature}
     */
    static deserialize(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.partialsignature_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return PartialSignature.__wrap(ret[0]);
    }
    /**
     * Returns if this partial signature is equal to the other partial signature.
     * @param {PartialSignature} other
     * @returns {boolean}
     */
    equals(other) {
        _assertClass(other, PartialSignature);
        const ret = wasm.partialsignature_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Parses a partial signature from a {@link PartialSignature} instance, a hex string representation, or a byte array.
     *
     * Throws when a PartialSignature cannot be parsed from the argument.
     * @param {PartialSignature | string | Uint8Array} sig
     * @returns {PartialSignature}
     */
    static fromAny(sig) {
        const ret = wasm.partialsignature_fromAny(sig);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return PartialSignature.__wrap(ret[0]);
    }
    /**
     * Parses a partial signature from its hex representation.
     *
     * Throws when the string is not valid hex format or when it represents less than 32 bytes.
     * @param {string} hex
     * @returns {PartialSignature}
     */
    static fromHex(hex) {
        const ptr0 = passStringToWasm0(hex, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.partialsignature_fromHex(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return PartialSignature.__wrap(ret[0]);
    }
    /**
     * Creates a new partial signature from a byte array.
     *
     * Throws when the byte array is not exactly 32 bytes long.
     * @param {Uint8Array} bytes
     */
    constructor(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.partialsignature_new(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        PartialSignatureFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Serializes the partial signature to a byte array.
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.partialsignature_serialize(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {number}
     */
    get serializedSize() {
        const ret = wasm.partialsignature_serialized_size(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    static get SIZE() {
        const ret = wasm.partialsignature_size();
        return ret >>> 0;
    }
    /**
     * Sums an array of partial signatures into an aggregated partial signature.
     *
     * Afterwards, use `.toSignature(aggregatedCommitment)` on the result to get the final signature.
     * @param {(PartialSignature | string | Uint8Array)[]} partial_signatures
     * @returns {PartialSignature}
     */
    static sum(partial_signatures) {
        const ret = wasm.partialsignature_sum(partial_signatures);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return PartialSignature.__wrap(ret[0]);
    }
    /**
     * Formats the partial signature into a hex string.
     * @returns {string}
     */
    toHex() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.partialsignature_toHex(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Converts a (aggregated) partial signature into a final signature using the aggregated commitment.
     * @param {Commitment} aggregated_commitment
     * @returns {Signature}
     */
    toSignature(aggregated_commitment) {
        _assertClass(aggregated_commitment, Commitment);
        var ptr0 = aggregated_commitment.__destroy_into_raw();
        const ret = wasm.partialsignature_toSignature(this.__wbg_ptr, ptr0);
        return Signature.__wrap(ret);
    }
}
if (Symbol.dispose) PartialSignature.prototype[Symbol.dispose] = PartialSignature.prototype.free;

/**
 * Policy constants
 */
export class Policy {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PolicyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_policy_free(ptr, 0);
    }
    /**
     * Returns the batch number at a given `block_number` (height)
     * @param {number} block_number
     * @returns {number}
     */
    static batchAt(block_number) {
        const ret = wasm.policy_batchAt(block_number);
        return ret >>> 0;
    }
    /**
     * Returns the percentage reduction that should be applied to the rewards due to a delayed batch.
     * This function returns a float in the range [0, 1]
     * I.e 1 means that the full rewards should be given, whereas 0.5 means that half of the rewards should be given
     * The input to this function is the batch delay, in milliseconds
     * The function is: [(1 - MINIMUM_REWARDS_PERCENTAGE) * BLOCKS_DELAY_DECAY ^ (t^2)] + MINIMUM_REWARDS_PERCENTAGE
     * @param {bigint} delay
     * @returns {number}
     */
    static batchDelayPenalty(delay) {
        const ret = wasm.policy_batchDelayPenalty(delay);
        return ret;
    }
    /**
     * Returns the batch index at a given block number. The batch index is the number of a block relative
     * to the batch it is in. For example, the first block of any batch always has an batch index of 0.
     * @param {number} block_number
     * @returns {number}
     */
    static batchIndexAt(block_number) {
        const ret = wasm.policy_batchIndexAt(block_number);
        return ret >>> 0;
    }
    /**
     * How many batches constitute an epoch
     * @returns {number}
     */
    static get BATCHES_PER_EPOCH() {
        const ret = wasm.policy_batches_per_epoch();
        return ret;
    }
    /**
     * Returns the first block after the jail period of a given block number has ended.
     * @param {number} block_number
     * @returns {number}
     */
    static blockAfterJail(block_number) {
        const ret = wasm.policy_blockAfterJail(block_number);
        return ret >>> 0;
    }
    /**
     * Returns the first block after the reporting window of a given block number has ended.
     * @param {number} block_number
     * @returns {number}
     */
    static blockAfterReportingWindow(block_number) {
        const ret = wasm.policy_blockAfterReportingWindow(block_number);
        return ret >>> 0;
    }
    /**
     * Length of a batch including the macro block
     * @returns {number}
     */
    static get BLOCKS_PER_BATCH() {
        const ret = wasm.policy_blocks_per_batch();
        return ret >>> 0;
    }
    /**
     * Length of an epoch including the election block
     * @returns {number}
     */
    static get BLOCKS_PER_EPOCH() {
        const ret = wasm.policy_blocks_per_epoch();
        return ret >>> 0;
    }
    /**
     * Returns the number (height) of the next election macro block after a given block number (height).
     * @param {number} block_number
     * @returns {number}
     */
    static electionBlockAfter(block_number) {
        const ret = wasm.policy_electionBlockAfter(block_number);
        return ret >>> 0;
    }
    /**
     * Returns the block number (height) of the preceding election macro block before a given block number (height).
     * If the given block number is an election macro block, it returns the election macro block before it.
     * @param {number} block_number
     * @returns {number}
     */
    static electionBlockBefore(block_number) {
        const ret = wasm.policy_electionBlockBefore(block_number);
        return ret >>> 0;
    }
    /**
     * Returns the block number of the election macro block of the given epoch (which is always the last block).
     * If the index is out of bounds, None is returned
     * @param {number} epoch
     * @returns {number | undefined}
     */
    static electionBlockOf(epoch) {
        const ret = wasm.policy_electionBlockOf(epoch);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Returns the epoch number at a given block number (height).
     * @param {number} block_number
     * @returns {number}
     */
    static epochAt(block_number) {
        const ret = wasm.policy_epochAt(block_number);
        return ret >>> 0;
    }
    /**
     * Returns the epoch index at a given block number. The epoch index is the number of a block relative
     * to the epoch it is in. For example, the first block of any epoch always has an epoch index of 0.
     * @param {number} block_number
     * @returns {number}
     */
    static epochIndexAt(block_number) {
        const ret = wasm.policy_epochIndexAt(block_number);
        return ret >>> 0;
    }
    /**
     * Returns a boolean expressing if the batch at a given block number (height) is the first batch
     * of the epoch.
     * @param {number} block_number
     * @returns {boolean}
     */
    static firstBatchOfEpoch(block_number) {
        const ret = wasm.policy_firstBatchOfEpoch(block_number);
        return ret !== 0;
    }
    /**
     * Returns the block number of the first block of the given epoch (which is always a micro block).
     * If the index is out of bounds, None is returned
     * @param {number} epoch
     * @returns {number | undefined}
     */
    static firstBlockOf(epoch) {
        const ret = wasm.policy_firstBlockOf(epoch);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Returns the block number of the first block of the given batch (which is always a micro block).
     * If the index is out of bounds, None is returned
     * @param {number} batch
     * @returns {number | undefined}
     */
    static firstBlockOfBatch(batch) {
        const ret = wasm.policy_firstBlockOfBatch(batch);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Genesis block number
     * @returns {number}
     */
    static get GENESIS_BLOCK_NUMBER() {
        const ret = wasm.policy_genesis_block_number();
        return ret >>> 0;
    }
    /**
     * Returns a boolean expressing if the block at a given block number (height) is an election macro block.
     * @param {number} block_number
     * @returns {boolean}
     */
    static isElectionBlockAt(block_number) {
        const ret = wasm.policy_isElectionBlockAt(block_number);
        return ret !== 0;
    }
    /**
     * Returns a boolean expressing if the block at a given block number (height) is a macro block.
     * @param {number} block_number
     * @returns {boolean}
     */
    static isMacroBlockAt(block_number) {
        const ret = wasm.policy_isMacroBlockAt(block_number);
        return ret !== 0;
    }
    /**
     * Returns a boolean expressing if the block at a given block number (height) is a micro block.
     * @param {number} block_number
     * @returns {boolean}
     */
    static isMicroBlockAt(block_number) {
        const ret = wasm.policy_isMicroBlockAt(block_number);
        return ret !== 0;
    }
    /**
     * Returns the block height for the last block of the reporting window of a given block number.
     * Note: This window is meant for reporting malicious behaviour (aka `jailable` behaviour).
     * @param {number} block_number
     * @returns {number}
     */
    static lastBlockOfReportingWindow(block_number) {
        const ret = wasm.policy_lastBlockOfReportingWindow(block_number);
        return ret >>> 0;
    }
    /**
     * Returns the block number (height) of the last election macro block at a given block number (height).
     * If the given block number is an election macro block, then it returns that block number.
     * @param {number} block_number
     * @returns {number}
     */
    static lastElectionBlock(block_number) {
        const ret = wasm.policy_lastElectionBlock(block_number);
        return ret >>> 0;
    }
    /**
     * Returns the block number (height) of the last macro block at a given block number (height).
     * If the given block number is a macro block, then it returns that block number.
     * @param {number} block_number
     * @returns {number}
     */
    static lastMacroBlock(block_number) {
        const ret = wasm.policy_lastMacroBlock(block_number);
        return ret >>> 0;
    }
    /**
     * Returns the block number (height) of the next macro block after a given block number (height).
     * If the given block number is a macro block, it returns the macro block after it.
     * @param {number} block_number
     * @returns {number}
     */
    static macroBlockAfter(block_number) {
        const ret = wasm.policy_macroBlockAfter(block_number);
        return ret >>> 0;
    }
    /**
     * Returns the block number (height) of the preceding macro block before a given block number (height).
     * If the given block number is a macro block, it returns the macro block before it.
     * @param {number} block_number
     * @returns {number}
     */
    static macroBlockBefore(block_number) {
        const ret = wasm.policy_macroBlockBefore(block_number);
        return ret >>> 0;
    }
    /**
     * Returns the block number of the macro block (checkpoint or election) of the given batch (which
     * is always the last block).
     * If the index is out of bounds, None is returned
     * @param {number} batch
     * @returns {number | undefined}
     */
    static macroBlockOf(batch) {
        const ret = wasm.policy_macroBlockOf(batch);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * Maximum supported protocol version
     * @returns {number}
     */
    static get MAX_SUPPORTED_VERSION() {
        const ret = wasm.policy_max_supported_version();
        return ret;
    }
    /**
     * Maximum size of accounts trie chunks.
     * @returns {number}
     */
    static get STATE_CHUNKS_MAX_SIZE() {
        const ret = wasm.policy_state_chunks_max_size();
        return ret >>> 0;
    }
    /**
     * Returns the supply at a given time (as Unix time) in Lunas (1 NIM = 100,000 Lunas). It is
     * calculated using the following formula:
     * ```text
     * supply(t) = total_supply - (total_supply - genesis_supply) * supply_decay^t
     * ```
     * Where t is the time in milliseconds since the PoS genesis block and `genesis_supply` is the supply at
     * the genesis of the Nimiq 2.0 chain.
     * @param {bigint} genesis_supply
     * @param {bigint} genesis_time
     * @param {bigint} current_time
     * @returns {bigint}
     */
    static supplyAt(genesis_supply, genesis_time, current_time) {
        const ret = wasm.policy_supplyAt(genesis_supply, genesis_time, current_time);
        return BigInt.asUintN(64, ret);
    }
    /**
     * Number of batches a transaction is valid with Albatross consensus.
     * @returns {number}
     */
    static get TRANSACTION_VALIDITY_WINDOW() {
        const ret = wasm.policy_transaction_validity_window();
        return ret >>> 0;
    }
    /**
     * Number of blocks a transaction is valid with Albatross consensus.
     * @returns {number}
     */
    static get TRANSACTION_VALIDITY_WINDOW_BLOCKS() {
        const ret = wasm.policy_transaction_validity_window_blocks();
        return ret >>> 0;
    }
    /**
     * The optimal time in milliseconds between blocks (1s)
     * @returns {bigint}
     */
    static get BLOCK_SEPARATION_TIME() {
        const ret = wasm.policy_wasm_block_separation_time();
        return BigInt.asUintN(64, ret);
    }
    /**
     * The maximum size of the BLS public key cache.
     * @returns {number}
     */
    static get BLS_CACHE_MAX_CAPACITY() {
        const ret = wasm.policy_wasm_bls_cache_max_capacity();
        return ret >>> 0;
    }
    /**
     * This is the address for the coinbase. Note that this is not a real account, it is just the
     * address we use to denote that some coins originated from a coinbase event.
     * @returns {string}
     */
    static get COINBASE_ADDRESS() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.policy_wasm_coinbase_address();
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Calculates f+1 slots which is the minimum number of slots necessary to be guaranteed to have at
     * least one honest slots. That's because from a total of 3f+1 slots at most f will be malicious.
     * It is calculated as `ceil(SLOTS/3)` and we use the formula `ceil(x/y) = (x+y-1)/y` for the
     * ceiling division.
     * @returns {number}
     */
    static get F_PLUS_ONE() {
        const ret = wasm.policy_wasm_f_plus_one();
        return ret;
    }
    /**
     * Maximum size of history chunks.
     * 25 MB.
     * @returns {bigint}
     */
    static get HISTORY_CHUNKS_MAX_SIZE() {
        const ret = wasm.policy_wasm_history_chunks_max_size();
        return BigInt.asUintN(64, ret);
    }
    /**
     * The number of epochs a validator is put in jail for. The jailing only happens for severe offenses.
     * @returns {number}
     */
    static get JAIL_EPOCHS() {
        const ret = wasm.policy_wasm_jail_epochs();
        return ret >>> 0;
    }
    /**
     * The maximum allowed size, in bytes, for a micro block body.
     * @returns {number}
     */
    static get MAX_SIZE_MICRO_BODY() {
        const ret = wasm.policy_wasm_max_size_micro_body();
        return ret >>> 0;
    }
    /**
     * The minimum timeout in milliseconds for a validator to produce a block (4s)
     * @returns {bigint}
     */
    static get MIN_PRODUCER_TIMEOUT() {
        const ret = wasm.policy_wasm_min_block_producer_timeout();
        return BigInt.asUintN(64, ret);
    }
    /**
     * Minimum number of epochs that the ChainStore will store fully
     * @returns {number}
     */
    static get MIN_EPOCHS_STORED() {
        const ret = wasm.policy_wasm_min_epochs_stored();
        return ret >>> 0;
    }
    /**
     * The minimum rewards percentage that we allow
     * @returns {number}
     */
    static get MINIMUM_REWARDS_PERCENTAGE() {
        const ret = wasm.policy_wasm_minimum_rewards_percentage();
        return ret;
    }
    /**
     * Number of available validator slots. Note that a single validator may own several validator slots.
     * @returns {number}
     */
    static get SLOTS() {
        const ret = wasm.policy_wasm_slots();
        return ret;
    }
    /**
     * This is the address for the staking contract.
     * @returns {string}
     */
    static get STAKING_CONTRACT_ADDRESS() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.policy_wasm_staking_contract_address();
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * The maximum drift, in milliseconds, that is allowed between any block's timestamp and the node's
     * system time. We only care about drifting to the future.
     * @returns {bigint}
     */
    static get TIMESTAMP_MAX_DRIFT() {
        const ret = wasm.policy_wasm_timestamp_max_drift();
        return BigInt.asUintN(64, ret);
    }
    /**
     * Total supply in units.
     * @returns {bigint}
     */
    static get TOTAL_SUPPLY() {
        const ret = wasm.policy_wasm_total_supply();
        return BigInt.asUintN(64, ret);
    }
    /**
     * Calculates 2f+1 slots which is the minimum number of slots necessary to produce a macro block,
     * a skip block and other actions.
     * It is also the minimum number of slots necessary to be guaranteed to have a majority of honest
     * slots. That's because from a total of 3f+1 slots at most f will be malicious. If in a group of
     * 2f+1 slots we have f malicious ones (which is the worst case scenario), that still leaves us
     * with f+1 honest slots. Which is more than the f slots that are not in this group (which must all
     * be honest).
     * It is calculated as `ceil(SLOTS*2/3)` and we use the formula `ceil(x/y) = (x+y-1)/y` for the
     * ceiling division.
     * @returns {number}
     */
    static get TWO_F_PLUS_ONE() {
        const ret = wasm.policy_wasm_two_f_plus_one();
        return ret;
    }
    /**
     * The deposit necessary to create a validator in Lunas (1 NIM = 100,000 Lunas).
     * A validator is someone who actually participates in block production. They are akin to miners
     * in proof-of-work.
     * @returns {bigint}
     */
    static get VALIDATOR_DEPOSIT() {
        const ret = wasm.policy_wasm_validator_deposit();
        return BigInt.asUintN(64, ret);
    }
}
if (Symbol.dispose) Policy.prototype[Symbol.dispose] = Policy.prototype.free;

/**
 * The secret (private) part of an asymmetric key pair that is typically used to digitally sign or decrypt data.
 */
export class PrivateKey {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PrivateKey.prototype);
        obj.__wbg_ptr = ptr;
        PrivateKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PrivateKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_privatekey_free(ptr, 0);
    }
    /**
     * Deserializes a private key from a byte array.
     *
     * Throws when the byte array contains less than 32 bytes.
     * @param {Uint8Array} bytes
     * @returns {PrivateKey}
     */
    static deserialize(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.privatekey_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return PrivateKey.__wrap(ret[0]);
    }
    /**
     * Returns if this private key is equal to the other private key.
     * @param {PrivateKey} other
     * @returns {boolean}
     */
    equals(other) {
        _assertClass(other, PrivateKey);
        const ret = wasm.privatekey_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Parses a private key from its hex representation.
     *
     * Throws when the string is not valid hex format or when it represents less than 32 bytes.
     * @param {string} hex
     * @returns {PrivateKey}
     */
    static fromHex(hex) {
        const ptr0 = passStringToWasm0(hex, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.privatekey_fromHex(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return PrivateKey.__wrap(ret[0]);
    }
    /**
     * Generates a new private key from secure randomness.
     * @returns {PrivateKey}
     */
    static generate() {
        const ret = wasm.privatekey_generate();
        return PrivateKey.__wrap(ret);
    }
    /**
     * Creates a new private key from a byte array.
     *
     * Throws when the byte array is not exactly 32 bytes long.
     * @param {Uint8Array} bytes
     */
    constructor(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.privatekey_new(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        PrivateKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @returns {number}
     */
    static get PURPOSE_ID() {
        const ret = wasm.privatekey_purpose_id();
        return ret >>> 0;
    }
    /**
     * Serializes the private key to a byte array.
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.privatekey_serialize(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {number}
     */
    get serializedSize() {
        const ret = wasm.privatekey_serialized_size(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    static get SIZE() {
        const ret = wasm.privatekey_size();
        return ret >>> 0;
    }
    /**
     * Formats the private key into a hex string.
     * @returns {string}
     */
    toHex() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.privatekey_toHex(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) PrivateKey.prototype[Symbol.dispose] = PrivateKey.prototype.free;

/**
 * The non-secret (public) part of an asymmetric key pair that is typically used to digitally verify or encrypt data.
 */
export class PublicKey {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PublicKey.prototype);
        obj.__wbg_ptr = ptr;
        PublicKeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PublicKeyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_publickey_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.publickey___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Generates all possible combinations (sums) of delinearized public keys for a given number of signers.
     * @param {(PublicKey | string | Uint8Array)[]} keys
     * @param {number} num_signers
     * @returns {PublicKey[]}
     */
    static combinations(keys, num_signers) {
        const ret = wasm.publickey_combinations(keys, num_signers);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Compares this public key to the other public key.
     *
     * Returns -1 if this public key is smaller than the other public key, 0 if they are equal,
     * and 1 if this public key is larger than the other public key.
     * @param {PublicKey} other
     * @returns {number}
     */
    compare(other) {
        _assertClass(other, PublicKey);
        const ret = wasm.publickey_compare(this.__wbg_ptr, other.__wbg_ptr);
        return ret;
    }
    /**
     * Derives a public key from an existing private key.
     * @param {PrivateKey} private_key
     * @returns {PublicKey}
     */
    static derive(private_key) {
        _assertClass(private_key, PrivateKey);
        const ret = wasm.publickey_derive(private_key.__wbg_ptr);
        return PublicKey.__wrap(ret);
    }
    /**
     * Deserializes a public key from a byte array.
     *
     * Throws when the byte array contains less than 32 bytes.
     * @param {Uint8Array} bytes
     * @returns {PublicKey}
     */
    static deserialize(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.publickey_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return PublicKey.__wrap(ret[0]);
    }
    /**
     * Returns if this public key is equal to the other public key.
     * @param {PublicKey} other
     * @returns {boolean}
     */
    equals(other) {
        _assertClass(other, PublicKey);
        const ret = wasm.publickey_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Parses a public key from a {@link PublicKey} instance, a hex string representation, or a byte array.
     *
     * Throws when an PublicKey cannot be parsed from the argument.
     * @param {PublicKey | string | Uint8Array} key
     * @returns {PublicKey}
     */
    static fromAny(key) {
        const ret = wasm.publickey_fromAny(key);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return PublicKey.__wrap(ret[0]);
    }
    /**
     * Parses a public key from its hex representation.
     *
     * Throws when the string is not valid hex format or when it represents less than 32 bytes.
     * @param {string} hex
     * @returns {PublicKey}
     */
    static fromHex(hex) {
        const ptr0 = passStringToWasm0(hex, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.publickey_fromHex(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return PublicKey.__wrap(ret[0]);
    }
    /**
     * Deserializes a public key from its raw representation.
     * @param {Uint8Array} raw_bytes
     * @returns {PublicKey}
     */
    static fromRaw(raw_bytes) {
        const ptr0 = passArray8ToWasm0(raw_bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.publickey_fromRaw(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return PublicKey.__wrap(ret[0]);
    }
    /**
     * Deserializes a public key from its SPKI representation.
     * @param {Uint8Array} spki_bytes
     * @returns {PublicKey}
     */
    static fromSpki(spki_bytes) {
        const ptr0 = passArray8ToWasm0(spki_bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.publickey_fromSpki(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return PublicKey.__wrap(ret[0]);
    }
    /**
     * Creates a new public key from a byte array.
     *
     * Throws when the byte array is not exactly 32 bytes long.
     * @param {Uint8Array} bytes
     */
    constructor(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.publickey_new(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        PublicKeyFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Serializes the public key to a byte array.
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.publickey_serialize(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {number}
     */
    get serializedSize() {
        const ret = wasm.publickey_serialized_size(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    static get SIZE() {
        const ret = wasm.publickey_size();
        return ret >>> 0;
    }
    /**
     * Sums public keys into one combined public key.
     * @param {(PublicKey | string | Uint8Array)[]} keys
     * @returns {PublicKey}
     */
    static sum(keys) {
        const ret = wasm.publickey_sum(keys);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return PublicKey.__wrap(ret[0]);
    }
    /**
     * Gets the public key's address.
     * @returns {Address}
     */
    toAddress() {
        const ret = wasm.publickey_toAddress(this.__wbg_ptr);
        return Address.__wrap(ret);
    }
    /**
     * Formats the public key into a hex string.
     * @returns {string}
     */
    toHex() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.publickey_toHex(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Verifies that a signature is valid for this public key and the provided data.
     * @param {Signature} signature
     * @param {Uint8Array} data
     * @returns {boolean}
     */
    verify(signature, data) {
        _assertClass(signature, Signature);
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.publickey_verify(this.__wbg_ptr, signature.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
}
if (Symbol.dispose) PublicKey.prototype[Symbol.dispose] = PublicKey.prototype.free;

/**
 * A random secret that proves a {@link Commitment} for signing multisignature transactions.
 * It is supposed to be kept secret (similar to a private key).
 */
export class RandomSecret {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(RandomSecret.prototype);
        obj.__wbg_ptr = ptr;
        RandomSecretFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RandomSecretFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_randomsecret_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.randomsecret___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Deserializes a random secret from a byte array.
     *
     * Throws when the byte array contains less than 32 bytes.
     * @param {Uint8Array} bytes
     * @returns {RandomSecret}
     */
    static deserialize(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.randomsecret_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return RandomSecret.__wrap(ret[0]);
    }
    /**
     * Returns if this random secret is equal to the other random secret.
     * @param {RandomSecret} other
     * @returns {boolean}
     */
    equals(other) {
        _assertClass(other, RandomSecret);
        const ret = wasm.randomsecret_equals(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Parses a random secret from a {@link RandomSecret} instance, a hex string representation, or a byte array.
     *
     * Throws when a RandomSecret cannot be parsed from the argument.
     * @param {RandomSecret | string | Uint8Array} secret
     * @returns {RandomSecret}
     */
    static fromAny(secret) {
        const ret = wasm.randomsecret_fromAny(secret);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return RandomSecret.__wrap(ret[0]);
    }
    /**
     * Parses a random secret from its hex representation.
     *
     * Throws when the string is not valid hex format or when it represents less than 32 bytes.
     * @param {string} hex
     * @returns {RandomSecret}
     */
    static fromHex(hex) {
        const ptr0 = passStringToWasm0(hex, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.randomsecret_fromHex(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return RandomSecret.__wrap(ret[0]);
    }
    /**
     * Creates a new random secret from a byte array.
     *
     * Throws when the byte array is not exactly 32 bytes long.
     * @param {Uint8Array} bytes
     */
    constructor(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.randomsecret_new(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        RandomSecretFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Serializes the random secret to a byte array.
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.randomsecret_serialize(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * @returns {number}
     */
    get serializedSize() {
        const ret = wasm.randomsecret_serialized_size(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    static get SIZE() {
        const ret = wasm.randomsecret_size();
        return ret >>> 0;
    }
    /**
     * Formats the random secret into a hex string.
     * @returns {string}
     */
    toHex() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.randomsecret_toHex(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) RandomSecret.prototype[Symbol.dispose] = RandomSecret.prototype.free;

/**
 * An Ed25519 Signature represents a cryptographic proof that a private key signed some data.
 * It can be verified with the private key's public key.
 */
export class Signature {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Signature.prototype);
        obj.__wbg_ptr = ptr;
        SignatureFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SignatureFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_signature_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.signature___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Create a signature from a private key and its public key over byte data.
     * @param {PrivateKey} private_key
     * @param {PublicKey} public_key
     * @param {Uint8Array} data
     * @returns {Signature}
     */
    static create(private_key, public_key, data) {
        _assertClass(private_key, PrivateKey);
        _assertClass(public_key, PublicKey);
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.signature_create(private_key.__wbg_ptr, public_key.__wbg_ptr, ptr0, len0);
        return Signature.__wrap(ret);
    }
    /**
     * Deserializes an Ed25519 signature from a byte array.
     *
     * Throws when the byte array contains less than 64 bytes.
     * @param {Uint8Array} bytes
     * @returns {Signature}
     */
    static deserialize(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.signature_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Signature.__wrap(ret[0]);
    }
    /**
     * Parses an Ed25519 signature from its ASN.1 representation.
     * @param {Uint8Array} bytes
     * @returns {Signature}
     */
    static fromAsn1(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.signature_fromAsn1(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Signature.__wrap(ret[0]);
    }
    /**
     * Parses an Ed25519 signature from its hex representation.
     *
     * Throws when the string is not valid hex format or when it represents less than 64 bytes.
     * @param {string} hex
     * @returns {Signature}
     */
    static fromHex(hex) {
        const ptr0 = passStringToWasm0(hex, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.signature_fromHex(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Signature.__wrap(ret[0]);
    }
    /**
     * Serializes the signature to a byte array.
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.signature_serialize(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Formats the signature into a hex string.
     * @returns {string}
     */
    toHex() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.signature_toHex(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
if (Symbol.dispose) Signature.prototype[Symbol.dispose] = Signature.prototype.free;

/**
 * A signature proof represents a signature together with its public key and the public key's merkle path.
 * It is used as the proof for transactions.
 */
export class SignatureProof {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SignatureProof.prototype);
        obj.__wbg_ptr = ptr;
        SignatureProofFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SignatureProofFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_signatureproof_free(ptr, 0);
    }
    /**
     * Deserializes a signature proof from a byte array.
     * @param {Uint8Array} bytes
     * @returns {SignatureProof}
     */
    static deserialize(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.signatureproof_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return SignatureProof.__wrap(ret[0]);
    }
    /**
     * @returns {number}
     */
    static get ES256_SINGLE_SIG_SIZE() {
        const ret = wasm.signatureproof_es256_single_sig_size();
        return ret >>> 0;
    }
    /**
     * Checks if the signature proof is signed by the provided address.
     * @param {Address} sender
     * @returns {boolean}
     */
    isSignedBy(sender) {
        _assertClass(sender, Address);
        const ret = wasm.signatureproof_isSignedBy(this.__wbg_ptr, sender.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * The embedded merkle path.
     * @returns {MerklePath}
     */
    get merklePath() {
        const ret = wasm.signatureproof_merklePath(this.__wbg_ptr);
        return MerklePath.__wrap(ret);
    }
    /**
     * Creates a Ed25519/Schnorr signature proof for a multi-sig signature.
     * The public keys can also include ES256 keys.
     * @param {PublicKey} signer_key
     * @param {(PublicKey | ES256PublicKey)[]} public_keys
     * @param {Signature} signature
     * @returns {SignatureProof}
     */
    static multiSig(signer_key, public_keys, signature) {
        _assertClass(signer_key, PublicKey);
        _assertClass(signature, Signature);
        const ret = wasm.signatureproof_multiSig(signer_key.__wbg_ptr, public_keys, signature.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return SignatureProof.__wrap(ret[0]);
    }
    /**
     * The embedded public key.
     * @returns {PublicKey | ES256PublicKey}
     */
    get publicKey() {
        const ret = wasm.signatureproof_publicKey(this.__wbg_ptr);
        return ret;
    }
    /**
     * Serializes the proof to a byte array, e.g. for assigning it to a `transaction.proof` field.
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.signatureproof_serialize(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * The embedded signature.
     * @returns {Signature | ES256Signature}
     */
    get signature() {
        const ret = wasm.signatureproof_signature(this.__wbg_ptr);
        return ret;
    }
    /**
     * Creates a Ed25519/Schnorr signature proof for a single-sig signature.
     * @param {PublicKey} public_key
     * @param {Signature} signature
     * @returns {SignatureProof}
     */
    static singleSig(public_key, signature) {
        _assertClass(public_key, PublicKey);
        _assertClass(signature, Signature);
        const ret = wasm.signatureproof_singleSig(public_key.__wbg_ptr, signature.__wbg_ptr);
        return SignatureProof.__wrap(ret);
    }
    /**
     * @returns {number}
     */
    static get SINGLE_SIG_SIZE() {
        const ret = wasm.signatureproof_single_sig_size();
        return ret >>> 0;
    }
    /**
     * Creates a JSON-compatible plain object representing the signature proof.
     * @returns {PlainTransactionProof}
     */
    toPlain() {
        const ret = wasm.signatureproof_toPlain(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * Verifies the signature proof against the provided data.
     * @param {Uint8Array} data
     * @returns {boolean}
     */
    verify(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.signatureproof_verify(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * Creates a Webauthn signature proof for a multi-sig signature.
     * @param {PublicKey | ES256PublicKey} signer_key
     * @param {(PublicKey | ES256PublicKey)[]} public_keys
     * @param {Signature | ES256Signature} signature
     * @param {Uint8Array} authenticator_data
     * @param {Uint8Array} client_data_json
     * @returns {SignatureProof}
     */
    static webauthnMultiSig(signer_key, public_keys, signature, authenticator_data, client_data_json) {
        const ptr0 = passArray8ToWasm0(authenticator_data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(client_data_json, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.signatureproof_webauthnMultiSig(signer_key, public_keys, signature, ptr0, len0, ptr1, len1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return SignatureProof.__wrap(ret[0]);
    }
    /**
     * Creates a Webauthn signature proof for a single-sig signature.
     * @param {PublicKey | ES256PublicKey} public_key
     * @param {Signature | ES256Signature} signature
     * @param {Uint8Array} authenticator_data
     * @param {Uint8Array} client_data_json
     * @returns {SignatureProof}
     */
    static webauthnSingleSig(public_key, signature, authenticator_data, client_data_json) {
        const ptr0 = passArray8ToWasm0(authenticator_data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(client_data_json, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.signatureproof_webauthnSingleSig(public_key, signature, ptr0, len0, ptr1, len1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return SignatureProof.__wrap(ret[0]);
    }
}
if (Symbol.dispose) SignatureProof.prototype[Symbol.dispose] = SignatureProof.prototype.free;

/**
 * Utility class providing methods to parse Staking Contract transaction data and proofs.
 */
export class StakingContract {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        StakingContractFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_stakingcontract_free(ptr, 0);
    }
    /**
     * Parses the data of a Staking Contract incoming transaction into a plain object.
     * @param {Uint8Array} data
     * @returns {PlainTransactionRecipientData}
     */
    static dataToPlain(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.stakingcontract_dataToPlain(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * Parses the proof of a Staking Contract outgoing transaction into a plain object.
     * @param {Uint8Array} proof
     * @returns {PlainTransactionProof}
     */
    static proofToPlain(proof) {
        const ptr0 = passArray8ToWasm0(proof, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.stakingcontract_proofToPlain(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
}
if (Symbol.dispose) StakingContract.prototype[Symbol.dispose] = StakingContract.prototype.free;

/**
 * The StakingDataBuilder class provides helper methods to easily create staking transaction data.
 * To decode the data into plain objects, use `StakingContract.dataToPlain()`.
 */
export class StakingDataBuilder {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        StakingDataBuilderFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_stakingdatabuilder_free(ptr, 0);
    }
    /**
     * Creates staking transaction data for adding stake to a staker.
     *
     * Note: This data does not need to be signed seperately and can be used as-is.
     * @param {Address} staker_address
     * @returns {Uint8Array}
     */
    static addStake(staker_address) {
        _assertClass(staker_address, Address);
        const ret = wasm.stakingdatabuilder_addStake(staker_address.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Creates staking transaction data for creating a staker.
     *
     * Note: The created data contains an empty signature proof. To add a valid proof:
     * 1. Set the data on the transaction as `tx.data`
     * 2. Create a signature proof over the transaction with the staker's keypair
     * 3. Use `StakingDataBuilder.setProof(tx.data, proof)` to set the created proof on the staking data
     * 4. Set the updated staking data back on the transaction as `tx.data`
     * @param {Address | undefined} delegation
     * @returns {Uint8Array}
     */
    static createStaker(delegation) {
        const ret = wasm.stakingdatabuilder_createStaker(delegation);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Creates staking transaction data for removing stake from the staking contract.
     *
     * Attention: This is used as `senderData` in a transaction with the staking contract as the sender and the staker as signer.
     * @returns {Uint8Array}
     */
    static removeStake() {
        const ret = wasm.stakingdatabuilder_removeStake();
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Creates staking transaction data for retiring stake.
     *
     * Note: The created data contains an empty signature proof. To add a valid proof:
     * 1. Set the data on the transaction as `tx.data`
     * 2. Create a signature proof over the transaction with the staker's keypair
     * 3. Use `StakingDataBuilder.setProof(tx.data, proof)` to set the created proof on the staking data
     * 4. Set the updated staking data back on the transaction as `tx.data`
     *
     * Throws when the number given for `retire_stake` does not fit within a Coin value.
     * @param {bigint} retire_stake
     * @returns {Uint8Array}
     */
    static retireStake(retire_stake) {
        const ret = wasm.stakingdatabuilder_retireStake(retire_stake);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Creates staking transaction data for setting the active stake of a staker.
     *
     * Note: The created data contains an empty signature proof. To add a valid proof:
     * 1. Set the data on the transaction as `tx.data`
     * 2. Create a signature proof over the transaction with the staker's keypair
     * 3. Use `StakingDataBuilder.setProof(tx.data, proof)` to set the created proof on the staking data
     * 4. Set the updated staking data back on the transaction as `tx.data`
     *
     * Throws when the number given for `new_active_balance` does not fit within a Coin value.
     * @param {bigint} new_active_balance
     * @returns {Uint8Array}
     */
    static setActiveStake(new_active_balance) {
        const ret = wasm.stakingdatabuilder_setActiveStake(new_active_balance);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Sets the signature proof on the provided staking transaction data.
     * @param {Uint8Array} data
     * @param {SignatureProof} proof
     * @returns {Uint8Array}
     */
    static setProof(data, proof) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(proof, SignatureProof);
        const ret = wasm.stakingdatabuilder_setProof(ptr0, len0, proof.__wbg_ptr);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v2 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v2;
    }
    /**
     * Creates staking transaction data for updating a staker.
     *
     * Note: The created data contains an empty signature proof. To add a valid proof:
     * 1. Set the data on the transaction as `tx.data`
     * 2. Create a signature proof over the transaction with the staker's keypair
     * 3. Use `StakingDataBuilder.setProof(tx.data, proof)` to set the created proof on the staking data
     * 4. Set the updated staking data back on the transaction as `tx.data`
     * @param {Address | undefined} new_delegation
     * @param {boolean} reactivate_all_stake
     * @returns {Uint8Array}
     */
    static updateStaker(new_delegation, reactivate_all_stake) {
        const ret = wasm.stakingdatabuilder_updateStaker(new_delegation, reactivate_all_stake);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
}
if (Symbol.dispose) StakingDataBuilder.prototype[Symbol.dispose] = StakingDataBuilder.prototype.free;

/**
 * Transactions describe a transfer of value, usually from the sender to the recipient.
 * However, transactions can also have no value, when they are used to _signal_ a change in the staking contract.
 *
 * Transactions can be used to create contracts, such as vesting contracts and HTLCs.
 *
 * Transactions require a valid signature proof over their serialized content.
 * Furthermore, transactions are only valid for 2 hours after their validity-start block height.
 */
export class Transaction {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Transaction.prototype);
        obj.__wbg_ptr = ptr;
        TransactionFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransactionFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transaction_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    __getClassname() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.transaction___getClassname(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * The transaction's data as a byte array.
     * @returns {Uint8Array}
     */
    get data() {
        const ret = wasm.transaction_data(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Deserializes a transaction from a byte array.
     * @param {Uint8Array} bytes
     * @returns {Transaction}
     */
    static deserialize(bytes) {
        const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_deserialize(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Transaction.__wrap(ret[0]);
    }
    /**
     * The transaction's fee in luna (NIM's smallest unit).
     * @returns {bigint}
     */
    get fee() {
        const ret = wasm.transaction_fee(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * The transaction's fee per byte in luna (NIM's smallest unit).
     * @returns {number}
     */
    get feePerByte() {
        const ret = wasm.transaction_feePerByte(this.__wbg_ptr);
        return ret;
    }
    /**
     * The transaction's flags: `0b1` = contract creation, `0b10` = signaling.
     * Bit patterns outside the known variants collapse to `None`.
     * Inspect `toPlain().flags` for the raw value.
     * @returns {TransactionFlag}
     */
    get flags() {
        const ret = wasm.transaction_flags(this.__wbg_ptr);
        return ret;
    }
    /**
     * The transaction's {@link TransactionFormat}.
     * @returns {TransactionFormat}
     */
    get format() {
        const ret = wasm.transaction_format(this.__wbg_ptr);
        return ret;
    }
    /**
     * Parses a transaction from a {@link Transaction} instance, a plain object, a hex string
     * representation, or a byte array.
     *
     * Throws when a transaction cannot be parsed from the argument.
     * @param {Transaction | PlainTransaction | string | Uint8Array} tx
     * @returns {Transaction}
     */
    static fromAny(tx) {
        const ret = wasm.transaction_fromAny(tx);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Transaction.__wrap(ret[0]);
    }
    /**
     * Parses a transaction from a plain object.
     *
     * Throws when a transaction cannot be parsed from the argument.
     * @param {PlainTransaction} plain
     * @returns {Transaction}
     */
    static fromPlain(plain) {
        const ret = wasm.transaction_fromPlain(plain);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Transaction.__wrap(ret[0]);
    }
    /**
     * Returns the address of the contract that is created with this transaction.
     * @returns {Address}
     */
    getContractCreationAddress() {
        const ret = wasm.transaction_getContractCreationAddress(this.__wbg_ptr);
        return Address.__wrap(ret);
    }
    /**
     * Computes the transaction's hash, which is used as its unique identifier on the blockchain.
     * @returns {string}
     */
    hash() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.transaction_hash(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Tests if the transaction is valid at the specified block height.
     * @param {number} block_height
     * @returns {boolean}
     */
    isValidAt(block_height) {
        const ret = wasm.transaction_isValidAt(this.__wbg_ptr, block_height);
        return ret !== 0;
    }
    /**
     * The transaction's network ID.
     * @returns {number}
     */
    get networkId() {
        const ret = wasm.transaction_networkId(this.__wbg_ptr);
        return ret;
    }
    /**
     * Creates a new unsigned transaction that transfers `value` amount of luna (NIM's smallest unit)
     * from the sender to the recipient, where both sender and recipient can be any account type,
     * and custom extra data can be added to the transaction.
     *
     * ### Basic transactions
     * If both the sender and recipient types are omitted or `0` and both data and flags are empty,
     * a smaller basic transaction is created.
     *
     * ### Extended transactions
     * If no flags are given, but sender type is not basic (`0`) or data is set, an extended
     * transaction is created.
     *
     * ### Contract creation transactions
     * To create a new vesting or HTLC contract, set `flags` to `0b1` and specify the contract
     * type as the `recipient_type`: `1` for vesting, `2` for HTLC. The `data` bytes must have
     * the correct format of contract creation data for the respective contract type.
     *
     * ### Signaling transactions
     * To interact with the staking contract, signaling transaction are often used to not
     * transfer any value, but to simply _signal_ a state change instead, such as changing one's
     * delegation from one validator to another. To create such a transaction, set `flags` to `
     * 0b10` and populate the `data` bytes accordingly.
     *
     * The returned transaction is not yet signed. You can sign it e.g. with `tx.sign(keyPair)`.
     *
     * Throws when an account type is unknown, the numbers given for value and fee do not fit
     * within a u64 or the networkId is unknown. Also throws when no data or recipient type is
     * given for contract creation transactions, or no data is given for signaling transactions.
     * @param {Address} sender
     * @param {number | null | undefined} sender_type
     * @param {Uint8Array | null | undefined} sender_data
     * @param {Address} recipient
     * @param {number | null | undefined} recipient_type
     * @param {Uint8Array | null | undefined} recipient_data
     * @param {bigint} value
     * @param {bigint} fee
     * @param {number | null | undefined} flags
     * @param {number} validity_start_height
     * @param {number} network_id
     */
    constructor(sender, sender_type, sender_data, recipient, recipient_type, recipient_data, value, fee, flags, validity_start_height, network_id) {
        _assertClass(sender, Address);
        var ptr0 = isLikeNone(sender_data) ? 0 : passArray8ToWasm0(sender_data, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        _assertClass(recipient, Address);
        var ptr1 = isLikeNone(recipient_data) ? 0 : passArray8ToWasm0(recipient_data, wasm.__wbindgen_malloc);
        var len1 = WASM_VECTOR_LEN;
        const ret = wasm.transaction_new(sender.__wbg_ptr, isLikeNone(sender_type) ? 0xFFFFFF : sender_type, ptr0, len0, recipient.__wbg_ptr, isLikeNone(recipient_type) ? 0xFFFFFF : recipient_type, ptr1, len1, value, fee, isLikeNone(flags) ? 0xFFFFFF : flags, validity_start_height, network_id);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        TransactionFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * The transaction's signature proof as a byte array.
     * @returns {Uint8Array}
     */
    get proof() {
        const ret = wasm.transaction_proof(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * The transaction's recipient address.
     * @returns {Address}
     */
    get recipient() {
        const ret = wasm.transaction_recipient(this.__wbg_ptr);
        return Address.__wrap(ret);
    }
    /**
     * The transaction's recipient {@link AccountType}.
     * @returns {AccountType}
     */
    get recipientType() {
        const ret = wasm.transaction_recipientType(this.__wbg_ptr);
        return ret;
    }
    /**
     * The transaction's sender address.
     * @returns {Address}
     */
    get sender() {
        const ret = wasm.transaction_sender(this.__wbg_ptr);
        return Address.__wrap(ret);
    }
    /**
     * The transaction's sender data as a byte array.
     * @returns {Uint8Array}
     */
    get senderData() {
        const ret = wasm.transaction_senderData(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * The transaction's sender {@link AccountType}.
     * @returns {AccountType}
     */
    get senderType() {
        const ret = wasm.transaction_senderType(this.__wbg_ptr);
        return ret;
    }
    /**
     * Serializes the transaction to a byte array.
     * @returns {Uint8Array}
     */
    serialize() {
        const ret = wasm.transaction_serialize(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Serializes the transaction's content to be used for creating its signature.
     * @returns {Uint8Array}
     */
    serializeContent() {
        const ret = wasm.transaction_serializeContent(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * The transaction's byte size.
     * @returns {number}
     */
    get serializedSize() {
        const ret = wasm.transaction_serializedSize(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Set the transaction's data
     * @param {Uint8Array} data
     */
    set data(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.transaction_set_data(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Set the transaction's signature proof.
     * @param {Uint8Array} proof
     */
    set proof(proof) {
        const ptr0 = passArray8ToWasm0(proof, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.transaction_set_proof(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Signs the transaction with the provided key pair. Automatically determines the format
     * of the signature proof required for the transaction.
     *
     * For transactions to the staking contract (in-staking transactions), you can optionally provide
     * an inner key pair that represents the staker or validator. This way the staker/validator and sender
     * of a transaction can be different key pairs (addresses). If no inner key pair is provided, the outer
     * key pair is used for both signatures.
     *
     * ### Limitations
     * - HTLC redemption is not supported and will throw.
     * @param {KeyPair} key_pair
     * @param {KeyPair | undefined} inner_key_pair
     */
    sign(key_pair, inner_key_pair) {
        _assertClass(key_pair, KeyPair);
        const ret = wasm.transaction_sign(this.__wbg_ptr, key_pair.__wbg_ptr, inner_key_pair);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * Serializes the transaction into a HEX string.
     * @returns {string}
     */
    toHex() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.transaction_toHex(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Creates a JSON-compatible plain object representing the transaction.
     * @param {number | null} [genesis_block_number]
     * @param {bigint | null} [genesis_timestamp]
     * @returns {PlainTransaction}
     */
    toPlain(genesis_block_number, genesis_timestamp) {
        const ret = wasm.transaction_toPlain(this.__wbg_ptr, isLikeNone(genesis_block_number) ? 0x100000001 : (genesis_block_number) >>> 0, !isLikeNone(genesis_timestamp), isLikeNone(genesis_timestamp) ? BigInt(0) : genesis_timestamp);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * The transaction's validity-start height. The transaction is valid for 2 hours after this block height.
     * @returns {number}
     */
    get validityStartHeight() {
        const ret = wasm.transaction_validityStartHeight(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * The transaction's value in luna (NIM's smallest unit).
     * @returns {bigint}
     */
    get value() {
        const ret = wasm.transaction_value(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
     * Verifies that a transaction has valid properties and a valid signature proof for the
     * provided `protocol_version`.
     * Optionally checks if the transaction is valid on the provided network.
     *
     * **Throws with any transaction validity error.** Returns without exception if the transaction is valid.
     *
     * A `protocol_version` of `0` is accepted for backwards-compatible pre-upgrade validation.
     * Throws when the given networkId is unknown.
     * @param {number} protocol_version
     * @param {number | null} [network_id]
     */
    verify(protocol_version, network_id) {
        const ret = wasm.transaction_verify(this.__wbg_ptr, protocol_version, isLikeNone(network_id) ? 0xFFFFFF : network_id);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
}
if (Symbol.dispose) Transaction.prototype[Symbol.dispose] = Transaction.prototype.free;

/**
 * The TransactionBuilder class provides helper methods to easily create standard types of transactions.
 * It can only be instantiated from a Client with `client.transactionBuilder()`.
 */
export class TransactionBuilder {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TransactionBuilderFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transactionbuilder_free(ptr, 0);
    }
    /**
     * Adds stake to a staker in the staking contract and transfers `value` amount of luna (NIM's smallest unit)
     * from the sender account to this staker.
     *
     * The returned transaction is not yet signed. You can sign it e.g. with `tx.sign(keyPair)`.
     *
     * Throws when the numbers given for value and fee do not fit within a u64 or the networkId is unknown.
     * @param {Address} sender
     * @param {Address} staker_address
     * @param {bigint} value
     * @param {bigint | null | undefined} fee
     * @param {number} validity_start_height
     * @param {number} network_id
     * @returns {Transaction}
     */
    static newAddStake(sender, staker_address, value, fee, validity_start_height, network_id) {
        _assertClass(sender, Address);
        _assertClass(staker_address, Address);
        const ret = wasm.transactionbuilder_newAddStake(sender.__wbg_ptr, staker_address.__wbg_ptr, value, !isLikeNone(fee), isLikeNone(fee) ? BigInt(0) : fee, validity_start_height, network_id);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Transaction.__wrap(ret[0]);
    }
    /**
     * Creates a basic transaction that transfers `value` amount of luna (NIM's smallest unit) from the
     * sender to the recipient.
     *
     * The returned transaction is not yet signed. You can sign it e.g. with `tx.sign(keyPair)`.
     *
     * Throws when the numbers given for value and fee do not fit within a u64 or the networkId is unknown.
     * @param {Address} sender
     * @param {Address} recipient
     * @param {bigint} value
     * @param {bigint | null | undefined} fee
     * @param {number} validity_start_height
     * @param {number} network_id
     * @returns {Transaction}
     */
    static newBasic(sender, recipient, value, fee, validity_start_height, network_id) {
        _assertClass(sender, Address);
        _assertClass(recipient, Address);
        const ret = wasm.transactionbuilder_newBasic(sender.__wbg_ptr, recipient.__wbg_ptr, value, !isLikeNone(fee), isLikeNone(fee) ? BigInt(0) : fee, validity_start_height, network_id);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Transaction.__wrap(ret[0]);
    }
    /**
     * Creates a basic transaction that transfers `value` amount of luna (NIM's smallest unit) from the
     * sender to the recipient. It can include arbitrary `data`, up to 64 bytes.
     *
     * The returned transaction is not yet signed. You can sign it e.g. with `tx.sign(keyPair)`.
     *
     * Throws when the numbers given for value and fee do not fit within a u64 or the networkId is unknown.
     * @param {Address} sender
     * @param {Address} recipient
     * @param {Uint8Array} data
     * @param {bigint} value
     * @param {bigint | null | undefined} fee
     * @param {number} validity_start_height
     * @param {number} network_id
     * @returns {Transaction}
     */
    static newBasicWithData(sender, recipient, data, value, fee, validity_start_height, network_id) {
        _assertClass(sender, Address);
        _assertClass(recipient, Address);
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.transactionbuilder_newBasicWithData(sender.__wbg_ptr, recipient.__wbg_ptr, ptr0, len0, value, !isLikeNone(fee), isLikeNone(fee) ? BigInt(0) : fee, validity_start_height, network_id);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Transaction.__wrap(ret[0]);
    }
    /**
     * Creates a new staker in the staking contract and transfers `value` amount of luna (NIM's smallest unit)
     * from the sender account to this new staker.
     *
     * The returned transaction is not yet signed. You can sign it e.g. with `tx.sign(keyPair)`.
     *
     * Throws when the numbers given for value and fee do not fit within a u64 or the networkId is unknown.
     * @param {Address} sender
     * @param {Address | undefined} delegation
     * @param {bigint} value
     * @param {bigint | null | undefined} fee
     * @param {number} validity_start_height
     * @param {number} network_id
     * @returns {Transaction}
     */
    static newCreateStaker(sender, delegation, value, fee, validity_start_height, network_id) {
        _assertClass(sender, Address);
        const ret = wasm.transactionbuilder_newCreateStaker(sender.__wbg_ptr, delegation, value, !isLikeNone(fee), isLikeNone(fee) ? BigInt(0) : fee, validity_start_height, network_id);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Transaction.__wrap(ret[0]);
    }
    /**
     * Registers a new validator in the staking contract.
     *
     * The returned transaction is not yet signed. You can sign it e.g. with `tx.sign(keyPair)`.
     *
     * Throws when the fee does not fit within a u64 or the `networkId` is unknown.
     * @param {Address} sender
     * @param {Address} reward_address
     * @param {PublicKey} signing_key
     * @param {BLSKeyPair} voting_key_pair
     * @param {string | null | undefined} signal_data
     * @param {bigint | null | undefined} fee
     * @param {number} validity_start_height
     * @param {number} network_id
     * @returns {Transaction}
     */
    static newCreateValidator(sender, reward_address, signing_key, voting_key_pair, signal_data, fee, validity_start_height, network_id) {
        _assertClass(sender, Address);
        _assertClass(reward_address, Address);
        _assertClass(signing_key, PublicKey);
        _assertClass(voting_key_pair, BLSKeyPair);
        var ptr0 = isLikeNone(signal_data) ? 0 : passStringToWasm0(signal_data, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.transactionbuilder_newCreateValidator(sender.__wbg_ptr, reward_address.__wbg_ptr, signing_key.__wbg_ptr, voting_key_pair.__wbg_ptr, ptr0, len0, !isLikeNone(fee), isLikeNone(fee) ? BigInt(0) : fee, validity_start_height, network_id);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Transaction.__wrap(ret[0]);
    }
    /**
     * Deactivates a validator in the staking contract.
     *
     * The returned transaction is not yet signed. You can sign it e.g. with `tx.sign(keyPair)`.
     *
     * Throws when the fee does not fit within a u64 or the `networkId` is unknown.
     * @param {Address} sender
     * @param {Address} validator
     * @param {bigint | null | undefined} fee
     * @param {number} validity_start_height
     * @param {number} network_id
     * @returns {Transaction}
     */
    static newDeactivateValidator(sender, validator, fee, validity_start_height, network_id) {
        _assertClass(sender, Address);
        _assertClass(validator, Address);
        const ret = wasm.transactionbuilder_newDeactivateValidator(sender.__wbg_ptr, validator.__wbg_ptr, !isLikeNone(fee), isLikeNone(fee) ? BigInt(0) : fee, validity_start_height, network_id);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Transaction.__wrap(ret[0]);
    }
    /**
     * Deleted a validator the staking contract. The deposit is returned to the Sender
     *
     * The returned transaction is not yet signed. You can sign it e.g. with `tx.sign(keyPair)`.
     *
     * Throws when the fee does not fit within a u64 or the `networkId` is unknown.
     * @param {Address} sender
     * @param {bigint | null | undefined} fee
     * @param {number} validity_start_height
     * @param {number} network_id
     * @returns {Transaction}
     */
    static newDeleteValidator(sender, fee, validity_start_height, network_id) {
        _assertClass(sender, Address);
        const ret = wasm.transactionbuilder_newDeleteValidator(sender.__wbg_ptr, !isLikeNone(fee), isLikeNone(fee) ? BigInt(0) : fee, validity_start_height, network_id);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Transaction.__wrap(ret[0]);
    }
    /**
     * Removes stake from the staking contract and transfers `value` amount of luna (NIM's smallest unit)
     * from the staker to the recipient.
     *
     * The returned transaction is not yet signed. You can sign it e.g. with `tx.sign(keyPair)`.
     *
     * Throws when the numbers given for value and fee do not fit within a u64 or the networkId is unknown.
     * @param {Address} recipient
     * @param {bigint} value
     * @param {bigint | null | undefined} fee
     * @param {number} validity_start_height
     * @param {number} network_id
     * @returns {Transaction}
     */
    static newRemoveStake(recipient, value, fee, validity_start_height, network_id) {
        _assertClass(recipient, Address);
        const ret = wasm.transactionbuilder_newRemoveStake(recipient.__wbg_ptr, value, !isLikeNone(fee), isLikeNone(fee) ? BigInt(0) : fee, validity_start_height, network_id);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Transaction.__wrap(ret[0]);
    }
    /**
     * Retires a portion of the inactive stake balance of the staker. This is a
     * signaling transaction and as such does not transfer any value.
     *
     * The returned transaction is not yet signed. You can sign it e.g. with `tx.sign(keyPair)`.
     *
     * Throws when the numbers given for fee and `retire_stake` do not fit within a u64 or the networkId is unknown.
     * @param {Address} sender
     * @param {bigint} retire_stake
     * @param {bigint | null | undefined} fee
     * @param {number} validity_start_height
     * @param {number} network_id
     * @returns {Transaction}
     */
    static newRetireStake(sender, retire_stake, fee, validity_start_height, network_id) {
        _assertClass(sender, Address);
        const ret = wasm.transactionbuilder_newRetireStake(sender.__wbg_ptr, retire_stake, !isLikeNone(fee), isLikeNone(fee) ? BigInt(0) : fee, validity_start_height, network_id);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Transaction.__wrap(ret[0]);
    }
    /**
     * Retires a validator in the staking contract.
     *
     * The returned transaction is not yet signed. You can sign it e.g. with `tx.sign(keyPair)`.
     *
     * Throws when the fee does not fit within a u64 or the `networkId` is unknown.
     * @param {Address} sender
     * @param {bigint | null | undefined} fee
     * @param {number} validity_start_height
     * @param {number} network_id
     * @returns {Transaction}
     */
    static newRetireValidator(sender, fee, validity_start_height, network_id) {
        _assertClass(sender, Address);
        const ret = wasm.transactionbuilder_newRetireValidator(sender.__wbg_ptr, !isLikeNone(fee), isLikeNone(fee) ? BigInt(0) : fee, validity_start_height, network_id);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Transaction.__wrap(ret[0]);
    }
    /**
     * Sets the active stake balance of the staker. This is a
     * signaling transaction and as such does not transfer any value.
     *
     * The returned transaction is not yet signed. You can sign it e.g. with `tx.sign(keyPair)`.
     *
     * Throws when the numbers given for fee and `new_active_balance` do not fit within a u64 or the networkId is unknown.
     * @param {Address} sender
     * @param {bigint} new_active_balance
     * @param {bigint | null | undefined} fee
     * @param {number} validity_start_height
     * @param {number} network_id
     * @returns {Transaction}
     */
    static newSetActiveStake(sender, new_active_balance, fee, validity_start_height, network_id) {
        _assertClass(sender, Address);
        const ret = wasm.transactionbuilder_newSetActiveStake(sender.__wbg_ptr, new_active_balance, !isLikeNone(fee), isLikeNone(fee) ? BigInt(0) : fee, validity_start_height, network_id);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Transaction.__wrap(ret[0]);
    }
    /**
     * Updates a staker in the staking contract to stake for a different validator. This is a
     * signaling transaction and as such does not transfer any value.
     *
     * The returned transaction is not yet signed. You can sign it e.g. with `tx.sign(keyPair)`.
     *
     * Throws when the number given for fee does not fit within a u64 or the networkId is unknown.
     * @param {Address} sender
     * @param {Address | undefined} new_delegation
     * @param {boolean} reactivate_all_stake
     * @param {bigint | null | undefined} fee
     * @param {number} validity_start_height
     * @param {number} network_id
     * @returns {Transaction}
     */
    static newUpdateStaker(sender, new_delegation, reactivate_all_stake, fee, validity_start_height, network_id) {
        _assertClass(sender, Address);
        const ret = wasm.transactionbuilder_newUpdateStaker(sender.__wbg_ptr, new_delegation, reactivate_all_stake, !isLikeNone(fee), isLikeNone(fee) ? BigInt(0) : fee, validity_start_height, network_id);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Transaction.__wrap(ret[0]);
    }
    /**
     * Updates parameters of a validator in the staking contract.
     *
     * The returned transaction is not yet signed. You can sign it e.g. with `tx.sign(keyPair)`.
     *
     * Throws when the fee does not fit within a u64 or the `networkId` is unknown.
     * @param {Address} sender
     * @param {Address | null | undefined} reward_address
     * @param {PublicKey | null | undefined} signing_key
     * @param {BLSKeyPair | null | undefined} voting_key_pair
     * @param {string | null | undefined} signal_data
     * @param {bigint | null | undefined} fee
     * @param {number} validity_start_height
     * @param {number} network_id
     * @returns {Transaction}
     */
    static newUpdateValidator(sender, reward_address, signing_key, voting_key_pair, signal_data, fee, validity_start_height, network_id) {
        _assertClass(sender, Address);
        let ptr0 = 0;
        if (!isLikeNone(reward_address)) {
            _assertClass(reward_address, Address);
            ptr0 = reward_address.__destroy_into_raw();
        }
        let ptr1 = 0;
        if (!isLikeNone(signing_key)) {
            _assertClass(signing_key, PublicKey);
            ptr1 = signing_key.__destroy_into_raw();
        }
        let ptr2 = 0;
        if (!isLikeNone(voting_key_pair)) {
            _assertClass(voting_key_pair, BLSKeyPair);
            ptr2 = voting_key_pair.__destroy_into_raw();
        }
        var ptr3 = isLikeNone(signal_data) ? 0 : passStringToWasm0(signal_data, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        const ret = wasm.transactionbuilder_newUpdateValidator(sender.__wbg_ptr, ptr0, ptr1, ptr2, ptr3, len3, !isLikeNone(fee), isLikeNone(fee) ? BigInt(0) : fee, validity_start_height, network_id);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return Transaction.__wrap(ret[0]);
    }
}
if (Symbol.dispose) TransactionBuilder.prototype[Symbol.dispose] = TransactionBuilder.prototype.free;

/**
 * A transaction flag signals a special purpose of the transaction. `ContractCreation` must be set
 * to create new vesting contracts or HTLCs. `Signaling` must be set to interact with the staking
 * contract for non-value transactions. All other transactions' flag is set to `None`.
 * @enum {0 | 1 | 2}
 */
export const TransactionFlag = Object.freeze({
    None: 0, "0": "None",
    ContractCreation: 1, "1": "ContractCreation",
    Signaling: 2, "2": "Signaling",
});

/**
 * @enum {0 | 1}
 */
export const TransactionFormat = Object.freeze({
    Basic: 0, "0": "Basic",
    Extended: 1, "1": "Extended",
});

/**
 * Utility class providing methods to parse Vesting Contract transaction data and proofs.
 */
export class VestingContract {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VestingContractFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_vestingcontract_free(ptr, 0);
    }
    /**
     * Parses the data of a Vesting Contract creation transaction into a plain object.
     * @param {Uint8Array} data
     * @param {bigint} tx_value
     * @returns {PlainTransactionRecipientData}
     */
    static dataToPlain(data, tx_value) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.vestingcontract_dataToPlain(ptr0, len0, tx_value);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * Parses the proof of a Vesting Contract claiming transaction into a plain object.
     * @param {Uint8Array} proof
     * @returns {PlainTransactionProof}
     */
    static proofToPlain(proof) {
        const ptr0 = passArray8ToWasm0(proof, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.vestingcontract_proofToPlain(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
}
if (Symbol.dispose) VestingContract.prototype[Symbol.dispose] = VestingContract.prototype.free;
function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg_Error_960c155d3d49e4c2: function(arg0, arg1) {
            const ret = Error(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_Number_32bf70a599af1d4b: function(arg0) {
            const ret = Number(arg0);
            return ret;
        },
        __wbg_String_8564e559799eccda: function(arg0, arg1) {
            const ret = String(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_bigint_get_as_i64_3d3aba5d616c6a51: function(arg0, arg1) {
            const v = arg1;
            const ret = typeof(v) === 'bigint' ? v : undefined;
            getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_boolean_get_6ea149f0a8dcc5ff: function(arg0) {
            const v = arg0;
            const ret = typeof(v) === 'boolean' ? v : undefined;
            return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
        },
        __wbg___wbindgen_debug_string_ab4b34d23d6778bd: function(arg0, arg1) {
            const ret = debugString(arg1);
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_in_a5d8b22e52b24dd1: function(arg0, arg1) {
            const ret = arg0 in arg1;
            return ret;
        },
        __wbg___wbindgen_is_bigint_ec25c7f91b4d9e93: function(arg0) {
            const ret = typeof(arg0) === 'bigint';
            return ret;
        },
        __wbg___wbindgen_is_function_3baa9db1a987f47d: function(arg0) {
            const ret = typeof(arg0) === 'function';
            return ret;
        },
        __wbg___wbindgen_is_object_63322ec0cd6ea4ef: function(arg0) {
            const val = arg0;
            const ret = typeof(val) === 'object' && val !== null;
            return ret;
        },
        __wbg___wbindgen_is_string_6df3bf7ef1164ed3: function(arg0) {
            const ret = typeof(arg0) === 'string';
            return ret;
        },
        __wbg___wbindgen_is_undefined_29a43b4d42920abd: function(arg0) {
            const ret = arg0 === undefined;
            return ret;
        },
        __wbg___wbindgen_jsval_eq_d3465d8a07697228: function(arg0, arg1) {
            const ret = arg0 === arg1;
            return ret;
        },
        __wbg___wbindgen_jsval_loose_eq_cac3565e89b4134c: function(arg0, arg1) {
            const ret = arg0 == arg1;
            return ret;
        },
        __wbg___wbindgen_number_get_c7f42aed0525c451: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'number' ? obj : undefined;
            getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
        },
        __wbg___wbindgen_string_get_7ed5322991caaec5: function(arg0, arg1) {
            const obj = arg1;
            const ret = typeof(obj) === 'string' ? obj : undefined;
            var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg___wbindgen_throw_6b64449b9b9ed33c: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg_apply_329b2a440415c2e6: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = Reflect.apply(arg0, arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_call_14b169f759b26747: function() { return handleError(function (arg0, arg1) {
            const ret = arg0.call(arg1);
            return ret;
        }, arguments); },
        __wbg_done_9158f7cc8751ba32: function(arg0) {
            const ret = arg0.done;
            return ret;
        },
        __wbg_entries_e0b73aa8571ddb56: function(arg0) {
            const ret = Object.entries(arg0);
            return ret;
        },
        __wbg_es256publickey_new: function(arg0) {
            const ret = ES256PublicKey.__wrap(arg0);
            return ret;
        },
        __wbg_es256signature_new: function(arg0) {
            const ret = ES256Signature.__wrap(arg0);
            return ret;
        },
        __wbg_getRandomValues_cc7f052a444bb2ce: function() { return handleError(function (arg0, arg1) {
            globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
        }, arguments); },
        __wbg_get_1affdbdd5573b16a: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_get_6011fa3a58f61074: function() { return handleError(function (arg0, arg1) {
            const ret = Reflect.get(arg0, arg1);
            return ret;
        }, arguments); },
        __wbg_get_8360291721e2339f: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_unchecked_17f53dad852b9588: function(arg0, arg1) {
            const ret = arg0[arg1 >>> 0];
            return ret;
        },
        __wbg_get_with_ref_key_6412cf3094599694: function(arg0, arg1) {
            const ret = arg0[arg1];
            return ret;
        },
        __wbg_instanceof_ArrayBuffer_7c8433c6ed14ffe3: function(arg0) {
            let result;
            try {
                result = arg0 instanceof ArrayBuffer;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Map_1b76fd4635be43eb: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Map;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_instanceof_Uint8Array_152ba1f289edcf3f: function(arg0) {
            let result;
            try {
                result = arg0 instanceof Uint8Array;
            } catch (_) {
                result = false;
            }
            const ret = result;
            return ret;
        },
        __wbg_isArray_c3109d14ffc06469: function(arg0) {
            const ret = Array.isArray(arg0);
            return ret;
        },
        __wbg_isSafeInteger_4fc213d1989d6d2a: function(arg0) {
            const ret = Number.isSafeInteger(arg0);
            return ret;
        },
        __wbg_iterator_013bc09ec998c2a7: function() {
            const ret = Symbol.iterator;
            return ret;
        },
        __wbg_length_3d4ecd04bd8d22f1: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_length_9f1775224cf1d815: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_new_0c7403db6e782f19: function(arg0) {
            const ret = new Uint8Array(arg0);
            return ret;
        },
        __wbg_new_682678e2f47e32bc: function() {
            const ret = new Array();
            return ret;
        },
        __wbg_new_aa8d0fa9762c29bd: function() {
            const ret = new Object();
            return ret;
        },
        __wbg_new_from_slice_b5ea43e23f6008c0: function(arg0, arg1) {
            const ret = new Uint8Array(getArrayU8FromWasm0(arg0, arg1));
            return ret;
        },
        __wbg_next_0340c4ae324393c3: function() { return handleError(function (arg0) {
            const ret = arg0.next();
            return ret;
        }, arguments); },
        __wbg_next_7646edaa39458ef7: function(arg0) {
            const ret = arg0.next;
            return ret;
        },
        __wbg_prototypesetcall_a6b02eb00b0f4ce2: function(arg0, arg1, arg2) {
            Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
        },
        __wbg_publickey_new: function(arg0) {
            const ret = PublicKey.__wrap(arg0);
            return ret;
        },
        __wbg_set_3bf1de9fab0cd644: function(arg0, arg1, arg2) {
            arg0[arg1 >>> 0] = arg2;
        },
        __wbg_set_6be42768c690e380: function(arg0, arg1, arg2) {
            arg0[arg1] = arg2;
        },
        __wbg_signature_new: function(arg0) {
            const ret = Signature.__wrap(arg0);
            return ret;
        },
        __wbg_value_ee3a06f4579184fa: function(arg0) {
            const ret = arg0.value;
            return ret;
        },
        __wbindgen_cast_0000000000000001: function(arg0) {
            // Cast intrinsic for `F64 -> Externref`.
            const ret = arg0;
            return ret;
        },
        __wbindgen_cast_0000000000000002: function(arg0) {
            // Cast intrinsic for `I64 -> Externref`.
            const ret = arg0;
            return ret;
        },
        __wbindgen_cast_0000000000000003: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_0000000000000004: function(arg0) {
            // Cast intrinsic for `U64 -> Externref`.
            const ret = BigInt.asUintN(64, arg0);
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./index_bg.js": import0,
    };
}

const AddressFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_address_free(ptr >>> 0, 1));
const BLSKeyPairFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_blskeypair_free(ptr >>> 0, 1));
const BLSPublicKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_blspublickey_free(ptr >>> 0, 1));
const BLSSecretKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_blssecretkey_free(ptr >>> 0, 1));
const ClientConfigurationFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_clientconfiguration_free(ptr >>> 0, 1));
const CommitmentFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_commitment_free(ptr >>> 0, 1));
const CommitmentPairFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_commitmentpair_free(ptr >>> 0, 1));
const CryptoUtilsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_cryptoutils_free(ptr >>> 0, 1));
const ES256PublicKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_es256publickey_free(ptr >>> 0, 1));
const ES256SignatureFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_es256signature_free(ptr >>> 0, 1));
const HashFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_hash_free(ptr >>> 0, 1));
const HashedTimeLockedContractFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_hashedtimelockedcontract_free(ptr >>> 0, 1));
const KeyPairFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_keypair_free(ptr >>> 0, 1));
const MerklePathFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_merklepath_free(ptr >>> 0, 1));
const MerkleTreeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_merkletree_free(ptr >>> 0, 1));
const PartialSignatureFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_partialsignature_free(ptr >>> 0, 1));
const PolicyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_policy_free(ptr >>> 0, 1));
const PrivateKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_privatekey_free(ptr >>> 0, 1));
const PublicKeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_publickey_free(ptr >>> 0, 1));
const RandomSecretFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_randomsecret_free(ptr >>> 0, 1));
const SignatureFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_signature_free(ptr >>> 0, 1));
const SignatureProofFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_signatureproof_free(ptr >>> 0, 1));
const StakingContractFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_stakingcontract_free(ptr >>> 0, 1));
const StakingDataBuilderFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_stakingdatabuilder_free(ptr >>> 0, 1));
const TransactionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transaction_free(ptr >>> 0, 1));
const TransactionBuilderFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transactionbuilder_free(ptr >>> 0, 1));
const VestingContractFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_vestingcontract_free(ptr >>> 0, 1));

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_externrefs.set(idx, obj);
    return idx;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_externrefs.get(mem.getUint32(i, true)));
    }
    wasm.__externref_drop_slice(ptr, len);
    return result;
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
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

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    for (let i = 0; i < array.length; i++) {
        const add = addToExternrefTable0(array[i]);
        getDataViewMemory0().setUint32(ptr + 4 * i, add, true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
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

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasm;
function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    wasmModule = module;
    cachedDataViewMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('index_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
