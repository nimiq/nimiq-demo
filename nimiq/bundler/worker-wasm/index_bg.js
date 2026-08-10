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
     * Parses an address from an {@link Address} instance, a hex string representation, or a byte array.
     *
     * Throws when an address cannot be parsed from the argument.
     * @param {string | Uint8Array} addr
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
}
if (Symbol.dispose) Address.prototype[Symbol.dispose] = Address.prototype.free;

/**
 * Nimiq Albatross client that runs in browsers via WASM and is exposed to Javascript.
 *
 * ### Usage:
 *
 * ```js
 * import init, * as Nimiq from "./pkg/nimiq_web_client.js";
 *
 * init().then(async () => {
 *     const config = new Nimiq.ClientConfiguration();
 *     const client = await config.instantiateClient();
 *     // ...
 * });
 * ```
 */
export class Client {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Client.prototype);
        obj.__wbg_ptr = ptr;
        ClientFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ClientFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_client_free(ptr, 0);
    }
    /**
     * Adds an event listener for consensus-change events, such as when consensus is established or lost.
     * @param {(state: ConsensusState) => any} listener
     * @returns {Promise<number>}
     */
    addConsensusChangedListener(listener) {
        const ret = wasm.client_addConsensusChangedListener(this.__wbg_ptr, listener);
        return ret;
    }
    /**
     * Adds an event listener for new blocks added to the blockchain.
     * @param {(hash: string, reason: string, reverted_blocks: string[], adopted_blocks: string[]) => any} listener
     * @returns {Promise<number>}
     */
    addHeadChangedListener(listener) {
        const ret = wasm.client_addHeadChangedListener(this.__wbg_ptr, listener);
        return ret;
    }
    /**
     * Adds an event listener for peer-change events, such as when a new peer joins, or a peer leaves.
     * @param {(peer_id: string, reason: 'joined' | 'left', peer_count: number, peer_info?: PlainPeerInfo) => any} listener
     * @returns {Promise<number>}
     */
    addPeerChangedListener(listener) {
        const ret = wasm.client_addPeerChangedListener(this.__wbg_ptr, listener);
        return ret;
    }
    /**
     * Adds an event listener for transactions to and from the provided addresses.
     *
     * The listener is called for transactions when they are _included_ in the blockchain.
     * @param {(transaction: PlainTransactionDetails) => any} listener
     * @param {(string | Uint8Array)[]} addresses
     * @returns {Promise<number>}
     */
    addTransactionListener(listener, addresses) {
        const ret = wasm.client_addTransactionListener(this.__wbg_ptr, listener, addresses);
        return ret;
    }
    /**
     * This function is used to tell the network to (re)start connecting to peers.
     * This is could be used to tell the network to restart connection operations after
     * disconnect network is called.
     * @returns {Promise<void>}
     */
    connectNetwork() {
        const ret = wasm.client_connectNetwork(this.__wbg_ptr);
        return ret;
    }
    /**
     * Creates a new Client that automatically starts connecting to the network.
     * @param {PlainClientConfiguration} config
     * @returns {Promise<Client>}
     */
    static create(config) {
        const ret = wasm.client_create(config);
        return ret;
    }
    /**
     * This function is used to tell the network to disconnect from every connected
     * peer and stop trying to connect to other peers.
     *
     * **Important**: this function returns when the signal to disconnect was sent,
     * before all peers actually disconnect. This means that in order to ensure the
     * network is disconnected, wait for all peers to disappear after calling.
     * @returns {Promise<void>}
     */
    disconnectNetwork() {
        const ret = wasm.client_disconnectNetwork(this.__wbg_ptr);
        return ret;
    }
    /**
     * Fetches the account for the provided address from the network.
     *
     * Throws if the address cannot be parsed and on network errors.
     * @param {string | Uint8Array} address
     * @returns {Promise<PlainAccount>}
     */
    getAccount(address) {
        const ret = wasm.client_getAccount(this.__wbg_ptr, address);
        return ret;
    }
    /**
     * Fetches the accounts for the provided addresses from the network.
     *
     * Throws if an address cannot be parsed and on network errors.
     * @param {(string | Uint8Array)[]} addresses
     * @returns {Promise<PlainAccount[]>}
     */
    getAccounts(addresses) {
        const ret = wasm.client_getAccounts(this.__wbg_ptr, addresses);
        return ret;
    }
    /**
     * Returns the current address books peers.
     * Each peer will have one address and currently no guarantee for the usefulness of that address can be given.
     *
     * The resulting Array may be empty if there is no peers in the address book.
     * @returns {Promise<PlainPeerInfo[]>}
     */
    getAddressBook() {
        const ret = wasm.client_getAddressBook(this.__wbg_ptr);
        return ret;
    }
    /**
     * Fetches a block by its hash.
     *
     * Throws if the client does not have the block.
     *
     * Fetching blocks from the network is not yet available.
     * @param {string} hash
     * @returns {Promise<PlainBlock>}
     */
    getBlock(hash) {
        const ptr0 = passStringToWasm0(hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.client_getBlock(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * Fetches a block by its height (block number).
     *
     * Throws if the client does not have the block.
     *
     * Fetching blocks from the network is not yet available.
     * @param {number} height
     * @returns {Promise<PlainBlock>}
     */
    getBlockAt(height) {
        const ret = wasm.client_getBlockAt(this.__wbg_ptr, height);
        return ret;
    }
    /**
     * Returns the validators elected for the current epoch, together with the number of validator
     * slots assigned to each of them.
     *
     * The slot distribution is fixed for the duration of an epoch and is the metric used on-chain
     * to evaluate support for protocol upgrades. Combine this with {@link Client.getValidators} to
     * relate slot counts to each validator's stake and signal data.
     *
     * Throws if the elected validators are not available (e.g. before consensus is established).
     * @returns {Promise<PlainElectedValidator[]>}
     */
    getElectedValidators() {
        const ret = wasm.client_getElectedValidators(this.__wbg_ptr);
        return ret;
    }
    /**
     * Returns the current blockchain head block.
     * Note that the web client is a light client and does not have block bodies, i.e. no transactions.
     * @returns {Promise<PlainBlock>}
     */
    getHeadBlock() {
        const ret = wasm.client_getHeadBlock(this.__wbg_ptr);
        return ret;
    }
    /**
     * Returns the block hash of the current blockchain head.
     * @returns {Promise<string>}
     */
    getHeadHash() {
        const ret = wasm.client_getHeadHash(this.__wbg_ptr);
        return ret;
    }
    /**
     * Returns the block number of the current blockchain head.
     * @returns {Promise<number>}
     */
    getHeadHeight() {
        const ret = wasm.client_getHeadHeight(this.__wbg_ptr);
        return ret;
    }
    /**
     * Returns the network ID that the client is connecting to.
     * @returns {Promise<number>}
     */
    getNetworkId() {
        const ret = wasm.client_getNetworkId(this.__wbg_ptr);
        return ret;
    }
    /**
     * Returns the blockchain protocol version the client currently uses to verify transactions.
     * @returns {Promise<number>}
     */
    getProtocolVersion() {
        const ret = wasm.client_getProtocolVersion(this.__wbg_ptr);
        return ret;
    }
    /**
     * Fetches the staker for the provided address from the network.
     *
     * Throws if the address cannot be parsed and on network errors.
     * @param {string | Uint8Array} address
     * @returns {Promise<PlainStaker | undefined>}
     */
    getStaker(address) {
        const ret = wasm.client_getStaker(this.__wbg_ptr, address);
        return ret;
    }
    /**
     * Fetches the stakers for the provided addresses from the network.
     *
     * Throws if an address cannot be parsed and on network errors.
     * @param {(string | Uint8Array)[]} addresses
     * @returns {Promise<(PlainStaker | undefined)[]>}
     */
    getStakers(addresses) {
        const ret = wasm.client_getStakers(this.__wbg_ptr, addresses);
        return ret;
    }
    /**
     * Fetches the transaction details for the given transaction hash.
     * @param {string} hash
     * @returns {Promise<PlainTransactionDetails>}
     */
    getTransaction(hash) {
        const ptr0 = passStringToWasm0(hash, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.client_getTransaction(this.__wbg_ptr, ptr0, len0);
        return ret;
    }
    /**
     * This function is used to query the network for transaction receipts from and to a
     * specific address, that have been included in the chain.
     *
     * The obtained receipts are _not_ verified before being returned.
     *
     * Up to a `limit` number of transaction receipts are returned from newest to oldest.
     * It starts at the `start_at` transaction and goes backwards. If this hash does not exist
     * or does not belong to the address, an empty list is returned.
     * If the network does not have at least `min_peers` to query, then an error is returned.
     * @param {string | Uint8Array} address
     * @param {number | null} [limit]
     * @param {string | null} [start_at]
     * @param {number | null} [min_peers]
     * @returns {Promise<PlainTransactionReceipt[]>}
     */
    getTransactionReceiptsByAddress(address, limit, start_at, min_peers) {
        var ptr0 = isLikeNone(start_at) ? 0 : passStringToWasm0(start_at, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.client_getTransactionReceiptsByAddress(this.__wbg_ptr, address, isLikeNone(limit) ? 0xFFFFFF : limit, ptr0, len0, isLikeNone(min_peers) ? 0x100000001 : (min_peers) >>> 0);
        return ret;
    }
    /**
     * This function is used to query the network for transactions from and to a specific
     * address, that have been included in the chain.
     *
     * The obtained transactions are verified before being returned.
     *
     * If you already have transactions belonging to this address, you can provide some of that
     * information to reduce the amount of network requests made:
     * - Provide the `since_block_height` parameter to exclude any history from before
     *   that block height. You should be completely certain about its state. This should not be
     *   the last known block height, but an earlier block height that could not have been forked
     *   from (e.g. the last known election or checkpoint block).
     * - Provide a list of `known_transaction_details` to have them verified and/or broadcasted
     *   again.
     * - Provide a `start_at` parameter to start the query at a specific transaction hash
     *   (which will not be included). This hash must exist and the corresponding transaction
     *   must involve this address for the query to work correctly.
     *
     * Up to a `limit` number of transactions are returned from newest to oldest.
     * If the network does not have at least `min_peers` to query, an error is returned.
     * @param {string | Uint8Array} address
     * @param {number | null} [since_block_height]
     * @param {PlainTransactionDetails[] | null} [known_transaction_details]
     * @param {string | null} [start_at]
     * @param {number | null} [limit]
     * @param {number | null} [min_peers]
     * @returns {Promise<PlainTransactionDetails[]>}
     */
    getTransactionsByAddress(address, since_block_height, known_transaction_details, start_at, limit, min_peers) {
        var ptr0 = isLikeNone(start_at) ? 0 : passStringToWasm0(start_at, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        const ret = wasm.client_getTransactionsByAddress(this.__wbg_ptr, address, isLikeNone(since_block_height) ? 0x100000001 : (since_block_height) >>> 0, isLikeNone(known_transaction_details) ? 0 : addToExternrefTable0(known_transaction_details), ptr0, len0, isLikeNone(limit) ? 0xFFFFFF : limit, isLikeNone(min_peers) ? 0x100000001 : (min_peers) >>> 0);
        return ret;
    }
    /**
     * Fetches the validator for the provided address from the network.
     *
     * Throws if the address cannot be parsed and on network errors.
     * @param {string | Uint8Array} address
     * @returns {Promise<PlainValidator | undefined>}
     */
    getValidator(address) {
        const ret = wasm.client_getValidator(this.__wbg_ptr, address);
        return ret;
    }
    /**
     * Fetches the validators for the provided addresses from the network.
     *
     * Throws if an address cannot be parsed and on network errors.
     * @param {(string | Uint8Array)[]} addresses
     * @returns {Promise<(PlainValidator | undefined)[]>}
     */
    getValidators(addresses) {
        const ret = wasm.client_getValidators(this.__wbg_ptr, addresses);
        return ret;
    }
    /**
     * Returns the version of the web client, including a `+dirty` build-metadata
     * suffix when it was built from a Git work tree with uncommitted changes.
     * @returns {Promise<string>}
     */
    getVersion() {
        const ret = wasm.client_getVersion(this.__wbg_ptr);
        return ret;
    }
    /**
     * Returns if the client currently has consensus with the network.
     * @returns {Promise<boolean>}
     */
    isConsensusEstablished() {
        const ret = wasm.client_isConsensusEstablished(this.__wbg_ptr);
        return ret;
    }
    /**
     * Removes an event listener by its handle.
     * @param {number} handle
     * @returns {Promise<void>}
     */
    removeListener(handle) {
        const ret = wasm.client_removeListener(this.__wbg_ptr, handle);
        return ret;
    }
    /**
     * Sends a transaction to the network and returns {@link PlainTransactionDetails}.
     *
     * Throws in case of network errors.
     * @param {PlainTransaction | string | Uint8Array} transaction
     * @returns {Promise<PlainTransactionDetails>}
     */
    sendTransaction(transaction) {
        const ret = wasm.client_sendTransaction(this.__wbg_ptr, transaction);
        return ret;
    }
    /**
     * Returns a promise that resolves when the client has established consensus with the network.
     * @returns {Promise<void>}
     */
    waitForConsensusEstablished() {
        const ret = wasm.client_waitForConsensusEstablished(this.__wbg_ptr);
        return ret;
    }
}
if (Symbol.dispose) Client.prototype[Symbol.dispose] = Client.prototype.free;

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
}
if (Symbol.dispose) ClientConfiguration.prototype[Symbol.dispose] = ClientConfiguration.prototype.free;

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
}
if (Symbol.dispose) HashedTimeLockedContract.prototype[Symbol.dispose] = HashedTimeLockedContract.prototype.free;

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
}
if (Symbol.dispose) StakingContract.prototype[Symbol.dispose] = StakingContract.prototype.free;

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
     * @param {PlainTransaction | string | Uint8Array} tx
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
}
if (Symbol.dispose) VestingContract.prototype[Symbol.dispose] = VestingContract.prototype.free;
export function __wbg_Error_960c155d3d49e4c2(arg0, arg1) {
    const ret = Error(getStringFromWasm0(arg0, arg1));
    return ret;
}
export function __wbg_Number_32bf70a599af1d4b(arg0) {
    const ret = Number(arg0);
    return ret;
}
export function __wbg_String_8564e559799eccda(arg0, arg1) {
    const ret = String(arg1);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
export function __wbg_WorkerGlobalScope_0f395e12ab05d182(arg0) {
    const ret = arg0.WorkerGlobalScope;
    return ret;
}
export function __wbg___wbindgen_bigint_get_as_i64_3d3aba5d616c6a51(arg0, arg1) {
    const v = arg1;
    const ret = typeof(v) === 'bigint' ? v : undefined;
    getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
}
export function __wbg___wbindgen_boolean_get_6ea149f0a8dcc5ff(arg0) {
    const v = arg0;
    const ret = typeof(v) === 'boolean' ? v : undefined;
    return isLikeNone(ret) ? 0xFFFFFF : ret ? 1 : 0;
}
export function __wbg___wbindgen_debug_string_ab4b34d23d6778bd(arg0, arg1) {
    const ret = debugString(arg1);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
export function __wbg___wbindgen_in_a5d8b22e52b24dd1(arg0, arg1) {
    const ret = arg0 in arg1;
    return ret;
}
export function __wbg___wbindgen_is_bigint_ec25c7f91b4d9e93(arg0) {
    const ret = typeof(arg0) === 'bigint';
    return ret;
}
export function __wbg___wbindgen_is_function_3baa9db1a987f47d(arg0) {
    const ret = typeof(arg0) === 'function';
    return ret;
}
export function __wbg___wbindgen_is_null_52ff4ec04186736f(arg0) {
    const ret = arg0 === null;
    return ret;
}
export function __wbg___wbindgen_is_object_63322ec0cd6ea4ef(arg0) {
    const val = arg0;
    const ret = typeof(val) === 'object' && val !== null;
    return ret;
}
export function __wbg___wbindgen_is_string_6df3bf7ef1164ed3(arg0) {
    const ret = typeof(arg0) === 'string';
    return ret;
}
export function __wbg___wbindgen_is_undefined_29a43b4d42920abd(arg0) {
    const ret = arg0 === undefined;
    return ret;
}
export function __wbg___wbindgen_jsval_eq_d3465d8a07697228(arg0, arg1) {
    const ret = arg0 === arg1;
    return ret;
}
export function __wbg___wbindgen_jsval_loose_eq_cac3565e89b4134c(arg0, arg1) {
    const ret = arg0 == arg1;
    return ret;
}
export function __wbg___wbindgen_number_get_c7f42aed0525c451(arg0, arg1) {
    const obj = arg1;
    const ret = typeof(obj) === 'number' ? obj : undefined;
    getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
}
export function __wbg___wbindgen_string_get_7ed5322991caaec5(arg0, arg1) {
    const obj = arg1;
    const ret = typeof(obj) === 'string' ? obj : undefined;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
export function __wbg___wbindgen_throw_6b64449b9b9ed33c(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
}
export function __wbg__wbg_cb_unref_b46c9b5a9f08ec37(arg0) {
    arg0._wbg_cb_unref();
}
export function __wbg_addEventListener_6288145a3c991a96() { return handleError(function (arg0, arg1, arg2, arg3) {
    arg0.addEventListener(getStringFromWasm0(arg1, arg2), arg3);
}, arguments); }
export function __wbg_apply_4c35bd236dda9c14() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.apply(arg1, arg2);
    return ret;
}, arguments); }
export function __wbg_bufferedAmount_58e0ecdc18cc66ba(arg0) {
    const ret = arg0.bufferedAmount;
    return ret;
}
export function __wbg_call_14b169f759b26747() { return handleError(function (arg0, arg1) {
    const ret = arg0.call(arg1);
    return ret;
}, arguments); }
export function __wbg_call_a24592a6f349a97e() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.call(arg1, arg2);
    return ret;
}, arguments); }
export function __wbg_clearInterval_26ba580547547579(arg0) {
    const ret = clearInterval(arg0);
    return ret;
}
export function __wbg_clearInterval_b38e6d81cfcc0b27(arg0, arg1) {
    arg0.clearInterval(arg1);
}
export function __wbg_clearInterval_d04d8e0ff92c4c05(arg0, arg1) {
    arg0.clearInterval(arg1);
}
export function __wbg_clearTimeout_01406e55473040f6(arg0) {
    const ret = clearTimeout(arg0);
    return ret;
}
export function __wbg_clearTimeout_3629d6209dfcc46e(arg0) {
    const ret = clearTimeout(arg0);
    return ret;
}
export function __wbg_client_new(arg0) {
    const ret = Client.__wrap(arg0);
    return ret;
}
export function __wbg_close_a7d2c11ae747c112(arg0) {
    arg0.close();
}
export function __wbg_close_ea1755acd462497f() { return handleError(function (arg0, arg1, arg2, arg3) {
    arg0.close(arg1, getStringFromWasm0(arg2, arg3));
}, arguments); }
export function __wbg_createIndex_b7dc3a4f19fc4231() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
    const ret = arg0.createIndex(getStringFromWasm0(arg1, arg2), arg3, arg4);
    return ret;
}, arguments); }
export function __wbg_createIndex_b9253d2f61b19445() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg0.createIndex(getStringFromWasm0(arg1, arg2), arg3);
    return ret;
}, arguments); }
export function __wbg_createObjectStore_9cf3048eb7b47bc2() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg0.createObjectStore(getStringFromWasm0(arg1, arg2), arg3);
    return ret;
}, arguments); }
export function __wbg_crypto_48300657fced39f9(arg0) {
    const ret = arg0.crypto;
    return ret;
}
export function __wbg_data_bb9dffdd1e99cf2d(arg0) {
    const ret = arg0.data;
    return ret;
}
export function __wbg_debug_4e190d233ee2e0d8(arg0, arg1, arg2, arg3) {
    console.debug(arg0, arg1, arg2, arg3);
}
export function __wbg_debug_c014a160490283dc(arg0) {
    console.debug(arg0);
}
export function __wbg_deleteIndex_99722fe825533212() { return handleError(function (arg0, arg1, arg2) {
    arg0.deleteIndex(getStringFromWasm0(arg1, arg2));
}, arguments); }
export function __wbg_deleteObjectStore_081280ffb13f9792() { return handleError(function (arg0, arg1, arg2) {
    arg0.deleteObjectStore(getStringFromWasm0(arg1, arg2));
}, arguments); }
export function __wbg_done_9158f7cc8751ba32(arg0) {
    const ret = arg0.done;
    return ret;
}
export function __wbg_entries_e0b73aa8571ddb56(arg0) {
    const ret = Object.entries(arg0);
    return ret;
}
export function __wbg_error_176f747c592e7ba3(arg0) {
    const ret = arg0.error;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_error_2001591ad2463697(arg0) {
    console.error(arg0);
}
export function __wbg_error_43690a185e0311ac() { return handleError(function (arg0) {
    const ret = arg0.error;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}, arguments); }
export function __wbg_error_a6a4bb2525a88971(arg0, arg1, arg2, arg3) {
    console.error(arg0, arg1, arg2, arg3);
}
export function __wbg_from_0dbf29f09e7fb200(arg0) {
    const ret = Array.from(arg0);
    return ret;
}
export function __wbg_getAll_1050a25926d2df6c() { return handleError(function (arg0, arg1) {
    const ret = arg0.getAll(arg1);
    return ret;
}, arguments); }
export function __wbg_getAll_7f3a9865edd84fcd() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.getAll(arg1, arg2 >>> 0);
    return ret;
}, arguments); }
export function __wbg_getAll_a898878594f5e590() { return handleError(function (arg0) {
    const ret = arg0.getAll();
    return ret;
}, arguments); }
export function __wbg_getRandomValues_263d0aa5464054ee() { return handleError(function (arg0, arg1) {
    arg0.getRandomValues(arg1);
}, arguments); }
export function __wbg_getRandomValues_3f44b700395062e5() { return handleError(function (arg0, arg1) {
    globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
}, arguments); }
export function __wbg_getRandomValues_cc7f052a444bb2ce() { return handleError(function (arg0, arg1) {
    globalThis.crypto.getRandomValues(getArrayU8FromWasm0(arg0, arg1));
}, arguments); }
export function __wbg_getTime_da7c55f52b71e8c6(arg0) {
    const ret = arg0.getTime();
    return ret;
}
export function __wbg_get_1affdbdd5573b16a() { return handleError(function (arg0, arg1) {
    const ret = Reflect.get(arg0, arg1);
    return ret;
}, arguments); }
export function __wbg_get_59664ef421721a7e(arg0, arg1, arg2) {
    const ret = arg1[arg2 >>> 0];
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}
export function __wbg_get_6011fa3a58f61074() { return handleError(function (arg0, arg1) {
    const ret = Reflect.get(arg0, arg1);
    return ret;
}, arguments); }
export function __wbg_get_8360291721e2339f(arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return ret;
}
export function __wbg_get_unchecked_17f53dad852b9588(arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return ret;
}
export function __wbg_get_with_ref_key_6412cf3094599694(arg0, arg1) {
    const ret = arg0[arg1];
    return ret;
}
export function __wbg_indexNames_3e19d9cfe84e3093(arg0) {
    const ret = arg0.indexNames;
    return ret;
}
export function __wbg_index_072be17bcbd46242() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.index(getStringFromWasm0(arg1, arg2));
    return ret;
}, arguments); }
export function __wbg_info_7479429238bffbce(arg0) {
    console.info(arg0);
}
export function __wbg_info_e1c3400f7bf783dc(arg0, arg1, arg2, arg3) {
    console.info(arg0, arg1, arg2, arg3);
}
export function __wbg_instanceof_ArrayBuffer_7c8433c6ed14ffe3(arg0) {
    let result;
    try {
        result = arg0 instanceof ArrayBuffer;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_IdbDatabase_3b6930bc25a91170(arg0) {
    let result;
    try {
        result = arg0 instanceof IDBDatabase;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_IdbFactory_8af6762731f44f3b(arg0) {
    let result;
    try {
        result = arg0 instanceof IDBFactory;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_IdbOpenDbRequest_d0071b8c6aae51ff(arg0) {
    let result;
    try {
        result = arg0 instanceof IDBOpenDBRequest;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_IdbRequest_cb20b218916840b2(arg0) {
    let result;
    try {
        result = arg0 instanceof IDBRequest;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_IdbTransaction_30097053aa3abb1e(arg0) {
    let result;
    try {
        result = arg0 instanceof IDBTransaction;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_Map_1b76fd4635be43eb(arg0) {
    let result;
    try {
        result = arg0 instanceof Map;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_Uint8Array_152ba1f289edcf3f(arg0) {
    let result;
    try {
        result = arg0 instanceof Uint8Array;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_instanceof_Window_cc64c86c8ef9e02b(arg0) {
    let result;
    try {
        result = arg0 instanceof Window;
    } catch (_) {
        result = false;
    }
    const ret = result;
    return ret;
}
export function __wbg_isArray_c3109d14ffc06469(arg0) {
    const ret = Array.isArray(arg0);
    return ret;
}
export function __wbg_isSafeInteger_4fc213d1989d6d2a(arg0) {
    const ret = Number.isSafeInteger(arg0);
    return ret;
}
export function __wbg_is_8f7ba86b7f249abd(arg0, arg1) {
    const ret = Object.is(arg0, arg1);
    return ret;
}
export function __wbg_iterator_013bc09ec998c2a7() {
    const ret = Symbol.iterator;
    return ret;
}
export function __wbg_keyPath_7160d7cd96c58b79() { return handleError(function (arg0) {
    const ret = arg0.keyPath;
    return ret;
}, arguments); }
export function __wbg_length_167a2db2c5f76499(arg0) {
    const ret = arg0.length;
    return ret;
}
export function __wbg_length_3d4ecd04bd8d22f1(arg0) {
    const ret = arg0.length;
    return ret;
}
export function __wbg_length_9f1775224cf1d815(arg0) {
    const ret = arg0.length;
    return ret;
}
export function __wbg_msCrypto_8c6d45a75ef1d3da(arg0) {
    const ret = arg0.msCrypto;
    return ret;
}
export function __wbg_multiEntry_eb066895143c99c8(arg0) {
    const ret = arg0.multiEntry;
    return ret;
}
export function __wbg_new_0_4d657201ced14de3() {
    const ret = new Date();
    return ret;
}
export function __wbg_new_0c7403db6e782f19(arg0) {
    const ret = new Uint8Array(arg0);
    return ret;
}
export function __wbg_new_2a6e9133304ae2bf() { return handleError(function (arg0, arg1) {
    const ret = new WebSocket(getStringFromWasm0(arg0, arg1));
    return ret;
}, arguments); }
export function __wbg_new_682678e2f47e32bc() {
    const ret = new Array();
    return ret;
}
export function __wbg_new_aa8d0fa9762c29bd() {
    const ret = new Object();
    return ret;
}
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
export function __wbg_new_with_length_8c854e41ea4dae9b(arg0) {
    const ret = new Uint8Array(arg0 >>> 0);
    return ret;
}
export function __wbg_next_0340c4ae324393c3() { return handleError(function (arg0) {
    const ret = arg0.next();
    return ret;
}, arguments); }
export function __wbg_next_7646edaa39458ef7(arg0) {
    const ret = arg0.next;
    return ret;
}
export function __wbg_node_95beb7570492fd97(arg0) {
    const ret = arg0.node;
    return ret;
}
export function __wbg_now_36a3148ac47c4ad7(arg0) {
    const ret = arg0.now();
    return ret;
}
export function __wbg_now_a9b7df1cbee90986() {
    const ret = Date.now();
    return ret;
}
export function __wbg_now_e7c6795a7f81e10f(arg0) {
    const ret = arg0.now();
    return ret;
}
export function __wbg_objectStoreNames_c755717c02e8876b(arg0) {
    const ret = arg0.objectStoreNames;
    return ret;
}
export function __wbg_objectStore_5942e8f91c946be8() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.objectStore(getStringFromWasm0(arg1, arg2));
    return ret;
}, arguments); }
export function __wbg_open_0949b7cdde2ab99a() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.open(getStringFromWasm0(arg1, arg2));
    return ret;
}, arguments); }
export function __wbg_open_90f4e40d36c2c9f5() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg0.open(getStringFromWasm0(arg1, arg2), arg3 >>> 0);
    return ret;
}, arguments); }
export function __wbg_performance_3fcf6e32a7e1ed0a(arg0) {
    const ret = arg0.performance;
    return ret;
}
export function __wbg_process_b2fea42461d03994(arg0) {
    const ret = arg0.process;
    return ret;
}
export function __wbg_prototypesetcall_a6b02eb00b0f4ce2(arg0, arg1, arg2) {
    Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
}
export function __wbg_push_471a5b068a5295f6(arg0, arg1) {
    const ret = arg0.push(arg1);
    return ret;
}
export function __wbg_put_2d1082795891ee40() { return handleError(function (arg0, arg1) {
    const ret = arg0.put(arg1);
    return ret;
}, arguments); }
export function __wbg_put_fd02d3070a55994c() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.put(arg1, arg2);
    return ret;
}, arguments); }
export function __wbg_queueMicrotask_5d15a957e6aa920e(arg0) {
    queueMicrotask(arg0);
}
export function __wbg_queueMicrotask_f8819e5ffc402f36(arg0) {
    const ret = arg0.queueMicrotask;
    return ret;
}
export function __wbg_randomFillSync_ca9f178fb14c88cb() { return handleError(function (arg0, arg1) {
    arg0.randomFillSync(arg1);
}, arguments); }
export function __wbg_readyState_c78e609c7de3b381(arg0) {
    const ret = arg0.readyState;
    return ret;
}
export function __wbg_require_7a9419e39d796c95() { return handleError(function () {
    const ret = module.require;
    return ret;
}, arguments); }
export function __wbg_resolve_e6c466bc1052f16c(arg0) {
    const ret = Promise.resolve(arg0);
    return ret;
}
export function __wbg_result_f782323755b96dc8() { return handleError(function (arg0) {
    const ret = arg0.result;
    return ret;
}, arguments); }
export function __wbg_send_186c85704c7f2d00() { return handleError(function (arg0, arg1, arg2) {
    arg0.send(getArrayU8FromWasm0(arg1, arg2));
}, arguments); }
export function __wbg_setInterval_0347baf41ab83f2c() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg0.setInterval(arg1, arg2, ...arg3);
    return ret;
}, arguments); }
export function __wbg_setInterval_b8b5d059ed97f0e2() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg0.setInterval(arg1, arg2, ...arg3);
    return ret;
}, arguments); }
export function __wbg_setInterval_cbf1c35c6a692d37() { return handleError(function (arg0, arg1) {
    const ret = setInterval(arg0, arg1);
    return ret;
}, arguments); }
export function __wbg_setTimeout_56bcdccbad22fd44() { return handleError(function (arg0, arg1) {
    const ret = setTimeout(arg0, arg1);
    return ret;
}, arguments); }
export function __wbg_setTimeout_613a21b62dc655a1() { return handleError(function (arg0, arg1) {
    const ret = setTimeout(arg0, arg1);
    return ret;
}, arguments); }
export function __wbg_set_3bf1de9fab0cd644(arg0, arg1, arg2) {
    arg0[arg1 >>> 0] = arg2;
}
export function __wbg_set_6be42768c690e380(arg0, arg1, arg2) {
    arg0[arg1] = arg2;
}
export function __wbg_set_auto_increment_12f813bc0f283d18(arg0, arg1) {
    arg0.autoIncrement = arg1 !== 0;
}
export function __wbg_set_binaryType_770e68648ca5e83d(arg0, arg1) {
    arg0.binaryType = __wbindgen_enum_BinaryType[arg1];
}
export function __wbg_set_key_path_23485c4a6cd0c2cf(arg0, arg1) {
    arg0.keyPath = arg1;
}
export function __wbg_set_multi_entry_bda3f2f33c69a070(arg0, arg1) {
    arg0.multiEntry = arg1 !== 0;
}
export function __wbg_set_name_5d57bfb5969c422c(arg0, arg1, arg2) {
    arg0.name = getStringFromWasm0(arg1, arg2);
}
export function __wbg_set_onabort_7eecdbabbc4fd5f8(arg0, arg1) {
    arg0.onabort = arg1;
}
export function __wbg_set_onclose_17fa3bbcc4ba3541(arg0, arg1) {
    arg0.onclose = arg1;
}
export function __wbg_set_oncomplete_8c9c4dac8e331f19(arg0, arg1) {
    arg0.oncomplete = arg1;
}
export function __wbg_set_onerror_5cae5e3b994ad11f(arg0, arg1) {
    arg0.onerror = arg1;
}
export function __wbg_set_onerror_da99c4232662a084(arg0, arg1) {
    arg0.onerror = arg1;
}
export function __wbg_set_onerror_ed658d0b50b67e95(arg0, arg1) {
    arg0.onerror = arg1;
}
export function __wbg_set_onmessage_c1db358b9c38e3f1(arg0, arg1) {
    arg0.onmessage = arg1;
}
export function __wbg_set_onopen_cd47b8fb1d92dee9(arg0, arg1) {
    arg0.onopen = arg1;
}
export function __wbg_set_onsuccess_bf03d6c06709ef09(arg0, arg1) {
    arg0.onsuccess = arg1;
}
export function __wbg_set_onupgradeneeded_3fc8649a687213f5(arg0, arg1) {
    arg0.onupgradeneeded = arg1;
}
export function __wbg_set_onversionchange_10702a9be26be1d2(arg0, arg1) {
    arg0.onversionchange = arg1;
}
export function __wbg_set_unique_0a396b97f5b68657(arg0, arg1) {
    arg0.unique = arg1 !== 0;
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
export function __wbg_subarray_f8ca46a25b1f5e0d(arg0, arg1, arg2) {
    const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
    return ret;
}
export function __wbg_target_6d97e221d11b71b6(arg0) {
    const ret = arg0.target;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_then_8e16ee11f05e4827(arg0, arg1) {
    const ret = arg0.then(arg1);
    return ret;
}
export function __wbg_toString_306ed0b9f320c1ca(arg0) {
    const ret = arg0.toString();
    return ret;
}
export function __wbg_transaction_246d4ade615944eb(arg0) {
    const ret = arg0.transaction;
    return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
}
export function __wbg_transaction_9af5475ca3bd3fa9() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.transaction(arg1, __wbindgen_enum_IdbTransactionMode[arg2]);
    return ret;
}, arguments); }
export function __wbg_unique_55295e4c3d09c162(arg0) {
    const ret = arg0.unique;
    return ret;
}
export function __wbg_value_ee3a06f4579184fa(arg0) {
    const ret = arg0.value;
    return ret;
}
export function __wbg_versions_215a3ab1c9d5745a(arg0) {
    const ret = arg0.versions;
    return ret;
}
export function __wbg_warn_3cc416af27dbdc02(arg0) {
    console.warn(arg0);
}
export function __wbg_warn_ad997e36628bd23a(arg0, arg1, arg2, arg3) {
    console.warn(arg0, arg1, arg2, arg3);
}
export function __wbindgen_cast_0000000000000001(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [Externref], shim_idx: 2802, ret: Result(Unit), inner_ret: Some(Result(Unit)) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___wasm_bindgen_8e56df5fa3736b7e___JsValue__core_9b3796e30d99ddb7___result__Result_____wasm_bindgen_8e56df5fa3736b7e___JsError___true_);
    return ret;
}
export function __wbindgen_cast_0000000000000002(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("CloseEvent")], shim_idx: 1753, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___web_sys_2af8cd294dd713b7___features__gen_CloseEvent__CloseEvent______true_);
    return ret;
}
export function __wbindgen_cast_0000000000000003(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("Event")], shim_idx: 1753, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___web_sys_2af8cd294dd713b7___features__gen_CloseEvent__CloseEvent______true__2);
    return ret;
}
export function __wbindgen_cast_0000000000000004(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("Event")], shim_idx: 2300, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___web_sys_2af8cd294dd713b7___features__gen_Event__Event______true_);
    return ret;
}
export function __wbindgen_cast_0000000000000005(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("IDBVersionChangeEvent")], shim_idx: 219, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___web_sys_2af8cd294dd713b7___features__gen_IdbVersionChangeEvent__IdbVersionChangeEvent______true_);
    return ret;
}
export function __wbindgen_cast_0000000000000006(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("MessageEvent")], shim_idx: 1753, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___web_sys_2af8cd294dd713b7___features__gen_CloseEvent__CloseEvent______true__5);
    return ret;
}
export function __wbindgen_cast_0000000000000007(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [NamedExternref("MessageEvent")], shim_idx: 218, ret: Unit, inner_ret: Some(Unit) }, mutable: false }) -> Externref`.
    const ret = makeClosure(arg0, arg1, wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___web_sys_2af8cd294dd713b7___features__gen_MessageEvent__MessageEvent______true_);
    return ret;
}
export function __wbindgen_cast_0000000000000008(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [], shim_idx: 2190, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke_______true_);
    return ret;
}
export function __wbindgen_cast_0000000000000009(arg0, arg1) {
    // Cast intrinsic for `Closure(Closure { owned: true, function: Function { arguments: [], shim_idx: 2237, ret: Unit, inner_ret: Some(Unit) }, mutable: true }) -> Externref`.
    const ret = makeMutClosure(arg0, arg1, wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke_______true__1_);
    return ret;
}
export function __wbindgen_cast_000000000000000a(arg0) {
    // Cast intrinsic for `F64 -> Externref`.
    const ret = arg0;
    return ret;
}
export function __wbindgen_cast_000000000000000b(arg0) {
    // Cast intrinsic for `I64 -> Externref`.
    const ret = arg0;
    return ret;
}
export function __wbindgen_cast_000000000000000c(arg0, arg1) {
    // Cast intrinsic for `Ref(Slice(U8)) -> NamedExternref("Uint8Array")`.
    const ret = getArrayU8FromWasm0(arg0, arg1);
    return ret;
}
export function __wbindgen_cast_000000000000000d(arg0, arg1) {
    // Cast intrinsic for `Ref(String) -> Externref`.
    const ret = getStringFromWasm0(arg0, arg1);
    return ret;
}
export function __wbindgen_cast_000000000000000e(arg0) {
    // Cast intrinsic for `U64 -> Externref`.
    const ret = BigInt.asUintN(64, arg0);
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
function wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke_______true_(arg0, arg1) {
    wasm.wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke_______true_(arg0, arg1);
}

function wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke_______true__1_(arg0, arg1) {
    wasm.wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke_______true__1_(arg0, arg1);
}

function wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___web_sys_2af8cd294dd713b7___features__gen_CloseEvent__CloseEvent______true_(arg0, arg1, arg2) {
    wasm.wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___web_sys_2af8cd294dd713b7___features__gen_CloseEvent__CloseEvent______true_(arg0, arg1, arg2);
}

function wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___web_sys_2af8cd294dd713b7___features__gen_CloseEvent__CloseEvent______true__2(arg0, arg1, arg2) {
    wasm.wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___web_sys_2af8cd294dd713b7___features__gen_CloseEvent__CloseEvent______true__2(arg0, arg1, arg2);
}

function wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___web_sys_2af8cd294dd713b7___features__gen_Event__Event______true_(arg0, arg1, arg2) {
    wasm.wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___web_sys_2af8cd294dd713b7___features__gen_Event__Event______true_(arg0, arg1, arg2);
}

function wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___web_sys_2af8cd294dd713b7___features__gen_IdbVersionChangeEvent__IdbVersionChangeEvent______true_(arg0, arg1, arg2) {
    wasm.wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___web_sys_2af8cd294dd713b7___features__gen_IdbVersionChangeEvent__IdbVersionChangeEvent______true_(arg0, arg1, arg2);
}

function wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___web_sys_2af8cd294dd713b7___features__gen_CloseEvent__CloseEvent______true__5(arg0, arg1, arg2) {
    wasm.wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___web_sys_2af8cd294dd713b7___features__gen_CloseEvent__CloseEvent______true__5(arg0, arg1, arg2);
}

function wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___web_sys_2af8cd294dd713b7___features__gen_MessageEvent__MessageEvent______true_(arg0, arg1, arg2) {
    wasm.wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___web_sys_2af8cd294dd713b7___features__gen_MessageEvent__MessageEvent______true_(arg0, arg1, arg2);
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


const __wbindgen_enum_BinaryType = ["blob", "arraybuffer"];


const __wbindgen_enum_IdbTransactionMode = ["readonly", "readwrite", "versionchange", "readwriteflush", "cleanup"];
const AddressFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_address_free(ptr >>> 0, 1));
const ClientFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_client_free(ptr >>> 0, 1));
const ClientConfigurationFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_clientconfiguration_free(ptr >>> 0, 1));
const HashedTimeLockedContractFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_hashedtimelockedcontract_free(ptr >>> 0, 1));
const MerklePathFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_merklepath_free(ptr >>> 0, 1));
const PolicyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_policy_free(ptr >>> 0, 1));
const SignatureProofFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_signatureproof_free(ptr >>> 0, 1));
const StakingContractFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_stakingcontract_free(ptr >>> 0, 1));
const TransactionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_transaction_free(ptr >>> 0, 1));
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

const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => wasm.__wbindgen_destroy_closure(state.a, state.b));

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

function makeClosure(arg0, arg1, f) {
    const state = { a: arg0, b: arg1, cnt: 1 };
    const real = (...args) => {

        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        try {
            return f(state.a, state.b, ...args);
        } finally {
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


let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}
