/* tslint:disable */
/* eslint-disable */
/**
 * Available peer service flags
 */
export type PlainService = "full-blocks" | "history" | "accounts-proof" | "accounts-chunk" | "mempool" | "transaction-index" | "validator" | "pre-genesis-transactions" | "unknown";

/**
 * Describes the state of a transaction as known by the client.
 */
export type TransactionState = "new" | "pending" | "included" | "confirmed" | "invalidated" | "expired";

/**
 * Describes the state of consensus of the client.
 */
export type ConsensusState = "connecting" | "syncing" | "established";

/**
 * Enum over all possible meanings of a transaction\'s proof.
 */
export type PlainTransactionProof = ({ type: "raw" } & PlainRawProof) | ({ type: "standard" } & PlainStandardProof) | ({ type: "regular-transfer" } & PlainHtlcRegularTransferProof) | ({ type: "timeout-resolve" } & PlainHtlcTimeoutResolveProof) | ({ type: "early-resolve" } & PlainHtlcEarlyResolveProof);

/**
 * Enum over all possible meanings of a transaction\'s recipient data.
 */
export type PlainTransactionRecipientData = ({ type: "raw" } & PlainRawData) | ({ type: "vesting" } & PlainVestingData) | ({ type: "htlc" } & PlainHtlcData) | ({ type: "create-validator" } & PlainCreateValidatorData) | ({ type: "update-validator" } & PlainUpdateValidatorData) | ({ type: "deactivate-validator" } & PlainValidatorData) | ({ type: "reactivate-validator" } & PlainValidatorData) | ({ type: "retire-validator" } & PlainRawData) | ({ type: "create-staker" } & PlainCreateStakerData) | ({ type: "add-stake" } & PlainAddStakeData) | ({ type: "update-staker" } & PlainUpdateStakerData) | ({ type: "set-active-stake" } & PlainSetActiveStakeData) | ({ type: "retire-stake" } & PlainRetireStakeData);

/**
 * Enum over all possible meanings of a transaction\'s sender data.
 */
export type PlainTransactionSenderData = ({ type: "raw" } & PlainRawData) | ({ type: "delete-validator" } & PlainRawData) | ({ type: "remove-stake" } & PlainRawData);

/**
 * Information about a networking peer.
 */
export interface PlainPeerInfo {
    /**
     * A libp2p peer ID
     */
    peerId: string;
    /**
     * Address of the peer in `Multiaddr` format
     */
    address: string;
    /**
     * Node type of the peer
     */
    type: 'full' | 'history' | 'light';
    /**
     * List of services the peer is providing
     */
    services: PlainService[];
}

/**
 * JSON-compatible and human-readable format of HTLC creation data.
 */
export interface PlainHtlcData {
    raw: string;
    sender: string;
    recipient: string;
    hashAlgorithm: string;
    hashRoot: string;
    hashCount: number;
    timeout: number;
}

/**
 * JSON-compatible and human-readable format of HTLC early resolve proofs.
 */
export interface PlainHtlcEarlyResolveProof {
    raw: string;
    /**
     * The signer (also called the \"recipient\") of the HTLC
     */
    signer: string;
    signature: string;
    publicKey: string;
    pathLength: number;
    /**
     * The creator (also called the \"sender\") of the HTLC
     */
    creator: string;
    creatorSignature: string;
    creatorPublicKey: string;
    creatorPathLength: number;
}

/**
 * JSON-compatible and human-readable format of HTLC timeout proofs.
 */
export interface PlainHtlcTimeoutResolveProof {
    raw: string;
    /**
     * The creator (also called the \"sender\") of the HTLC
     */
    creator: string;
    creatorSignature: string;
    creatorPublicKey: string;
    creatorPathLength: number;
}

/**
 * JSON-compatible and human-readable format of HTLC transfer proofs.
 */
export interface PlainHtlcRegularTransferProof {
    raw: string;
    hashAlgorithm: string;
    hashDepth: number;
    hashRoot: string;
    preImage: string;
    /**
     * The signer (also called the \"recipient\") of the HTLC
     */
    signer: string;
    signature: string;
    publicKey: string;
    pathLength: number;
}

/**
 * JSON-compatible and human-readable format of a staker. E.g. delegation addresses are presented in their
 * human-readable format.
 */
export interface PlainStaker {
    /**
     * The staker\'s active balance.
     */
    balance: number;
    /**
     * The address of the validator for which the staker is delegating its stake for. If it is not
     * delegating to any validator, this will be set to None.
     */
    delegation: string | undefined;
    /**
     * The staker\'s inactive balance. Only released inactive balance can be withdrawn from the staking contract.
     * Stake can only be re-delegated if the whole balance of the staker is inactive and released
     * (or if there was no prior delegation). For inactive balance to be released, the maximum of
     * the inactive and the validator\'s jailed periods must have passed.
     */
    inactiveBalance: number;
    /**
     * The block number at which the inactive balance was last inactivated.
     * If the stake is currently delegated to a jailed validator, the maximum of its jail release
     * and the inactive release is taken. Re-delegation requires the whole balance of the staker to be inactive.
     * The stake can only effectively become inactive on the next election block. Thus, this may contain a
     * future block height.
     */
    inactiveFrom: number | undefined;
    /**
     * The block number from which the staker\'s `inactive_balance` gets released, e.g. for retirement.
     * Re-delegation requires the whole balance of the staker to be inactive and released, as well as
     * its delegated validator to not currently be jailed.
     */
    inactiveRelease: number | undefined;
    /**
     * The staker\'s retired balance. Retired balance can only be withdrawn, thus retiring is irreversible.
     * Only released inactive balance can be retired, so the maximum of the inactive and the validator\'s jailed
     * periods must have passed.
     * Once retired, the funds are immediately available to be withdrawn (removed).
     */
    retiredBalance: number;
}

/**
 * JSON-compatible and human-readable format of a validator that is elected for the current
 * epoch, together with the number of validator slots assigned to it.
 *
 * Unlike {@link PlainValidator}, this reflects the slot distribution that was fixed at the most
 * recent election block. The number of slots is the metric used on-chain to evaluate support for
 * protocol upgrades.
 */
export interface PlainElectedValidator {
    /**
     * The validator\'s address, in user-friendly format.
     */
    address: string;
    /**
     * The number of validator slots assigned to this validator in the current epoch.
     */
    numSlots: number;
}

/**
 * JSON-compatible and human-readable format of a validator. E.g. reward addresses and public keys are presented in
 * their human-readable format.
 */
export interface PlainValidator {
    /**
     * The public key used to sign blocks. It is also used to retire and reactivate the validator.
     */
    signingPublicKey: string;
    /**
     * The voting public key, it is used to vote for skip and macro blocks.
     */
    votingPublicKey: string;
    /**
     * The reward address of the validator. All the block rewards are paid to this address.
     */
    rewardAddress: string;
    /**
     * Signaling field. Can be used to do chain upgrades or for any other purpose that requires
     * validators to coordinate among themselves.
     */
    signalData: string | undefined;
    /**
     * The total stake assigned to this validator. It includes the validator deposit as well as the
     * coins delegated to him by stakers.
     */
    totalStake: number;
    /**
     * The amount of coins deposited by this validator. The initial deposit is a fixed amount,
     * however this value can be decremented by failing staking transactions due to fees.
     */
    deposit: number;
    /**
     * The number of stakers that are delegating to this validator.
     */
    numStakers: number;
    /**
     * An option indicating if the validator is marked as inactive. If it is, then it contains the
     * block height at which it becomes inactive.
     * A validator can only effectively become inactive on the next election block. Thus, this may
     * contain a block height in the future.
     */
    inactiveFrom: number | undefined;
    /**
     * An option indicating if the validator is marked as inactive. If it is, then it contains the
     * block height at which the inactive stake gets released and the validator can be retired.
     */
    inactiveRelease: number | undefined;
    /**
     * A flag indicating if the validator is retired.
     */
    retired: boolean;
    /**
     * An option indicating if the validator is jailed. If it is, then it contains the
     * block height at which it became jailed.
     * Opposed to `inactive_from`, jailing can and should take effect immediately to prevent
     * the validator and its stakers from modifying their funds and or delegation.
     */
    jailedFrom: number | undefined;
    /**
     * An option indicating if the validator is jailed. If it is, then it contains the
     * block height at which the jail period ends and the validator becomes interactive again.
     */
    jailedRelease: number | undefined;
}

/**
 * JSON-compatible and human-readable format of add stake data.
 */
export interface PlainAddStakeData {
    raw: string;
    staker: string;
}

/**
 * JSON-compatible and human-readable format of blocks.
 */
export interface PlainBlockCommonFields {
    /**
     * The block\'s unique hash, used as its identifier, in HEX format.
     */
    hash: string;
    /**
     * The block\'s on-chain size, in bytes.
     */
    size: number;
    /**
     * The block\'s block height, also called block number.
     */
    height: number;
    /**
     * The batch number that the block is in.
     */
    batch: number;
    /**
     * The epoch number that the block is in.
     */
    epoch: number;
    /**
     * The timestamp of the block. It follows the Unix time and has millisecond precision.
     */
    timestamp: number;
    /**
     * The network that this block is valid for.
     */
    network: string;
    /**
     * The protocol version that this block is valid for.
     */
    version: number;
    /**
     * The hash of the header of the immediately preceding block (either micro or macro), in HEX format.
     */
    prevHash: string;
    /**
     * The seed of the block. This is the BLS signature of the seed of the immediately preceding
     * block (either micro or macro) using the validator key of the block producer.
     */
    seed: string;
    /**
     * The extra data of the block, in HEX format. Up to 32 raw bytes.
     *
     * In the genesis block, it encodes the initial supply as a big-endian `u64`.
     *
     * No planned use otherwise.
     */
    extraData: string;
    /**
     * The root of the Merkle tree of the blockchain state, in HEX format. It acts as a commitment to the state.
     */
    stateHash: string;
    /**
     * The root of the Merkle tree of the body, in HEX format. It acts as a commitment to the body.
     */
    bodyHash: string;
    /**
     * A Merkle root over all of the transactions that happened in the current epoch, in HEX format.
     */
    historyHash: string;
}

/**
 * JSON-compatible and human-readable format of retire stake data.
 */
export interface PlainRetireStakeData {
    raw: string;
    retireStake: number;
}

/**
 * JSON-compatible and human-readable format of set active stake data.
 */
export interface PlainSetActiveStakeData {
    raw: string;
    newActiveBalance: number;
}

/**
 * JSON-compatible and human-readable format of staker creation data.
 */
export interface PlainCreateStakerData {
    raw: string;
    delegation: string | undefined;
}

/**
 * JSON-compatible and human-readable format of standard transaction proofs.
 */
export interface PlainStandardProof {
    raw: string;
    signature: string;
    publicKey: string;
    signer: string;
    pathLength: number;
}

/**
 * JSON-compatible and human-readable format of transaction receipts.
 */
export interface PlainTransactionReceipt {
    /**
     * The transaction\'s unique hash, used as its identifier. Sometimes also called `txId`.
     */
    transactionHash: string;
    /**
     * The transaction\'s block height where it is included in the blockchain.
     */
    blockHeight: number;
}

/**
 * JSON-compatible and human-readable format of transactions, including details about its state in the
 * blockchain. Contains all fields from {@link PlainTransaction}, plus additional fields such as
 * `blockHeight` and `timestamp` if the transaction is included in the blockchain.
 */
export interface PlainTransactionDetails extends PlainTransaction {
    state: TransactionState;
    executionResult?: boolean;
    blockHeight?: number;
    confirmations?: number;
    timestamp?: number;
}

/**
 * JSON-compatible and human-readable format of transactions. E.g. addresses are presented in their human-readable
 * format and address types and the network are represented as strings. Data and proof are serialized as an object
 * describing their contents (not yet implemented, only the `{ raw: string }` fallback is available).
 */
export interface PlainTransaction {
    /**
     * The transaction\'s unique hash, used as its identifier. Sometimes also called `txId`.
     */
    transactionHash: string;
    /**
     * The transaction\'s format. Nimiq transactions can have one of two formats: \"basic\" and \"extended\".
     * Basic transactions are simple value transfers between two regular address types and cannot contain
     * any extra data. Basic transactions can be serialized to less bytes, so take up less place on the
     * blockchain. Extended transactions on the other hand are all other transactions: contract creations
     * and interactions, staking transactions, transactions with extra data, etc.
     */
    format: "basic" | "extended";
    /**
     * The transaction\'s sender address in human-readable IBAN format.
     */
    sender: string;
    /**
     * The account type of the transaction\'s sender. \"basic\" are regular private-key controlled accounts,
     * \"vesting\" and \"htlc\" are contracts, and \"staking\" is the staking contract.
     */
    senderType: "basic" | "vesting" | "htlc" | "staking";
    /**
     * The transaction\'s recipient address in human-readable IBAN format.
     */
    recipient: string;
    /**
     * The account type of the transaction\'s recipient. \"basic\" are regular private-key controlled accounts,
     * \"vesting\" and \"htlc\" are contracts, and \"staking\" is the staking contract.
     */
    recipientType: "basic" | "vesting" | "htlc" | "staking";
    value: number;
    /**
     * The transaction\'s fee in luna (NIM\'s smallest unit).
     */
    fee: number;
    /**
     * The transaction\'s fee-per-byte in luna (NIM\'s smallest unit).
     */
    feePerByte: number;
    /**
     * The block height at which this transaction becomes valid. It is then valid for 7200 blocks (~2 hours).
     */
    validityStartHeight: number;
    /**
     * The network name on which this transaction is valid.
     */
    network: string;
    /**
     * Any flags that this transaction carries. `0b1 = 1` means it\'s a contract-creation transaction, `0b10 = 2`
     * means it\'s a signalling transaction with 0 value.
     */
    flags: number;
    /**
     * The `sender_data` field serves a purpose based on the transaction\'s sender type.
     * It is currently only used for extra information in transactions from the staking contract.
     */
    senderData?: PlainTransactionSenderData;
    /**
     * The `data` field of a transaction serves different purposes based on the transaction\'s recipient type.
     * For transactions to \"basic\" address types, this field can contain up to 64 bytes of unstructured data.
     * For transactions that create contracts or interact with the staking contract, the format of this field
     * must follow a fixed structure and defines the new contracts\' properties or how the staking contract is
     * changed.
     */
    data: PlainTransactionRecipientData;
    /**
     * The `proof` field contains the signature of the eligible signer. The proof field\'s structure depends on
     * the transaction\'s sender type. For transactions from contracts it can also contain additional structured
     * data before the signature.
     */
    proof: PlainTransactionProof;
    /**
     * The transaction\'s serialized size in bytes. It is used to determine the fee-per-byte that this
     * transaction pays.
     */
    size: number;
}

/**
 * JSON-compatible and human-readable format of update staker data.
 */
export interface PlainUpdateStakerData {
    raw: string;
    newDelegation: string | undefined;
    reactivateAllStake: boolean;
}

/**
 * JSON-compatible and human-readable format of validator creation data.
 */
export interface PlainCreateValidatorData {
    raw: string;
    signingKey: string;
    votingKey: string;
    rewardAddress: string;
    signalData: string | undefined;
    proofOfKnowledge: string;
}

/**
 * JSON-compatible and human-readable format of validator deactivation/reactivation data.
 * Used for DeactivateValidator & ReactivateValidator, as they have the same fields.
 */
export interface PlainValidatorData {
    raw: string;
    validator: string;
}

/**
 * JSON-compatible and human-readable format of validator update data.
 */
export interface PlainUpdateValidatorData {
    raw: string;
    newSigningKey: string | undefined;
    newVotingKey: string | undefined;
    newRewardAddress: string | undefined;
    newSignalData: string | undefined | undefined;
    newProofOfKnowledge: string | undefined;
}

/**
 * JSON-compatible and human-readable format of vesting creation data.
 */
export interface PlainVestingData {
    raw: string;
    owner: string;
    startTime: number;
    timeStep: number;
    stepAmount: number;
}

/**
 * Placeholder struct to serialize a raw proof of transactions, also works for empty/unset proofs
 */
export interface PlainRawProof {
    raw: string;
}

/**
 * Placeholder struct to serialize data of transactions as hex strings in the style of the Nimiq 1.0 library.
 */
export interface PlainRawData {
    raw: string;
}

/**
 * The slot/producer info for a micro block.
 */
export interface PlainSlot {
    /**
     * The slot number that produced this block.
     */
    slotNumber: number;
    /**
     * The validator address that produced this block, in user-friendly format.
     */
    validator: string;
    /**
     * The validator\'s BLS public key, in HEX format.
     */
    publicKey: string;
}

export interface PlainBasicAccount {
    balance: number;
}

export interface PlainClientConfiguration {
    networkId?: string;
    seedNodes?: string[];
    logLevel?: string;
    onlySecureWsConnections?: boolean;
    desiredPeerCount?: number;
    peerCountMax?: number;
    peerCountPerIpMax?: number;
    peerCountPerSubnetMax?: number;
    networkBufferSize?: number;
    syncMode?: string;
    numInitialConnections?: number;
}

export interface PlainHtlcContract {
    balance: number;
    sender: string;
    recipient: string;
    hashAlgorithm: string;
    hashRoot: string;
    hashCount: number;
    timeout: number;
    totalAmount: number;
}

export interface PlainMacroBlock extends PlainBlockCommonFields {
    /**
     * If true, this macro block is an election block finalizing an epoch.
     */
    isElectionBlock: boolean;
    /**
     * The round number this block was proposed in.
     */
    round: number;
    /**
     * The hash of the header of the preceding election macro block, in HEX format.
     */
    prevElectionHash: string;
}

export interface PlainMicroBlock extends PlainBlockCommonFields {
    /**
     * The producer of this micro block.
     */
    producer: PlainSlot;
}

export interface PlainStakingContract {
    balance: number;
    activeValidators: [string, number][];
    currentEpochDisabledSlots: [string, number[]][];
    previousDisabledSlots: number[];
}

export interface PlainVestingContract {
    balance: number;
    owner: string;
    startTime: number;
    timeStep: number;
    stepAmount: number;
    totalAmount: number;
}

export type PlainAccount = ({ type: "basic" } & PlainBasicAccount) | ({ type: "vesting" } & PlainVestingContract) | ({ type: "htlc" } & PlainHtlcContract) | ({ type: "staking" } & PlainStakingContract);

export type PlainBlock = ({ type: "macro" } & PlainMacroBlock) | ({ type: "micro" } & PlainMicroBlock);


export enum AccountType {
    Basic = 0,
    Vesting = 1,
    HTLC = 2,
    Staking = 3,
}

/**
 * An object representing a Nimiq address.
 * Offers methods to parse and format addresses from and to strings.
 */
export class Address {
    free(): void;
    [Symbol.dispose](): void;
    __getClassname(): string;
    /**
     * Compares this address to the other address.
     *
     * Returns -1 if this address is smaller than the other address, 0 if they are equal,
     * and 1 if this address is larger than the other address.
     */
    compare(other: Address): number;
    /**
     * Deserializes an address from a byte array.
     */
    static deserialize(bytes: Uint8Array): Address;
    /**
     * Returns if this address is equal to the other address.
     */
    equals(other: Address): boolean;
    /**
     * Parses an address from an {@link Address} instance, a hex string representation, or a byte array.
     *
     * Throws when an address cannot be parsed from the argument.
     */
    static fromAny(addr: Address | string | Uint8Array): Address;
    /**
     * Computes the multisig address of a list of signer public keys.
     */
    static fromPublicKeys(public_keys: (PublicKey | string | Uint8Array)[], num_signers: number): Address;
    /**
     * Parses an address from a string representation, either user-friendly or hex format.
     *
     * Throws when an address cannot be parsed from the string.
     */
    static fromString(str: string): Address;
    /**
     * Parses an address from its user-friendly string representation.
     *
     * Throws when an address cannot be parsed from the string.
     */
    static fromUserFriendlyAddress(str: string): Address;
    constructor(bytes: Uint8Array);
    /**
     * Returns the byte representation of the address.
     */
    serialize(): Uint8Array;
    /**
     * Formats the address into hex format.
     */
    toHex(): string;
    /**
     * Formats the address into a plain string format.
     */
    toPlain(): string;
    /**
     * Formats the address into user-friendly IBAN format.
     */
    toUserFriendlyAddress(): string;
    /**
     * The all-zeroes burn address.
     */
    static readonly NULL: Address;
}

/**
 * A BLS keypair
 * It is used by validators to vote during Tendermint rounds.
 * This is just a wrapper around our internal BLS structs
 */
export class BLSKeyPair {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Derives a keypair from an existing private key.
     */
    static derive(private_key: BLSSecretKey): BLSKeyPair;
    /**
     * Deserializes a keypair from a byte array.
     */
    static deserialize(bytes: Uint8Array): BLSKeyPair;
    /**
     * Generates a new keypair from secure randomness.
     */
    static generate(): BLSKeyPair;
    constructor(secret_key: BLSSecretKey, public_key: BLSPublicKey);
    /**
     * Serializes to a byte array.
     */
    serialize(): Uint8Array;
    /**
     * Formats the keypair into a hex string.
     */
    toHex(): string;
    /**
     * Gets the keypair's public key.
     */
    readonly publicKey: BLSPublicKey;
    /**
     * Gets the keypair's secret key.
     */
    readonly secretKey: BLSSecretKey;
}

/**
 * The public part of the BLS keypair.
 * This is specified in the staking contract to verify votes from Validators.
 */
export class BLSPublicKey {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Derives a public key from an existing private key.
     */
    static derive(secret_key: BLSSecretKey): BLSPublicKey;
    /**
     * Deserializes a public key from a byte array.
     */
    static deserialize(bytes: Uint8Array): BLSPublicKey;
    /**
     * Parses a public key from its hex representation.
     */
    static fromHex(hex: string): BLSPublicKey;
    /**
     * Creates a new public key from a byte array.
     */
    constructor(bytes: Uint8Array);
    /**
     * Serializes the public key to a byte array.
     */
    serialize(): Uint8Array;
    /**
     * Formats the public key into a hex string.
     */
    toHex(): string;
}

/**
 * The secret part of the BLS keypair.
 * This is specified in the config file, and is used by Validators to vote.
 */
export class BLSSecretKey {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Deserializes a private key from a byte array.
     */
    static deserialize(bytes: Uint8Array): BLSSecretKey;
    /**
     * Parses a private key from its hex representation.
     */
    static fromHex(hex: string): BLSSecretKey;
    /**
     * Generates a new private key from secure randomness.
     */
    static generate(): BLSSecretKey;
    /**
     * Creates a new private key from a byte array.
     */
    constructor(bytes: Uint8Array);
    /**
     * Serializes the private key to a byte array.
     */
    serialize(): Uint8Array;
    /**
     * Formats the private key into a hex string.
     */
    toHex(): string;
}

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
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Adds an event listener for consensus-change events, such as when consensus is established or lost.
     */
    addConsensusChangedListener(listener: (state: ConsensusState) => any): Promise<number>;
    /**
     * Adds an event listener for new blocks added to the blockchain.
     */
    addHeadChangedListener(listener: (hash: string, reason: string, reverted_blocks: string[], adopted_blocks: string[]) => any): Promise<number>;
    /**
     * Adds an event listener for peer-change events, such as when a new peer joins, or a peer leaves.
     */
    addPeerChangedListener(listener: (peer_id: string, reason: 'joined' | 'left', peer_count: number, peer_info?: PlainPeerInfo) => any): Promise<number>;
    /**
     * Adds an event listener for transactions to and from the provided addresses.
     *
     * The listener is called for transactions when they are _included_ in the blockchain.
     */
    addTransactionListener(listener: (transaction: PlainTransactionDetails) => any, addresses: (Address | string | Uint8Array)[]): Promise<number>;
    /**
     * This function is used to tell the network to (re)start connecting to peers.
     * This is could be used to tell the network to restart connection operations after
     * disconnect network is called.
     */
    connectNetwork(): Promise<void>;
    /**
     * Creates a new Client that automatically starts connecting to the network.
     */
    static create(config: PlainClientConfiguration): Promise<Client>;
    /**
     * This function is used to tell the network to disconnect from every connected
     * peer and stop trying to connect to other peers.
     *
     * **Important**: this function returns when the signal to disconnect was sent,
     * before all peers actually disconnect. This means that in order to ensure the
     * network is disconnected, wait for all peers to disappear after calling.
     */
    disconnectNetwork(): Promise<void>;
    /**
     * Fetches the account for the provided address from the network.
     *
     * Throws if the address cannot be parsed and on network errors.
     */
    getAccount(address: Address | string | Uint8Array): Promise<PlainAccount>;
    /**
     * Fetches the accounts for the provided addresses from the network.
     *
     * Throws if an address cannot be parsed and on network errors.
     */
    getAccounts(addresses: (Address | string | Uint8Array)[]): Promise<PlainAccount[]>;
    /**
     * Returns the current address books peers.
     * Each peer will have one address and currently no guarantee for the usefulness of that address can be given.
     *
     * The resulting Array may be empty if there is no peers in the address book.
     */
    getAddressBook(): Promise<PlainPeerInfo[]>;
    /**
     * Fetches a block by its hash.
     *
     * Throws if the client does not have the block.
     *
     * Fetching blocks from the network is not yet available.
     */
    getBlock(hash: string): Promise<PlainBlock>;
    /**
     * Fetches a block by its height (block number).
     *
     * Throws if the client does not have the block.
     *
     * Fetching blocks from the network is not yet available.
     */
    getBlockAt(height: number): Promise<PlainBlock>;
    /**
     * Returns the validators elected for the current epoch, together with the number of validator
     * slots assigned to each of them.
     *
     * The slot distribution is fixed for the duration of an epoch and is the metric used on-chain
     * to evaluate support for protocol upgrades. Combine this with {@link Client.getValidators} to
     * relate slot counts to each validator's stake and signal data.
     *
     * Throws if the elected validators are not available (e.g. before consensus is established).
     */
    getElectedValidators(): Promise<PlainElectedValidator[]>;
    /**
     * Returns the current blockchain head block.
     * Note that the web client is a light client and does not have block bodies, i.e. no transactions.
     */
    getHeadBlock(): Promise<PlainBlock>;
    /**
     * Returns the block hash of the current blockchain head.
     */
    getHeadHash(): Promise<string>;
    /**
     * Returns the block number of the current blockchain head.
     */
    getHeadHeight(): Promise<number>;
    /**
     * Returns the network ID that the client is connecting to.
     */
    getNetworkId(): Promise<number>;
    /**
     * Returns the blockchain protocol version the client currently uses to verify transactions.
     */
    getProtocolVersion(): Promise<number>;
    /**
     * Fetches the staker for the provided address from the network.
     *
     * Throws if the address cannot be parsed and on network errors.
     */
    getStaker(address: Address | string | Uint8Array): Promise<PlainStaker | undefined>;
    /**
     * Fetches the stakers for the provided addresses from the network.
     *
     * Throws if an address cannot be parsed and on network errors.
     */
    getStakers(addresses: (Address | string | Uint8Array)[]): Promise<(PlainStaker | undefined)[]>;
    /**
     * Fetches the transaction details for the given transaction hash.
     */
    getTransaction(hash: string): Promise<PlainTransactionDetails>;
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
     */
    getTransactionReceiptsByAddress(address: Address | string | Uint8Array, limit?: number | null, start_at?: string | null, min_peers?: number | null): Promise<PlainTransactionReceipt[]>;
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
     */
    getTransactionsByAddress(address: Address | string | Uint8Array, since_block_height?: number | null, known_transaction_details?: PlainTransactionDetails[] | null, start_at?: string | null, limit?: number | null, min_peers?: number | null): Promise<PlainTransactionDetails[]>;
    /**
     * Fetches the validator for the provided address from the network.
     *
     * Throws if the address cannot be parsed and on network errors.
     */
    getValidator(address: Address | string | Uint8Array): Promise<PlainValidator | undefined>;
    /**
     * Fetches the validators for the provided addresses from the network.
     *
     * Throws if an address cannot be parsed and on network errors.
     */
    getValidators(addresses: (Address | string | Uint8Array)[]): Promise<(PlainValidator | undefined)[]>;
    /**
     * Returns the version of the web client, including a `+dirty` build-metadata
     * suffix when it was built from a Git work tree with uncommitted changes.
     */
    getVersion(): Promise<string>;
    /**
     * Returns if the client currently has consensus with the network.
     */
    isConsensusEstablished(): Promise<boolean>;
    /**
     * Removes an event listener by its handle.
     */
    removeListener(handle: number): Promise<void>;
    /**
     * Sends a transaction to the network and returns {@link PlainTransactionDetails}.
     *
     * Throws in case of network errors.
     */
    sendTransaction(transaction: Transaction | PlainTransaction | string | Uint8Array): Promise<PlainTransactionDetails>;
    /**
     * Returns a promise that resolves when the client has established consensus with the network.
     */
    waitForConsensusEstablished(): Promise<void>;
}

/**
 * Use this to provide initialization-time configuration to the Client.
 * This is a simplified version of the configuration that is used for regular nodes,
 * since not all configuration knobs are available when running inside a browser.
 */
export class ClientConfiguration {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns a plain configuration object to be passed to `Client.create`.
     */
    build(): PlainClientConfiguration;
    /**
     * Sets the desired number of peers the client should try to connect to.
     * Default is `12`.
     */
    desiredPeerCount(desired_peer_count: number): void;
    /**
     * Sets the log level that is used when logging to the console.
     *
     * Possible values are `'trace' | 'debug' | 'info' | 'warn' | 'error'`.
     * Default is `'info'`.
     */
    logLevel(log_level: string): void;
    /**
     * Sets the network ID the client should use. Input is case-insensitive.
     *
     * Possible values are `'MainAlbatross' | 'TestAlbatross' | 'DevAlbatross'`.
     * Default is `'MainAlbatross'`.
     */
    network(network: string): void;
    /**
     * Sets the maximum network buffer size, which should be greater than 0
     * Default is `1024`.
     */
    networkBufferSize(network_buffer_size: number): void;
    /**
     * Creates a default client configuration that can be used to change the client's configuration.
     *
     * Use its `instantiateClient()` method to launch the client and connect to the network.
     */
    constructor();
    /**
     * Sets whether the client should only connect to secure WebSocket connections.
     * Default is `true`.
     */
    onlySecureWsConnections(only_secure_ws_connections: boolean): void;
    /**
     * Sets the maximum number of peers the client should connect to.
     * Default is `50`.
     */
    peerCountMax(peer_count_max: number): void;
    /**
     * Sets the maximum number of peers the client should connect to per IP address.
     * Default is `10`.
     */
    peerCountPerIpMax(peer_count_per_ip_max: number): void;
    /**
     * Sets the maximum number of peers the client should connect to per subnet.
     * Default is `10`.
     */
    peerCountPerSubnetMax(peer_count_per_subnet_max: number): void;
    /**
     * Sets the list of seed nodes that are used to connect to the Nimiq Albatross network.
     *
     * Each array entry must be a proper Multiaddr format string.
     *
     * Throws when an entry cannot be deserialized as a string.
     */
    seedNodes(seeds: any[]): void;
    /**
     * Sets the sync mode that should be used.
     * Only "light" and "pico" are supported for web clients
     * Default is "pico"
     */
    syncMode(sync_mode: string): void;
}

/**
 * A cryptographic commitment to a {@link RandomSecret}. The commitment is public, while the secret is, well, secret.
 */
export class Commitment {
    free(): void;
    [Symbol.dispose](): void;
    __getClassname(): string;
    /**
     * Derives a commitment from an existing random secret.
     */
    static derive(random_secret: RandomSecret): Commitment;
    /**
     * Deserializes a commitment from a byte array.
     *
     * Throws when the byte array contains less than 32 bytes.
     */
    static deserialize(bytes: Uint8Array): Commitment;
    /**
     * Returns if this commitment is equal to the other commitment.
     */
    equals(other: Commitment): boolean;
    /**
     * Parses a commitment from a {@link Commitment} instance, a hex string representation, or a byte array.
     *
     * Throws when a Commitment cannot be parsed from the argument.
     */
    static fromAny(commitment: Commitment | string | Uint8Array): Commitment;
    /**
     * Parses a commitment from its hex representation.
     *
     * Throws when the string is not valid hex format or when it represents less than 32 bytes.
     */
    static fromHex(hex: string): Commitment;
    /**
     * Creates a new commitment from a byte array.
     *
     * Throws when the byte array is not exactly 32 bytes long.
     */
    constructor(bytes: Uint8Array);
    /**
     * Serializes the commitment to a byte array.
     */
    serialize(): Uint8Array;
    /**
     * Sums up multiple commitments into one aggregated commitment.
     *
     * Attention: This is a simple summation, not a MuSig2 aggregation! For MuSig2 aggregation, use {@link Commitment.sumMuSig2}.
     */
    static sum(commitments: (Commitment | string | Uint8Array)[]): Commitment;
    /**
     * Aggregates commitments into one aggregated commitment using the MuSig2 scheme.
     *
     * - Each commitment group must correspond to the public key at the same index in the `publicKeys` array.
     * - The number of commitment groups and public keys must be the same.
     * - Each commitment group must contain exactly `MUSIG2_PARAMETER_V = 2` commitments.
     * - The `data` parameter is the same data that will be signed using the aggregated commitment, e.g. the serialized content of a transaction.
     *
     * Returns the aggregated commitment.
     */
    static sumMuSig2(public_keys: (PublicKey | string | Uint8Array)[], commitment_groups: (Commitment | string | Uint8Array)[][], data: Uint8Array): Commitment;
    /**
     * Formats the commitment into a hex string.
     */
    toHex(): string;
    readonly serializedSize: number;
    static readonly SIZE: number;
}

/**
 * A structure holding both a random secret and its corresponding public commitment.
 * This is similar to a `KeyPair`.
 */
export class CommitmentPair {
    free(): void;
    [Symbol.dispose](): void;
    __getClassname(): string;
    /**
     * Derives a commitment pair from an existing random secret.
     */
    static derive(random_secret: RandomSecret): CommitmentPair;
    /**
     * Deserializes a commitment pair from a byte array.
     *
     * Throws when the byte array contains less than 32 bytes.
     */
    static deserialize(bytes: Uint8Array): CommitmentPair;
    /**
     * Returns if this commitment pair is equal to the other commitment pair.
     */
    equals(other: CommitmentPair): boolean;
    /**
     * Parses a commitment pair from a {@link CommitmentPair} instance, a hex string representation, or a byte array.
     *
     * Throws when a CommitmentPair cannot be parsed from the argument.
     */
    static fromAny(pair: CommitmentPair | string | Uint8Array): CommitmentPair;
    /**
     * Parses a commitment pair from its hex representation.
     *
     * Throws when the string is not valid hex format or when it represents less than 32 bytes.
     */
    static fromHex(hex: string): CommitmentPair;
    static generate(): CommitmentPair;
    constructor(random_secret: RandomSecret, commitment: Commitment);
    /**
     * Serializes the commitment pair to a byte array.
     */
    serialize(): Uint8Array;
    /**
     * Formats the commitment pair into a hex string.
     */
    toHex(): string;
    readonly commitment: Commitment;
    readonly secret: RandomSecret;
    readonly serializedSize: number;
    static readonly SIZE: number;
}

export class CryptoUtils {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Computes a 64-byte [HMAC]-SHA512 hash from the input key and data.
     *
     * [HMAC]: https://en.wikipedia.org/wiki/HMAC
     */
    static computeHmacSha512(key: Uint8Array, data: Uint8Array): Uint8Array;
    /**
     * Computes a [PBKDF2]-over-SHA512 key from the password with the given parameters.
     *
     * [PBKDF2]: https://en.wikipedia.org/wiki/PBKDF2
     */
    static computePBKDF2sha512(password: Uint8Array, salt: Uint8Array, iterations: number, derived_key_length: number): Uint8Array;
    /**
     * Generates a secure random byte array of the given length.
     */
    static getRandomValues(length: number): Uint8Array;
    /**
     * Encrypts a message with an [OTP] [KDF] and the given parameters.
     * The KDF uses Argon2d for hashing.
     *
     * [OTP]: https://en.wikipedia.org/wiki/One-time_pad
     * [KDF]: https://en.wikipedia.org/wiki/Key_derivation_function
     */
    static otpKdf(message: Uint8Array, key: Uint8Array, salt: Uint8Array, iterations: number): Promise<Uint8Array>;
}

/**
 * The non-secret (public) part of an ES256 asymmetric key pair that is typically used to digitally verify or encrypt data.
 */
export class ES256PublicKey {
    free(): void;
    [Symbol.dispose](): void;
    __getClassname(): string;
    /**
     * Compares this public key to the other public key.
     *
     * Returns -1 if this public key is smaller than the other public key, 0 if they are equal,
     * and 1 if this public key is larger than the other public key.
     */
    compare(other: ES256PublicKey): number;
    /**
     * Deserializes a public key from a byte array.
     *
     * Throws when the byte array contains less than 33 bytes.
     */
    static deserialize(bytes: Uint8Array): ES256PublicKey;
    /**
     * Returns if this public key is equal to the other public key.
     */
    equals(other: ES256PublicKey): boolean;
    /**
     * Parses a public key from its hex representation.
     *
     * Throws when the string is not valid hex format or when it represents less than 33 bytes.
     */
    static fromHex(hex: string): ES256PublicKey;
    /**
     * Deserializes a public key from its raw representation.
     */
    static fromRaw(raw_bytes: Uint8Array): ES256PublicKey;
    /**
     * Deserializes a public key from its SPKI representation.
     */
    static fromSpki(spki_bytes: Uint8Array): ES256PublicKey;
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
     */
    constructor(bytes: Uint8Array);
    /**
     * Serializes the public key to a byte array.
     */
    serialize(): Uint8Array;
    /**
     * Gets the public key's address.
     */
    toAddress(): Address;
    /**
     * Formats the public key into a hex string.
     */
    toHex(): string;
    /**
     * Verifies that a signature is valid for this public key and the provided data.
     */
    verify(signature: ES256Signature, data: Uint8Array): boolean;
}

/**
 * An ES256 Signature represents a cryptographic proof that an ES256 private key signed some data.
 * It can be verified with the private key's public key.
 */
export class ES256Signature {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    __getClassname(): string;
    /**
     * Deserializes an ES256 signature from a byte array.
     *
     * Throws when the byte array contains less than 64 bytes.
     */
    static deserialize(bytes: Uint8Array): ES256Signature;
    /**
     * Parses an ES256 signature from its ASN.1 representation.
     */
    static fromAsn1(bytes: Uint8Array): ES256Signature;
    /**
     * Parses an ES256 signature from its hex representation.
     *
     * Throws when the string is not valid hex format or when it represents less than 64 bytes.
     */
    static fromHex(hex: string): ES256Signature;
    /**
     * Serializes the signature to a byte array.
     */
    serialize(): Uint8Array;
    /**
     * Formats the signature into a hex string.
     */
    toHex(): string;
}

export class Hash {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Computes a 32-byte [Blake2b] hash from the input data.
     *
     * Blake2b is used for example to compute a public key's address.
     *
     * [Blake2b]: https://en.wikipedia.org/wiki/BLAKE_(hash_function)
     */
    static computeBlake2b(data: Uint8Array): Uint8Array;
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
     */
    static computeNimiqArgon2d(password: Uint8Array, salt: Uint8Array, iterations: number, derived_key_length: number): Uint8Array;
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
     */
    static computeNimiqArgon2id(password: Uint8Array, salt: Uint8Array, iterations: number, derived_key_length: number): Uint8Array;
    /**
     * Computes a 32-byte [SHA256] hash from the input data.
     *
     * [SHA256]: https://en.wikipedia.org/wiki/SHA-2
     */
    static computeSha256(data: Uint8Array): Uint8Array;
    /**
     * Computes a 64-byte [SHA512] hash from the input data.
     *
     * [SHA512]: https://en.wikipedia.org/wiki/SHA-2
     */
    static computeSha512(data: Uint8Array): Uint8Array;
}

/**
 * Utility class providing methods to parse Hashed Time Locked Contract transaction data and proofs.
 */
export class HashedTimeLockedContract {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Parses the data of a Hashed Time Locked Contract creation transaction into a plain object.
     */
    static dataToPlain(data: Uint8Array): PlainTransactionRecipientData;
    /**
     * Parses the proof of a Hashed Time Locked Contract settlement transaction into a plain object.
     */
    static proofToPlain(proof: Uint8Array): PlainTransactionProof;
}

/**
 * A keypair represents a private key and its respective public key.
 * It is used for signing data, usually transactions.
 */
export class KeyPair {
    free(): void;
    [Symbol.dispose](): void;
    __getClassname(): string;
    /**
     * Derives a keypair from an existing private key.
     */
    static derive(private_key: PrivateKey): KeyPair;
    /**
     * Deserializes a keypair from a byte array.
     *
     * Throws when the byte array contains less than 64 bytes.
     */
    static deserialize(bytes: Uint8Array): KeyPair;
    /**
     * Parses a keypair from its hex representation.
     *
     * Throws when the string is not valid hex or does not represent a 64-byte keypair
     * (optionally followed by a 1-byte lock-state flag, as produced by `toHex`).
     */
    static fromHex(hex: string): KeyPair;
    /**
     * Generates a new keypair from secure randomness.
     */
    static generate(): KeyPair;
    constructor(private_key: PrivateKey, public_key: PublicKey);
    /**
     * Serializes the keypair to a byte array.
     */
    serialize(): Uint8Array;
    /**
     * Signs arbitrary data, returns a signature object.
     */
    sign(data: Uint8Array): Signature;
    /**
     * Signs a transaction and sets the signature proof on the transaction object.
     */
    signTransaction(transaction: Transaction): void;
    /**
     * Gets the keypair's address.
     */
    toAddress(): Address;
    /**
     * Formats the keypair into a hex string.
     */
    toHex(): string;
    /**
     * Gets the keypair's private key.
     */
    readonly privateKey: PrivateKey;
    /**
     * Gets the keypair's public key.
     */
    readonly publicKey: PublicKey;
}

/**
 * A Merkle path consisting of a sequence of hashes that can be used to verify the inclusion of a leaf in a Merkle tree.
 */
export class MerklePath {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Computes the Merkle root of the path given a leaf hash.
     */
    computeRoot(leaf: Uint8Array): Uint8Array;
    /**
     * Deserializes a Merkle path from a byte array.
     */
    static deserialize(data: Uint8Array): MerklePath;
    /**
     * Serializes the Merkle path into a byte array.
     */
    serialize(): Uint8Array;
    /**
     * Returns the hashes in the Merkle path.
     */
    readonly hashes: Uint8Array[];
    /**
     * Returns the length of the Merkle path.
     */
    readonly length: number;
}

/**
 * The Merkle tree is a data structure that allows for efficient verification of the membership of an element in a set.
 */
export class MerkleTree {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Computes the root of a Merkle tree from a list of Uint8Arrays.
     */
    static computeRoot(values: Uint8Array[]): Uint8Array;
}

/**
 * A partial signature is a signature of one of the co-signers in a multisig.
 * Combining all partial signatures yields the full signature (combining is done through summation).
 */
export class PartialSignature {
    free(): void;
    [Symbol.dispose](): void;
    __getClassname(): string;
    /**
     * Creates a new partial signature for the MuSig2 scheme.
     *
     * - `ownCommitmentPairs` must be 2 pairs of random secret and commitments generated for this signing session.
     * - `otherCommitments` must contain 2 commitments each for all other signers.
     *
     * Returns the created partial signature.
     */
    static create(own_private_key: PrivateKey, own_public_key: PublicKey, own_commitment_pairs: (CommitmentPair | string | Uint8Array)[], other_public_keys: (PublicKey | string | Uint8Array)[], other_commitments: (Commitment | string | Uint8Array)[][], data: Uint8Array): PartialSignature;
    /**
     * Deserializes a partial signature from a byte array.
     *
     * Throws when the byte array contains less than 32 bytes.
     */
    static deserialize(bytes: Uint8Array): PartialSignature;
    /**
     * Returns if this partial signature is equal to the other partial signature.
     */
    equals(other: PartialSignature): boolean;
    /**
     * Parses a partial signature from a {@link PartialSignature} instance, a hex string representation, or a byte array.
     *
     * Throws when a PartialSignature cannot be parsed from the argument.
     */
    static fromAny(sig: PartialSignature | string | Uint8Array): PartialSignature;
    /**
     * Parses a partial signature from its hex representation.
     *
     * Throws when the string is not valid hex format or when it represents less than 32 bytes.
     */
    static fromHex(hex: string): PartialSignature;
    /**
     * Creates a new partial signature from a byte array.
     *
     * Throws when the byte array is not exactly 32 bytes long.
     */
    constructor(bytes: Uint8Array);
    /**
     * Serializes the partial signature to a byte array.
     */
    serialize(): Uint8Array;
    /**
     * Sums an array of partial signatures into an aggregated partial signature.
     *
     * Afterwards, use `.toSignature(aggregatedCommitment)` on the result to get the final signature.
     */
    static sum(partial_signatures: (PartialSignature | string | Uint8Array)[]): PartialSignature;
    /**
     * Formats the partial signature into a hex string.
     */
    toHex(): string;
    /**
     * Converts a (aggregated) partial signature into a final signature using the aggregated commitment.
     */
    toSignature(aggregated_commitment: Commitment): Signature;
    readonly serializedSize: number;
    static readonly SIZE: number;
}

/**
 * Policy constants
 */
export class Policy {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Returns the batch number at a given `block_number` (height)
     */
    static batchAt(block_number: number): number;
    /**
     * Returns the percentage reduction that should be applied to the rewards due to a delayed batch.
     * This function returns a float in the range [0, 1]
     * I.e 1 means that the full rewards should be given, whereas 0.5 means that half of the rewards should be given
     * The input to this function is the batch delay, in milliseconds
     * The function is: [(1 - MINIMUM_REWARDS_PERCENTAGE) * BLOCKS_DELAY_DECAY ^ (t^2)] + MINIMUM_REWARDS_PERCENTAGE
     */
    static batchDelayPenalty(delay: bigint): number;
    /**
     * Returns the batch index at a given block number. The batch index is the number of a block relative
     * to the batch it is in. For example, the first block of any batch always has an batch index of 0.
     */
    static batchIndexAt(block_number: number): number;
    /**
     * Returns the first block after the jail period of a given block number has ended.
     */
    static blockAfterJail(block_number: number): number;
    /**
     * Returns the first block after the reporting window of a given block number has ended.
     */
    static blockAfterReportingWindow(block_number: number): number;
    /**
     * Returns the number (height) of the next election macro block after a given block number (height).
     */
    static electionBlockAfter(block_number: number): number;
    /**
     * Returns the block number (height) of the preceding election macro block before a given block number (height).
     * If the given block number is an election macro block, it returns the election macro block before it.
     */
    static electionBlockBefore(block_number: number): number;
    /**
     * Returns the block number of the election macro block of the given epoch (which is always the last block).
     * If the index is out of bounds, None is returned
     */
    static electionBlockOf(epoch: number): number | undefined;
    /**
     * Returns the epoch number at a given block number (height).
     */
    static epochAt(block_number: number): number;
    /**
     * Returns the epoch index at a given block number. The epoch index is the number of a block relative
     * to the epoch it is in. For example, the first block of any epoch always has an epoch index of 0.
     */
    static epochIndexAt(block_number: number): number;
    /**
     * Returns a boolean expressing if the batch at a given block number (height) is the first batch
     * of the epoch.
     */
    static firstBatchOfEpoch(block_number: number): boolean;
    /**
     * Returns the block number of the first block of the given epoch (which is always a micro block).
     * If the index is out of bounds, None is returned
     */
    static firstBlockOf(epoch: number): number | undefined;
    /**
     * Returns the block number of the first block of the given batch (which is always a micro block).
     * If the index is out of bounds, None is returned
     */
    static firstBlockOfBatch(batch: number): number | undefined;
    /**
     * Returns a boolean expressing if the block at a given block number (height) is an election macro block.
     */
    static isElectionBlockAt(block_number: number): boolean;
    /**
     * Returns a boolean expressing if the block at a given block number (height) is a macro block.
     */
    static isMacroBlockAt(block_number: number): boolean;
    /**
     * Returns a boolean expressing if the block at a given block number (height) is a micro block.
     */
    static isMicroBlockAt(block_number: number): boolean;
    /**
     * Returns the block height for the last block of the reporting window of a given block number.
     * Note: This window is meant for reporting malicious behaviour (aka `jailable` behaviour).
     */
    static lastBlockOfReportingWindow(block_number: number): number;
    /**
     * Returns the block number (height) of the last election macro block at a given block number (height).
     * If the given block number is an election macro block, then it returns that block number.
     */
    static lastElectionBlock(block_number: number): number;
    /**
     * Returns the block number (height) of the last macro block at a given block number (height).
     * If the given block number is a macro block, then it returns that block number.
     */
    static lastMacroBlock(block_number: number): number;
    /**
     * Returns the block number (height) of the next macro block after a given block number (height).
     * If the given block number is a macro block, it returns the macro block after it.
     */
    static macroBlockAfter(block_number: number): number;
    /**
     * Returns the block number (height) of the preceding macro block before a given block number (height).
     * If the given block number is a macro block, it returns the macro block before it.
     */
    static macroBlockBefore(block_number: number): number;
    /**
     * Returns the block number of the macro block (checkpoint or election) of the given batch (which
     * is always the last block).
     * If the index is out of bounds, None is returned
     */
    static macroBlockOf(batch: number): number | undefined;
    /**
     * Returns the supply at a given time (as Unix time) in Lunas (1 NIM = 100,000 Lunas). It is
     * calculated using the following formula:
     * ```text
     * supply(t) = total_supply - (total_supply - genesis_supply) * supply_decay^t
     * ```
     * Where t is the time in milliseconds since the PoS genesis block and `genesis_supply` is the supply at
     * the genesis of the Nimiq 2.0 chain.
     */
    static supplyAt(genesis_supply: bigint, genesis_time: bigint, current_time: bigint): bigint;
    /**
     * How many batches constitute an epoch
     */
    static readonly BATCHES_PER_EPOCH: number;
    /**
     * Length of a batch including the macro block
     */
    static readonly BLOCKS_PER_BATCH: number;
    /**
     * Length of an epoch including the election block
     */
    static readonly BLOCKS_PER_EPOCH: number;
    /**
     * Genesis block number
     */
    static readonly GENESIS_BLOCK_NUMBER: number;
    /**
     * Maximum supported protocol version
     */
    static readonly MAX_SUPPORTED_VERSION: number;
    /**
     * Maximum size of accounts trie chunks.
     */
    static readonly STATE_CHUNKS_MAX_SIZE: number;
    /**
     * Number of batches a transaction is valid with Albatross consensus.
     */
    static readonly TRANSACTION_VALIDITY_WINDOW: number;
    /**
     * Number of blocks a transaction is valid with Albatross consensus.
     */
    static readonly TRANSACTION_VALIDITY_WINDOW_BLOCKS: number;
    /**
     * The optimal time in milliseconds between blocks (1s)
     */
    static readonly BLOCK_SEPARATION_TIME: bigint;
    /**
     * The maximum size of the BLS public key cache.
     */
    static readonly BLS_CACHE_MAX_CAPACITY: number;
    /**
     * This is the address for the coinbase. Note that this is not a real account, it is just the
     * address we use to denote that some coins originated from a coinbase event.
     */
    static readonly COINBASE_ADDRESS: string;
    /**
     * Calculates f+1 slots which is the minimum number of slots necessary to be guaranteed to have at
     * least one honest slots. That's because from a total of 3f+1 slots at most f will be malicious.
     * It is calculated as `ceil(SLOTS/3)` and we use the formula `ceil(x/y) = (x+y-1)/y` for the
     * ceiling division.
     */
    static readonly F_PLUS_ONE: number;
    /**
     * Maximum size of history chunks.
     * 25 MB.
     */
    static readonly HISTORY_CHUNKS_MAX_SIZE: bigint;
    /**
     * The number of epochs a validator is put in jail for. The jailing only happens for severe offenses.
     */
    static readonly JAIL_EPOCHS: number;
    /**
     * The maximum allowed size, in bytes, for a micro block body.
     */
    static readonly MAX_SIZE_MICRO_BODY: number;
    /**
     * The minimum timeout in milliseconds for a validator to produce a block (4s)
     */
    static readonly MIN_PRODUCER_TIMEOUT: bigint;
    /**
     * Minimum number of epochs that the ChainStore will store fully
     */
    static readonly MIN_EPOCHS_STORED: number;
    /**
     * The minimum rewards percentage that we allow
     */
    static readonly MINIMUM_REWARDS_PERCENTAGE: number;
    /**
     * Number of available validator slots. Note that a single validator may own several validator slots.
     */
    static readonly SLOTS: number;
    /**
     * This is the address for the staking contract.
     */
    static readonly STAKING_CONTRACT_ADDRESS: string;
    /**
     * The maximum drift, in milliseconds, that is allowed between any block's timestamp and the node's
     * system time. We only care about drifting to the future.
     */
    static readonly TIMESTAMP_MAX_DRIFT: bigint;
    /**
     * Total supply in units.
     */
    static readonly TOTAL_SUPPLY: bigint;
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
     */
    static readonly TWO_F_PLUS_ONE: number;
    /**
     * The deposit necessary to create a validator in Lunas (1 NIM = 100,000 Lunas).
     * A validator is someone who actually participates in block production. They are akin to miners
     * in proof-of-work.
     */
    static readonly VALIDATOR_DEPOSIT: bigint;
}

/**
 * The secret (private) part of an asymmetric key pair that is typically used to digitally sign or decrypt data.
 */
export class PrivateKey {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Deserializes a private key from a byte array.
     *
     * Throws when the byte array contains less than 32 bytes.
     */
    static deserialize(bytes: Uint8Array): PrivateKey;
    /**
     * Returns if this private key is equal to the other private key.
     */
    equals(other: PrivateKey): boolean;
    /**
     * Parses a private key from its hex representation.
     *
     * Throws when the string is not valid hex format or when it represents less than 32 bytes.
     */
    static fromHex(hex: string): PrivateKey;
    /**
     * Generates a new private key from secure randomness.
     */
    static generate(): PrivateKey;
    /**
     * Creates a new private key from a byte array.
     *
     * Throws when the byte array is not exactly 32 bytes long.
     */
    constructor(bytes: Uint8Array);
    /**
     * Serializes the private key to a byte array.
     */
    serialize(): Uint8Array;
    /**
     * Formats the private key into a hex string.
     */
    toHex(): string;
    static readonly PURPOSE_ID: number;
    readonly serializedSize: number;
    static readonly SIZE: number;
}

/**
 * The non-secret (public) part of an asymmetric key pair that is typically used to digitally verify or encrypt data.
 */
export class PublicKey {
    free(): void;
    [Symbol.dispose](): void;
    __getClassname(): string;
    /**
     * Generates all possible combinations (sums) of delinearized public keys for a given number of signers.
     */
    static combinations(keys: (PublicKey | string | Uint8Array)[], num_signers: number): PublicKey[];
    /**
     * Compares this public key to the other public key.
     *
     * Returns -1 if this public key is smaller than the other public key, 0 if they are equal,
     * and 1 if this public key is larger than the other public key.
     */
    compare(other: PublicKey): number;
    /**
     * Derives a public key from an existing private key.
     */
    static derive(private_key: PrivateKey): PublicKey;
    /**
     * Deserializes a public key from a byte array.
     *
     * Throws when the byte array contains less than 32 bytes.
     */
    static deserialize(bytes: Uint8Array): PublicKey;
    /**
     * Returns if this public key is equal to the other public key.
     */
    equals(other: PublicKey): boolean;
    /**
     * Parses a public key from a {@link PublicKey} instance, a hex string representation, or a byte array.
     *
     * Throws when an PublicKey cannot be parsed from the argument.
     */
    static fromAny(key: PublicKey | string | Uint8Array): PublicKey;
    /**
     * Parses a public key from its hex representation.
     *
     * Throws when the string is not valid hex format or when it represents less than 32 bytes.
     */
    static fromHex(hex: string): PublicKey;
    /**
     * Deserializes a public key from its raw representation.
     */
    static fromRaw(raw_bytes: Uint8Array): PublicKey;
    /**
     * Deserializes a public key from its SPKI representation.
     */
    static fromSpki(spki_bytes: Uint8Array): PublicKey;
    /**
     * Creates a new public key from a byte array.
     *
     * Throws when the byte array is not exactly 32 bytes long.
     */
    constructor(bytes: Uint8Array);
    /**
     * Serializes the public key to a byte array.
     */
    serialize(): Uint8Array;
    /**
     * Sums public keys into one combined public key.
     */
    static sum(keys: (PublicKey | string | Uint8Array)[]): PublicKey;
    /**
     * Gets the public key's address.
     */
    toAddress(): Address;
    /**
     * Formats the public key into a hex string.
     */
    toHex(): string;
    /**
     * Verifies that a signature is valid for this public key and the provided data.
     */
    verify(signature: Signature, data: Uint8Array): boolean;
    readonly serializedSize: number;
    static readonly SIZE: number;
}

/**
 * A random secret that proves a {@link Commitment} for signing multisignature transactions.
 * It is supposed to be kept secret (similar to a private key).
 */
export class RandomSecret {
    free(): void;
    [Symbol.dispose](): void;
    __getClassname(): string;
    /**
     * Deserializes a random secret from a byte array.
     *
     * Throws when the byte array contains less than 32 bytes.
     */
    static deserialize(bytes: Uint8Array): RandomSecret;
    /**
     * Returns if this random secret is equal to the other random secret.
     */
    equals(other: RandomSecret): boolean;
    /**
     * Parses a random secret from a {@link RandomSecret} instance, a hex string representation, or a byte array.
     *
     * Throws when a RandomSecret cannot be parsed from the argument.
     */
    static fromAny(secret: RandomSecret | string | Uint8Array): RandomSecret;
    /**
     * Parses a random secret from its hex representation.
     *
     * Throws when the string is not valid hex format or when it represents less than 32 bytes.
     */
    static fromHex(hex: string): RandomSecret;
    /**
     * Creates a new random secret from a byte array.
     *
     * Throws when the byte array is not exactly 32 bytes long.
     */
    constructor(bytes: Uint8Array);
    /**
     * Serializes the random secret to a byte array.
     */
    serialize(): Uint8Array;
    /**
     * Formats the random secret into a hex string.
     */
    toHex(): string;
    readonly serializedSize: number;
    static readonly SIZE: number;
}

/**
 * An Ed25519 Signature represents a cryptographic proof that a private key signed some data.
 * It can be verified with the private key's public key.
 */
export class Signature {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    __getClassname(): string;
    /**
     * Create a signature from a private key and its public key over byte data.
     */
    static create(private_key: PrivateKey, public_key: PublicKey, data: Uint8Array): Signature;
    /**
     * Deserializes an Ed25519 signature from a byte array.
     *
     * Throws when the byte array contains less than 64 bytes.
     */
    static deserialize(bytes: Uint8Array): Signature;
    /**
     * Parses an Ed25519 signature from its ASN.1 representation.
     */
    static fromAsn1(bytes: Uint8Array): Signature;
    /**
     * Parses an Ed25519 signature from its hex representation.
     *
     * Throws when the string is not valid hex format or when it represents less than 64 bytes.
     */
    static fromHex(hex: string): Signature;
    /**
     * Serializes the signature to a byte array.
     */
    serialize(): Uint8Array;
    /**
     * Formats the signature into a hex string.
     */
    toHex(): string;
}

/**
 * A signature proof represents a signature together with its public key and the public key's merkle path.
 * It is used as the proof for transactions.
 */
export class SignatureProof {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Deserializes a signature proof from a byte array.
     */
    static deserialize(bytes: Uint8Array): SignatureProof;
    /**
     * Checks if the signature proof is signed by the provided address.
     */
    isSignedBy(sender: Address): boolean;
    /**
     * Creates a Ed25519/Schnorr signature proof for a multi-sig signature.
     * The public keys can also include ES256 keys.
     */
    static multiSig(signer_key: PublicKey, public_keys: (PublicKey | ES256PublicKey)[], signature: Signature): SignatureProof;
    /**
     * Serializes the proof to a byte array, e.g. for assigning it to a `transaction.proof` field.
     */
    serialize(): Uint8Array;
    /**
     * Creates a Ed25519/Schnorr signature proof for a single-sig signature.
     */
    static singleSig(public_key: PublicKey, signature: Signature): SignatureProof;
    /**
     * Creates a JSON-compatible plain object representing the signature proof.
     */
    toPlain(): PlainTransactionProof;
    /**
     * Verifies the signature proof against the provided data.
     */
    verify(data: Uint8Array): boolean;
    /**
     * Creates a Webauthn signature proof for a multi-sig signature.
     */
    static webauthnMultiSig(signer_key: PublicKey | ES256PublicKey, public_keys: (PublicKey | ES256PublicKey)[], signature: Signature | ES256Signature, authenticator_data: Uint8Array, client_data_json: Uint8Array): SignatureProof;
    /**
     * Creates a Webauthn signature proof for a single-sig signature.
     */
    static webauthnSingleSig(public_key: PublicKey | ES256PublicKey, signature: Signature | ES256Signature, authenticator_data: Uint8Array, client_data_json: Uint8Array): SignatureProof;
    static readonly ES256_SINGLE_SIG_SIZE: number;
    /**
     * The embedded merkle path.
     */
    readonly merklePath: MerklePath;
    /**
     * The embedded public key.
     */
    readonly publicKey: PublicKey | ES256PublicKey;
    /**
     * The embedded signature.
     */
    readonly signature: Signature | ES256Signature;
    static readonly SINGLE_SIG_SIZE: number;
}

/**
 * Utility class providing methods to parse Staking Contract transaction data and proofs.
 */
export class StakingContract {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Parses the data of a Staking Contract incoming transaction into a plain object.
     */
    static dataToPlain(data: Uint8Array): PlainTransactionRecipientData;
    /**
     * Parses the proof of a Staking Contract outgoing transaction into a plain object.
     */
    static proofToPlain(proof: Uint8Array): PlainTransactionProof;
}

/**
 * The StakingDataBuilder class provides helper methods to easily create staking transaction data.
 * To decode the data into plain objects, use `StakingContract.dataToPlain()`.
 */
export class StakingDataBuilder {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Creates staking transaction data for adding stake to a staker.
     *
     * Note: This data does not need to be signed seperately and can be used as-is.
     */
    static addStake(staker_address: Address): Uint8Array;
    /**
     * Creates staking transaction data for creating a staker.
     *
     * Note: The created data contains an empty signature proof. To add a valid proof:
     * 1. Set the data on the transaction as `tx.data`
     * 2. Create a signature proof over the transaction with the staker's keypair
     * 3. Use `StakingDataBuilder.setProof(tx.data, proof)` to set the created proof on the staking data
     * 4. Set the updated staking data back on the transaction as `tx.data`
     */
    static createStaker(delegation: Address | undefined): Uint8Array;
    /**
     * Creates staking transaction data for removing stake from the staking contract.
     *
     * Attention: This is used as `senderData` in a transaction with the staking contract as the sender and the staker as signer.
     */
    static removeStake(): Uint8Array;
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
     */
    static retireStake(retire_stake: bigint): Uint8Array;
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
     */
    static setActiveStake(new_active_balance: bigint): Uint8Array;
    /**
     * Sets the signature proof on the provided staking transaction data.
     */
    static setProof(data: Uint8Array, proof: SignatureProof): Uint8Array;
    /**
     * Creates staking transaction data for updating a staker.
     *
     * Note: The created data contains an empty signature proof. To add a valid proof:
     * 1. Set the data on the transaction as `tx.data`
     * 2. Create a signature proof over the transaction with the staker's keypair
     * 3. Use `StakingDataBuilder.setProof(tx.data, proof)` to set the created proof on the staking data
     * 4. Set the updated staking data back on the transaction as `tx.data`
     */
    static updateStaker(new_delegation: Address | undefined, reactivate_all_stake: boolean): Uint8Array;
}

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
    free(): void;
    [Symbol.dispose](): void;
    __getClassname(): string;
    /**
     * Deserializes a transaction from a byte array.
     */
    static deserialize(bytes: Uint8Array): Transaction;
    /**
     * Parses a transaction from a {@link Transaction} instance, a plain object, a hex string
     * representation, or a byte array.
     *
     * Throws when a transaction cannot be parsed from the argument.
     */
    static fromAny(tx: Transaction | PlainTransaction | string | Uint8Array): Transaction;
    /**
     * Parses a transaction from a plain object.
     *
     * Throws when a transaction cannot be parsed from the argument.
     */
    static fromPlain(plain: PlainTransaction): Transaction;
    /**
     * Returns the address of the contract that is created with this transaction.
     */
    getContractCreationAddress(): Address;
    /**
     * Computes the transaction's hash, which is used as its unique identifier on the blockchain.
     */
    hash(): string;
    /**
     * Tests if the transaction is valid at the specified block height.
     */
    isValidAt(block_height: number): boolean;
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
     */
    constructor(sender: Address, sender_type: number | null | undefined, sender_data: Uint8Array | null | undefined, recipient: Address, recipient_type: number | null | undefined, recipient_data: Uint8Array | null | undefined, value: bigint, fee: bigint, flags: number | null | undefined, validity_start_height: number, network_id: number);
    /**
     * Serializes the transaction to a byte array.
     */
    serialize(): Uint8Array;
    /**
     * Serializes the transaction's content to be used for creating its signature.
     */
    serializeContent(): Uint8Array;
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
     */
    sign(key_pair: KeyPair, inner_key_pair: KeyPair | undefined): void;
    /**
     * Serializes the transaction into a HEX string.
     */
    toHex(): string;
    /**
     * Creates a JSON-compatible plain object representing the transaction.
     */
    toPlain(genesis_block_number?: number | null, genesis_timestamp?: bigint | null): PlainTransaction;
    /**
     * Verifies that a transaction has valid properties and a valid signature proof for the
     * provided `protocol_version`.
     * Optionally checks if the transaction is valid on the provided network.
     *
     * **Throws with any transaction validity error.** Returns without exception if the transaction is valid.
     *
     * A `protocol_version` of `0` is accepted for backwards-compatible pre-upgrade validation.
     * Throws when the given networkId is unknown.
     */
    verify(protocol_version: number, network_id?: number | null): void;
    /**
     * The transaction's data as a byte array.
     */
    data: Uint8Array;
    /**
     * The transaction's fee in luna (NIM's smallest unit).
     */
    readonly fee: bigint;
    /**
     * The transaction's fee per byte in luna (NIM's smallest unit).
     */
    readonly feePerByte: number;
    /**
     * The transaction's flags: `0b1` = contract creation, `0b10` = signaling.
     * Bit patterns outside the known variants collapse to `None`.
     * Inspect `toPlain().flags` for the raw value.
     */
    readonly flags: TransactionFlag;
    /**
     * The transaction's {@link TransactionFormat}.
     */
    readonly format: TransactionFormat;
    /**
     * The transaction's network ID.
     */
    readonly networkId: number;
    /**
     * The transaction's signature proof as a byte array.
     */
    proof: Uint8Array;
    /**
     * The transaction's recipient address.
     */
    readonly recipient: Address;
    /**
     * The transaction's recipient {@link AccountType}.
     */
    readonly recipientType: AccountType;
    /**
     * The transaction's sender address.
     */
    readonly sender: Address;
    /**
     * The transaction's sender data as a byte array.
     */
    readonly senderData: Uint8Array;
    /**
     * The transaction's sender {@link AccountType}.
     */
    readonly senderType: AccountType;
    /**
     * The transaction's byte size.
     */
    readonly serializedSize: number;
    /**
     * The transaction's validity-start height. The transaction is valid for 2 hours after this block height.
     */
    readonly validityStartHeight: number;
    /**
     * The transaction's value in luna (NIM's smallest unit).
     */
    readonly value: bigint;
}

/**
 * The TransactionBuilder class provides helper methods to easily create standard types of transactions.
 * It can only be instantiated from a Client with `client.transactionBuilder()`.
 */
export class TransactionBuilder {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Adds stake to a staker in the staking contract and transfers `value` amount of luna (NIM's smallest unit)
     * from the sender account to this staker.
     *
     * The returned transaction is not yet signed. You can sign it e.g. with `tx.sign(keyPair)`.
     *
     * Throws when the numbers given for value and fee do not fit within a u64 or the networkId is unknown.
     */
    static newAddStake(sender: Address, staker_address: Address, value: bigint, fee: bigint | null | undefined, validity_start_height: number, network_id: number): Transaction;
    /**
     * Creates a basic transaction that transfers `value` amount of luna (NIM's smallest unit) from the
     * sender to the recipient.
     *
     * The returned transaction is not yet signed. You can sign it e.g. with `tx.sign(keyPair)`.
     *
     * Throws when the numbers given for value and fee do not fit within a u64 or the networkId is unknown.
     */
    static newBasic(sender: Address, recipient: Address, value: bigint, fee: bigint | null | undefined, validity_start_height: number, network_id: number): Transaction;
    /**
     * Creates a basic transaction that transfers `value` amount of luna (NIM's smallest unit) from the
     * sender to the recipient. It can include arbitrary `data`, up to 64 bytes.
     *
     * The returned transaction is not yet signed. You can sign it e.g. with `tx.sign(keyPair)`.
     *
     * Throws when the numbers given for value and fee do not fit within a u64 or the networkId is unknown.
     */
    static newBasicWithData(sender: Address, recipient: Address, data: Uint8Array, value: bigint, fee: bigint | null | undefined, validity_start_height: number, network_id: number): Transaction;
    /**
     * Creates a new staker in the staking contract and transfers `value` amount of luna (NIM's smallest unit)
     * from the sender account to this new staker.
     *
     * The returned transaction is not yet signed. You can sign it e.g. with `tx.sign(keyPair)`.
     *
     * Throws when the numbers given for value and fee do not fit within a u64 or the networkId is unknown.
     */
    static newCreateStaker(sender: Address, delegation: Address | undefined, value: bigint, fee: bigint | null | undefined, validity_start_height: number, network_id: number): Transaction;
    /**
     * Registers a new validator in the staking contract.
     *
     * The returned transaction is not yet signed. You can sign it e.g. with `tx.sign(keyPair)`.
     *
     * Throws when the fee does not fit within a u64 or the `networkId` is unknown.
     */
    static newCreateValidator(sender: Address, reward_address: Address, signing_key: PublicKey, voting_key_pair: BLSKeyPair, signal_data: string | null | undefined, fee: bigint | null | undefined, validity_start_height: number, network_id: number): Transaction;
    /**
     * Deactivates a validator in the staking contract.
     *
     * The returned transaction is not yet signed. You can sign it e.g. with `tx.sign(keyPair)`.
     *
     * Throws when the fee does not fit within a u64 or the `networkId` is unknown.
     */
    static newDeactivateValidator(sender: Address, validator: Address, fee: bigint | null | undefined, validity_start_height: number, network_id: number): Transaction;
    /**
     * Deleted a validator the staking contract. The deposit is returned to the Sender
     *
     * The returned transaction is not yet signed. You can sign it e.g. with `tx.sign(keyPair)`.
     *
     * Throws when the fee does not fit within a u64 or the `networkId` is unknown.
     */
    static newDeleteValidator(sender: Address, fee: bigint | null | undefined, validity_start_height: number, network_id: number): Transaction;
    /**
     * Removes stake from the staking contract and transfers `value` amount of luna (NIM's smallest unit)
     * from the staker to the recipient.
     *
     * The returned transaction is not yet signed. You can sign it e.g. with `tx.sign(keyPair)`.
     *
     * Throws when the numbers given for value and fee do not fit within a u64 or the networkId is unknown.
     */
    static newRemoveStake(recipient: Address, value: bigint, fee: bigint | null | undefined, validity_start_height: number, network_id: number): Transaction;
    /**
     * Retires a portion of the inactive stake balance of the staker. This is a
     * signaling transaction and as such does not transfer any value.
     *
     * The returned transaction is not yet signed. You can sign it e.g. with `tx.sign(keyPair)`.
     *
     * Throws when the numbers given for fee and `retire_stake` do not fit within a u64 or the networkId is unknown.
     */
    static newRetireStake(sender: Address, retire_stake: bigint, fee: bigint | null | undefined, validity_start_height: number, network_id: number): Transaction;
    /**
     * Retires a validator in the staking contract.
     *
     * The returned transaction is not yet signed. You can sign it e.g. with `tx.sign(keyPair)`.
     *
     * Throws when the fee does not fit within a u64 or the `networkId` is unknown.
     */
    static newRetireValidator(sender: Address, fee: bigint | null | undefined, validity_start_height: number, network_id: number): Transaction;
    /**
     * Sets the active stake balance of the staker. This is a
     * signaling transaction and as such does not transfer any value.
     *
     * The returned transaction is not yet signed. You can sign it e.g. with `tx.sign(keyPair)`.
     *
     * Throws when the numbers given for fee and `new_active_balance` do not fit within a u64 or the networkId is unknown.
     */
    static newSetActiveStake(sender: Address, new_active_balance: bigint, fee: bigint | null | undefined, validity_start_height: number, network_id: number): Transaction;
    /**
     * Updates a staker in the staking contract to stake for a different validator. This is a
     * signaling transaction and as such does not transfer any value.
     *
     * The returned transaction is not yet signed. You can sign it e.g. with `tx.sign(keyPair)`.
     *
     * Throws when the number given for fee does not fit within a u64 or the networkId is unknown.
     */
    static newUpdateStaker(sender: Address, new_delegation: Address | undefined, reactivate_all_stake: boolean, fee: bigint | null | undefined, validity_start_height: number, network_id: number): Transaction;
    /**
     * Updates parameters of a validator in the staking contract.
     *
     * The returned transaction is not yet signed. You can sign it e.g. with `tx.sign(keyPair)`.
     *
     * Throws when the fee does not fit within a u64 or the `networkId` is unknown.
     */
    static newUpdateValidator(sender: Address, reward_address: Address | null | undefined, signing_key: PublicKey | null | undefined, voting_key_pair: BLSKeyPair | null | undefined, signal_data: string | null | undefined, fee: bigint | null | undefined, validity_start_height: number, network_id: number): Transaction;
}

/**
 * A transaction flag signals a special purpose of the transaction. `ContractCreation` must be set
 * to create new vesting contracts or HTLCs. `Signaling` must be set to interact with the staking
 * contract for non-value transactions. All other transactions' flag is set to `None`.
 */
export enum TransactionFlag {
    None = 0,
    ContractCreation = 1,
    Signaling = 2,
}

export enum TransactionFormat {
    Basic = 0,
    Extended = 1,
}

/**
 * Utility class providing methods to parse Vesting Contract transaction data and proofs.
 */
export class VestingContract {
    private constructor();
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Parses the data of a Vesting Contract creation transaction into a plain object.
     */
    static dataToPlain(data: Uint8Array, tx_value: bigint): PlainTransactionRecipientData;
    /**
     * Parses the proof of a Vesting Contract claiming transaction into a plain object.
     */
    static proofToPlain(proof: Uint8Array): PlainTransactionProof;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_clientconfiguration_free: (a: number, b: number) => void;
    readonly __wbg_commitmentpair_free: (a: number, b: number) => void;
    readonly __wbg_cryptoutils_free: (a: number, b: number) => void;
    readonly __wbg_es256signature_free: (a: number, b: number) => void;
    readonly __wbg_hash_free: (a: number, b: number) => void;
    readonly __wbg_keypair_free: (a: number, b: number) => void;
    readonly __wbg_partialsignature_free: (a: number, b: number) => void;
    readonly __wbg_randomsecret_free: (a: number, b: number) => void;
    readonly __wbg_stakingdatabuilder_free: (a: number, b: number) => void;
    readonly __wbg_transaction_free: (a: number, b: number) => void;
    readonly clientconfiguration_build: (a: number) => any;
    readonly clientconfiguration_desiredPeerCount: (a: number, b: number) => void;
    readonly clientconfiguration_logLevel: (a: number, b: number, c: number) => void;
    readonly clientconfiguration_network: (a: number, b: number, c: number) => [number, number];
    readonly clientconfiguration_networkBufferSize: (a: number, b: number) => void;
    readonly clientconfiguration_new: () => number;
    readonly clientconfiguration_onlySecureWsConnections: (a: number, b: number) => void;
    readonly clientconfiguration_peerCountMax: (a: number, b: number) => void;
    readonly clientconfiguration_peerCountPerIpMax: (a: number, b: number) => void;
    readonly clientconfiguration_peerCountPerSubnetMax: (a: number, b: number) => void;
    readonly clientconfiguration_seedNodes: (a: number, b: number, c: number) => [number, number];
    readonly clientconfiguration_syncMode: (a: number, b: number, c: number) => void;
    readonly commitmentpair___getClassname: (a: number) => [number, number];
    readonly commitmentpair_commitment: (a: number) => number;
    readonly commitmentpair_derive: (a: number) => number;
    readonly commitmentpair_deserialize: (a: number, b: number) => [number, number, number];
    readonly commitmentpair_equals: (a: number, b: number) => number;
    readonly commitmentpair_fromAny: (a: any) => [number, number, number];
    readonly commitmentpair_fromHex: (a: number, b: number) => [number, number, number];
    readonly commitmentpair_generate: () => number;
    readonly commitmentpair_new: (a: number, b: number) => number;
    readonly commitmentpair_secret: (a: number) => number;
    readonly commitmentpair_serialize: (a: number) => [number, number];
    readonly commitmentpair_serialized_size: (a: number) => number;
    readonly commitmentpair_size: () => number;
    readonly commitmentpair_toHex: (a: number) => [number, number];
    readonly cryptoutils_computeHmacSha512: (a: number, b: number, c: number, d: number) => [number, number];
    readonly cryptoutils_computePBKDF2sha512: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly cryptoutils_getRandomValues: (a: number) => [number, number];
    readonly cryptoutils_otpKdf: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => any;
    readonly es256signature___getClassname: (a: number) => [number, number];
    readonly es256signature_deserialize: (a: number, b: number) => [number, number, number];
    readonly es256signature_fromAsn1: (a: number, b: number) => [number, number, number];
    readonly es256signature_fromHex: (a: number, b: number) => [number, number, number];
    readonly es256signature_serialize: (a: number) => [number, number];
    readonly es256signature_toHex: (a: number) => [number, number];
    readonly hash_computeBlake2b: (a: number, b: number) => [number, number];
    readonly hash_computeNimiqArgon2d: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly hash_computeNimiqArgon2id: (a: number, b: number, c: number, d: number, e: number, f: number) => [number, number, number, number];
    readonly hash_computeSha256: (a: number, b: number) => [number, number];
    readonly hash_computeSha512: (a: number, b: number) => [number, number];
    readonly keypair___getClassname: (a: number) => [number, number];
    readonly keypair_derive: (a: number) => number;
    readonly keypair_deserialize: (a: number, b: number) => [number, number, number];
    readonly keypair_fromHex: (a: number, b: number) => [number, number, number];
    readonly keypair_generate: () => number;
    readonly keypair_new: (a: number, b: number) => number;
    readonly keypair_privateKey: (a: number) => number;
    readonly keypair_publicKey: (a: number) => number;
    readonly keypair_serialize: (a: number) => [number, number];
    readonly keypair_sign: (a: number, b: number, c: number) => number;
    readonly keypair_signTransaction: (a: number, b: number) => [number, number];
    readonly keypair_toAddress: (a: number) => number;
    readonly keypair_toHex: (a: number) => [number, number];
    readonly partialsignature___getClassname: (a: number) => [number, number];
    readonly partialsignature_create: (a: number, b: number, c: any, d: any, e: any, f: number, g: number) => [number, number, number];
    readonly partialsignature_deserialize: (a: number, b: number) => [number, number, number];
    readonly partialsignature_equals: (a: number, b: number) => number;
    readonly partialsignature_fromAny: (a: any) => [number, number, number];
    readonly partialsignature_fromHex: (a: number, b: number) => [number, number, number];
    readonly partialsignature_new: (a: number, b: number) => [number, number, number];
    readonly partialsignature_serialize: (a: number) => [number, number];
    readonly partialsignature_serialized_size: (a: number) => number;
    readonly partialsignature_size: () => number;
    readonly partialsignature_sum: (a: any) => [number, number, number];
    readonly partialsignature_toHex: (a: number) => [number, number];
    readonly partialsignature_toSignature: (a: number, b: number) => number;
    readonly randomsecret___getClassname: (a: number) => [number, number];
    readonly randomsecret_deserialize: (a: number, b: number) => [number, number, number];
    readonly randomsecret_equals: (a: number, b: number) => number;
    readonly randomsecret_fromAny: (a: any) => [number, number, number];
    readonly randomsecret_fromHex: (a: number, b: number) => [number, number, number];
    readonly randomsecret_new: (a: number, b: number) => [number, number, number];
    readonly randomsecret_serialize: (a: number) => [number, number];
    readonly randomsecret_serialized_size: (a: number) => number;
    readonly randomsecret_toHex: (a: number) => [number, number];
    readonly stakingdatabuilder_addStake: (a: number) => [number, number];
    readonly stakingdatabuilder_createStaker: (a: any) => [number, number, number, number];
    readonly stakingdatabuilder_removeStake: () => [number, number];
    readonly stakingdatabuilder_retireStake: (a: bigint) => [number, number, number, number];
    readonly stakingdatabuilder_setActiveStake: (a: bigint) => [number, number, number, number];
    readonly stakingdatabuilder_setProof: (a: number, b: number, c: number) => [number, number, number, number];
    readonly stakingdatabuilder_updateStaker: (a: any, b: number) => [number, number, number, number];
    readonly transaction___getClassname: (a: number) => [number, number];
    readonly transaction_data: (a: number) => [number, number];
    readonly transaction_deserialize: (a: number, b: number) => [number, number, number];
    readonly transaction_fee: (a: number) => bigint;
    readonly transaction_feePerByte: (a: number) => number;
    readonly transaction_flags: (a: number) => number;
    readonly transaction_format: (a: number) => number;
    readonly transaction_fromAny: (a: any) => [number, number, number];
    readonly transaction_fromPlain: (a: any) => [number, number, number];
    readonly transaction_getContractCreationAddress: (a: number) => number;
    readonly transaction_hash: (a: number) => [number, number];
    readonly transaction_isValidAt: (a: number, b: number) => number;
    readonly transaction_networkId: (a: number) => number;
    readonly transaction_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: bigint, j: bigint, k: number, l: number, m: number) => [number, number, number];
    readonly transaction_proof: (a: number) => [number, number];
    readonly transaction_recipient: (a: number) => number;
    readonly transaction_recipientType: (a: number) => number;
    readonly transaction_sender: (a: number) => number;
    readonly transaction_senderData: (a: number) => [number, number];
    readonly transaction_senderType: (a: number) => number;
    readonly transaction_serialize: (a: number) => [number, number];
    readonly transaction_serializeContent: (a: number) => [number, number];
    readonly transaction_serializedSize: (a: number) => number;
    readonly transaction_set_data: (a: number, b: number, c: number) => void;
    readonly transaction_set_proof: (a: number, b: number, c: number) => void;
    readonly transaction_sign: (a: number, b: number, c: any) => [number, number];
    readonly transaction_toHex: (a: number) => [number, number];
    readonly transaction_toPlain: (a: number, b: number, c: number, d: bigint) => [number, number, number];
    readonly transaction_validityStartHeight: (a: number) => number;
    readonly transaction_value: (a: number) => bigint;
    readonly transaction_verify: (a: number, b: number, c: number) => [number, number];
    readonly randomsecret_size: () => number;
    readonly __wbg_address_free: (a: number, b: number) => void;
    readonly __wbg_blskeypair_free: (a: number, b: number) => void;
    readonly __wbg_blspublickey_free: (a: number, b: number) => void;
    readonly __wbg_blssecretkey_free: (a: number, b: number) => void;
    readonly __wbg_commitment_free: (a: number, b: number) => void;
    readonly __wbg_es256publickey_free: (a: number, b: number) => void;
    readonly __wbg_merklepath_free: (a: number, b: number) => void;
    readonly __wbg_privatekey_free: (a: number, b: number) => void;
    readonly __wbg_publickey_free: (a: number, b: number) => void;
    readonly __wbg_signature_free: (a: number, b: number) => void;
    readonly address___getClassname: (a: number) => [number, number];
    readonly address_compare: (a: number, b: number) => number;
    readonly address_deserialize: (a: number, b: number) => [number, number, number];
    readonly address_equals: (a: number, b: number) => number;
    readonly address_fromAny: (a: any) => [number, number, number];
    readonly address_fromPublicKeys: (a: any, b: number) => [number, number, number];
    readonly address_fromString: (a: number, b: number) => [number, number, number];
    readonly address_fromUserFriendlyAddress: (a: number, b: number) => [number, number, number];
    readonly address_new: (a: number, b: number) => [number, number, number];
    readonly address_null: () => number;
    readonly address_serialize: (a: number) => [number, number];
    readonly address_toHex: (a: number) => [number, number];
    readonly address_toPlain: (a: number) => [number, number];
    readonly blskeypair_derive: (a: number) => number;
    readonly blskeypair_deserialize: (a: number, b: number) => [number, number, number];
    readonly blskeypair_generate: () => number;
    readonly blskeypair_new: (a: number, b: number) => number;
    readonly blskeypair_publicKey: (a: number) => number;
    readonly blskeypair_secretKey: (a: number) => number;
    readonly blskeypair_serialize: (a: number) => [number, number];
    readonly blskeypair_toHex: (a: number) => [number, number];
    readonly blspublickey_derive: (a: number) => number;
    readonly blspublickey_deserialize: (a: number, b: number) => [number, number, number];
    readonly blspublickey_fromHex: (a: number, b: number) => [number, number, number];
    readonly blspublickey_new: (a: number, b: number) => [number, number, number];
    readonly blspublickey_serialize: (a: number) => [number, number];
    readonly blspublickey_toHex: (a: number) => [number, number];
    readonly blssecretkey_deserialize: (a: number, b: number) => [number, number, number];
    readonly blssecretkey_fromHex: (a: number, b: number) => [number, number, number];
    readonly blssecretkey_generate: () => number;
    readonly blssecretkey_new: (a: number, b: number) => [number, number, number];
    readonly blssecretkey_serialize: (a: number) => [number, number];
    readonly blssecretkey_toHex: (a: number) => [number, number];
    readonly commitment___getClassname: (a: number) => [number, number];
    readonly commitment_derive: (a: number) => number;
    readonly commitment_deserialize: (a: number, b: number) => [number, number, number];
    readonly commitment_equals: (a: number, b: number) => number;
    readonly commitment_fromAny: (a: any) => [number, number, number];
    readonly commitment_fromHex: (a: number, b: number) => [number, number, number];
    readonly commitment_new: (a: number, b: number) => [number, number, number];
    readonly commitment_serialize: (a: number) => [number, number];
    readonly commitment_serialized_size: (a: number) => number;
    readonly commitment_size: () => number;
    readonly commitment_sum: (a: any) => [number, number, number];
    readonly commitment_sumMuSig2: (a: any, b: any, c: number, d: number) => [number, number, number];
    readonly commitment_toHex: (a: number) => [number, number];
    readonly es256publickey___getClassname: (a: number) => [number, number];
    readonly es256publickey_compare: (a: number, b: number) => number;
    readonly es256publickey_deserialize: (a: number, b: number) => [number, number, number];
    readonly es256publickey_equals: (a: number, b: number) => number;
    readonly es256publickey_fromHex: (a: number, b: number) => [number, number, number];
    readonly es256publickey_fromRaw: (a: number, b: number) => [number, number, number];
    readonly es256publickey_fromSpki: (a: number, b: number) => [number, number, number];
    readonly es256publickey_new: (a: number, b: number) => [number, number, number];
    readonly es256publickey_serialize: (a: number) => [number, number];
    readonly es256publickey_toAddress: (a: number) => number;
    readonly es256publickey_toHex: (a: number) => [number, number];
    readonly es256publickey_verify: (a: number, b: number, c: number, d: number) => number;
    readonly merklepath_computeRoot: (a: number, b: number, c: number) => [number, number, number, number];
    readonly merklepath_deserialize: (a: number, b: number) => [number, number, number];
    readonly merklepath_hashes: (a: number) => [number, number];
    readonly merklepath_length: (a: number) => number;
    readonly merklepath_serialize: (a: number) => [number, number];
    readonly privatekey_deserialize: (a: number, b: number) => [number, number, number];
    readonly privatekey_equals: (a: number, b: number) => number;
    readonly privatekey_fromHex: (a: number, b: number) => [number, number, number];
    readonly privatekey_generate: () => number;
    readonly privatekey_new: (a: number, b: number) => [number, number, number];
    readonly privatekey_purpose_id: () => number;
    readonly privatekey_serialize: (a: number) => [number, number];
    readonly privatekey_serialized_size: (a: number) => number;
    readonly privatekey_toHex: (a: number) => [number, number];
    readonly publickey___getClassname: (a: number) => [number, number];
    readonly publickey_combinations: (a: any, b: number) => [number, number, number, number];
    readonly publickey_compare: (a: number, b: number) => number;
    readonly publickey_derive: (a: number) => number;
    readonly publickey_deserialize: (a: number, b: number) => [number, number, number];
    readonly publickey_equals: (a: number, b: number) => number;
    readonly publickey_fromAny: (a: any) => [number, number, number];
    readonly publickey_fromHex: (a: number, b: number) => [number, number, number];
    readonly publickey_fromRaw: (a: number, b: number) => [number, number, number];
    readonly publickey_fromSpki: (a: number, b: number) => [number, number, number];
    readonly publickey_new: (a: number, b: number) => [number, number, number];
    readonly publickey_serialize: (a: number) => [number, number];
    readonly publickey_serialized_size: (a: number) => number;
    readonly publickey_sum: (a: any) => [number, number, number];
    readonly publickey_toAddress: (a: number) => number;
    readonly publickey_toHex: (a: number) => [number, number];
    readonly publickey_verify: (a: number, b: number, c: number, d: number) => number;
    readonly signature___getClassname: (a: number) => [number, number];
    readonly signature_create: (a: number, b: number, c: number, d: number) => number;
    readonly signature_deserialize: (a: number, b: number) => [number, number, number];
    readonly signature_fromAsn1: (a: number, b: number) => [number, number, number];
    readonly signature_fromHex: (a: number, b: number) => [number, number, number];
    readonly signature_serialize: (a: number) => [number, number];
    readonly signature_toHex: (a: number) => [number, number];
    readonly address_toUserFriendlyAddress: (a: number) => [number, number];
    readonly privatekey_size: () => number;
    readonly publickey_size: () => number;
    readonly __wbg_hashedtimelockedcontract_free: (a: number, b: number) => void;
    readonly __wbg_merkletree_free: (a: number, b: number) => void;
    readonly __wbg_signatureproof_free: (a: number, b: number) => void;
    readonly __wbg_stakingcontract_free: (a: number, b: number) => void;
    readonly __wbg_vestingcontract_free: (a: number, b: number) => void;
    readonly hashedtimelockedcontract_dataToPlain: (a: number, b: number) => [number, number, number];
    readonly hashedtimelockedcontract_proofToPlain: (a: number, b: number) => [number, number, number];
    readonly merkletree_computeRoot: (a: number, b: number) => [number, number];
    readonly signatureproof_deserialize: (a: number, b: number) => [number, number, number];
    readonly signatureproof_es256_single_sig_size: () => number;
    readonly signatureproof_isSignedBy: (a: number, b: number) => number;
    readonly signatureproof_merklePath: (a: number) => number;
    readonly signatureproof_multiSig: (a: number, b: any, c: number) => [number, number, number];
    readonly signatureproof_publicKey: (a: number) => any;
    readonly signatureproof_serialize: (a: number) => [number, number];
    readonly signatureproof_signature: (a: number) => any;
    readonly signatureproof_singleSig: (a: number, b: number) => number;
    readonly signatureproof_single_sig_size: () => number;
    readonly signatureproof_toPlain: (a: number) => [number, number, number];
    readonly signatureproof_verify: (a: number, b: number, c: number) => number;
    readonly signatureproof_webauthnMultiSig: (a: any, b: any, c: any, d: number, e: number, f: number, g: number) => [number, number, number];
    readonly signatureproof_webauthnSingleSig: (a: any, b: any, c: number, d: number, e: number, f: number) => [number, number, number];
    readonly stakingcontract_dataToPlain: (a: number, b: number) => [number, number, number];
    readonly stakingcontract_proofToPlain: (a: number, b: number) => [number, number, number];
    readonly vestingcontract_dataToPlain: (a: number, b: number, c: bigint) => [number, number, number];
    readonly vestingcontract_proofToPlain: (a: number, b: number) => [number, number, number];
    readonly __wbg_client_free: (a: number, b: number) => void;
    readonly client_addConsensusChangedListener: (a: number, b: any) => any;
    readonly client_addHeadChangedListener: (a: number, b: any) => any;
    readonly client_addPeerChangedListener: (a: number, b: any) => any;
    readonly client_addTransactionListener: (a: number, b: any, c: any) => any;
    readonly client_connectNetwork: (a: number) => any;
    readonly client_create: (a: any) => any;
    readonly client_disconnectNetwork: (a: number) => any;
    readonly client_getAccount: (a: number, b: any) => any;
    readonly client_getAccounts: (a: number, b: any) => any;
    readonly client_getAddressBook: (a: number) => any;
    readonly client_getBlock: (a: number, b: number, c: number) => any;
    readonly client_getBlockAt: (a: number, b: number) => any;
    readonly client_getElectedValidators: (a: number) => any;
    readonly client_getHeadBlock: (a: number) => any;
    readonly client_getHeadHash: (a: number) => any;
    readonly client_getHeadHeight: (a: number) => any;
    readonly client_getNetworkId: (a: number) => any;
    readonly client_getProtocolVersion: (a: number) => any;
    readonly client_getStaker: (a: number, b: any) => any;
    readonly client_getStakers: (a: number, b: any) => any;
    readonly client_getTransaction: (a: number, b: number, c: number) => any;
    readonly client_getTransactionReceiptsByAddress: (a: number, b: any, c: number, d: number, e: number, f: number) => any;
    readonly client_getTransactionsByAddress: (a: number, b: any, c: number, d: number, e: number, f: number, g: number, h: number) => any;
    readonly client_getValidator: (a: number, b: any) => any;
    readonly client_getValidators: (a: number, b: any) => any;
    readonly client_getVersion: (a: number) => any;
    readonly client_isConsensusEstablished: (a: number) => any;
    readonly client_removeListener: (a: number, b: number) => any;
    readonly client_sendTransaction: (a: number, b: any) => any;
    readonly client_waitForConsensusEstablished: (a: number) => any;
    readonly __wbg_transactionbuilder_free: (a: number, b: number) => void;
    readonly transactionbuilder_newAddStake: (a: number, b: number, c: bigint, d: number, e: bigint, f: number, g: number) => [number, number, number];
    readonly transactionbuilder_newBasic: (a: number, b: number, c: bigint, d: number, e: bigint, f: number, g: number) => [number, number, number];
    readonly transactionbuilder_newBasicWithData: (a: number, b: number, c: number, d: number, e: bigint, f: number, g: bigint, h: number, i: number) => [number, number, number];
    readonly transactionbuilder_newCreateStaker: (a: number, b: any, c: bigint, d: number, e: bigint, f: number, g: number) => [number, number, number];
    readonly transactionbuilder_newCreateValidator: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: bigint, i: number, j: number) => [number, number, number];
    readonly transactionbuilder_newDeactivateValidator: (a: number, b: number, c: number, d: bigint, e: number, f: number) => [number, number, number];
    readonly transactionbuilder_newDeleteValidator: (a: number, b: number, c: bigint, d: number, e: number) => [number, number, number];
    readonly transactionbuilder_newRemoveStake: (a: number, b: bigint, c: number, d: bigint, e: number, f: number) => [number, number, number];
    readonly transactionbuilder_newRetireStake: (a: number, b: bigint, c: number, d: bigint, e: number, f: number) => [number, number, number];
    readonly transactionbuilder_newRetireValidator: (a: number, b: number, c: bigint, d: number, e: number) => [number, number, number];
    readonly transactionbuilder_newSetActiveStake: (a: number, b: bigint, c: number, d: bigint, e: number, f: number) => [number, number, number];
    readonly transactionbuilder_newUpdateStaker: (a: number, b: any, c: number, d: number, e: bigint, f: number, g: number) => [number, number, number];
    readonly transactionbuilder_newUpdateValidator: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: bigint, i: number, j: number) => [number, number, number];
    readonly __wbg_policy_free: (a: number, b: number) => void;
    readonly policy_batchAt: (a: number) => number;
    readonly policy_batchIndexAt: (a: number) => number;
    readonly policy_batches_per_epoch: () => number;
    readonly policy_blockAfterJail: (a: number) => number;
    readonly policy_blockAfterReportingWindow: (a: number) => number;
    readonly policy_blocks_per_batch: () => number;
    readonly policy_blocks_per_epoch: () => number;
    readonly policy_electionBlockAfter: (a: number) => number;
    readonly policy_electionBlockBefore: (a: number) => number;
    readonly policy_electionBlockOf: (a: number) => number;
    readonly policy_epochAt: (a: number) => number;
    readonly policy_epochIndexAt: (a: number) => number;
    readonly policy_firstBatchOfEpoch: (a: number) => number;
    readonly policy_firstBlockOf: (a: number) => number;
    readonly policy_firstBlockOfBatch: (a: number) => number;
    readonly policy_genesis_block_number: () => number;
    readonly policy_isElectionBlockAt: (a: number) => number;
    readonly policy_isMacroBlockAt: (a: number) => number;
    readonly policy_isMicroBlockAt: (a: number) => number;
    readonly policy_lastBlockOfReportingWindow: (a: number) => number;
    readonly policy_lastElectionBlock: (a: number) => number;
    readonly policy_lastMacroBlock: (a: number) => number;
    readonly policy_macroBlockAfter: (a: number) => number;
    readonly policy_macroBlockBefore: (a: number) => number;
    readonly policy_macroBlockOf: (a: number) => number;
    readonly policy_max_supported_version: () => number;
    readonly policy_state_chunks_max_size: () => number;
    readonly policy_supplyAt: (a: bigint, b: bigint, c: bigint) => bigint;
    readonly policy_transaction_validity_window: () => number;
    readonly policy_transaction_validity_window_blocks: () => number;
    readonly policy_wasm_block_separation_time: () => bigint;
    readonly policy_wasm_bls_cache_max_capacity: () => number;
    readonly policy_wasm_coinbase_address: () => [number, number];
    readonly policy_wasm_f_plus_one: () => number;
    readonly policy_wasm_history_chunks_max_size: () => bigint;
    readonly policy_wasm_jail_epochs: () => number;
    readonly policy_wasm_max_size_micro_body: () => number;
    readonly policy_wasm_min_block_producer_timeout: () => bigint;
    readonly policy_wasm_min_epochs_stored: () => number;
    readonly policy_wasm_minimum_rewards_percentage: () => number;
    readonly policy_wasm_slots: () => number;
    readonly policy_wasm_staking_contract_address: () => [number, number];
    readonly policy_wasm_timestamp_max_drift: () => bigint;
    readonly policy_wasm_total_supply: () => bigint;
    readonly policy_wasm_two_f_plus_one: () => number;
    readonly policy_wasm_validator_deposit: () => bigint;
    readonly policy_batchDelayPenalty: (a: bigint) => number;
    readonly wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___wasm_bindgen_8e56df5fa3736b7e___JsValue__core_9b3796e30d99ddb7___result__Result_____wasm_bindgen_8e56df5fa3736b7e___JsError___true_: (a: number, b: number, c: any) => [number, number];
    readonly wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___js_sys_7ff7cdb33730fe00___Function_fn_wasm_bindgen_8e56df5fa3736b7e___JsValue_____wasm_bindgen_8e56df5fa3736b7e___sys__Undefined___js_sys_7ff7cdb33730fe00___Function_fn_wasm_bindgen_8e56df5fa3736b7e___JsValue_____wasm_bindgen_8e56df5fa3736b7e___sys__Undefined_______true_: (a: number, b: number, c: any, d: any) => void;
    readonly wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___web_sys_2af8cd294dd713b7___features__gen_CloseEvent__CloseEvent______true_: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___web_sys_2af8cd294dd713b7___features__gen_CloseEvent__CloseEvent______true__2: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___web_sys_2af8cd294dd713b7___features__gen_Event__Event______true_: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___web_sys_2af8cd294dd713b7___features__gen_IdbVersionChangeEvent__IdbVersionChangeEvent______true_: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___web_sys_2af8cd294dd713b7___features__gen_CloseEvent__CloseEvent______true__5: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke___web_sys_2af8cd294dd713b7___features__gen_MessageEvent__MessageEvent______true_: (a: number, b: number, c: any) => void;
    readonly wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke_______true_: (a: number, b: number) => void;
    readonly wasm_bindgen_8e56df5fa3736b7e___convert__closures_____invoke_______true__1_: (a: number, b: number) => void;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_exn_store: (a: number) => void;
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_destroy_closure: (a: number, b: number) => void;
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __externref_drop_slice: (a: number, b: number) => void;
    readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
