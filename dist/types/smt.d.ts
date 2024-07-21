import { HashFunction, Key, Value, Node, MerkleProof } from "./types";
/**
 * SparseMerkleTree class provides all the functions to create a sparse Merkle tree
 * and to take advantage of its features: {@linkcode SMT.add}, {@linkcode SMT.get},
 * {@linkcode SMT.update}, {@linkcode SMT.delete}, {@linkcode SMT.createProof},
 * {@linkcode SMT.verifyProof}.
 * To better understand the code below it may be useful to describe the terminology used:
 * * **nodes**: every node in the tree is the hash of the two child nodes (`H(x, y)`);
 * * **root node**: the root node is the top hash and since it represents the whole data
 * structure it can be used to certify its integrity;
 * * **leaf nodes**: every leaf node is the hash of a key/value pair and an additional
 * value to mark the node as leaf node (`H(x, y, 1)`);
 * * **entry**: a tree entry is a key/value pair used to create the leaf nodes;
 * * **zero nodes**: a zero node is an hash of zeros and in this implementation `H(0,0) = 0`;
 * * **siblings**: the children of a parent node are siblings;
 * * **path**: every entry key is a number < 2^256 that can be converted in a binary number,
 * and this binary number is the path used to place the entry in the tree (1 or 0 define the
 * child node to choose);
 * * **matching node**: when an entry is not found and the path leads to another existing entry,
 * this entry is a matching entry and it has some of the first bits in common with the entry not found;
 * * **depth**: the depth of a node is the length of the path to its root.
 */
export default class SMT {
    private hash;
    private zeroNode;
    private entryMark;
    private bigNumbers;
    private nodes;
    root: Node;
    /**
     * Initializes the SparseMerkleTree attributes.
     * @param hash Hash function used to hash the child nodes.
     * @param bigNumbers BigInt type enabling.
     */
    constructor(hash: HashFunction, bigNumbers?: boolean);
    /**
     * Gets a key and if the key exists in the tree the function returns the
     * value, otherwise it returns 'undefined'.
     * @param key A key of a tree entry.
     * @returns A value of a tree entry or 'undefined'.
     */
    get(key: Key): Value | undefined;
    /**
     * Adds a new entry in the tree. It retrieves a matching entry
     * or a zero node with a top-down approach and then it updates all the
     * hashes of the nodes in the path of the new entry with a bottom-up approach.
     * @param key The key of the new entry.
     * @param value The value of the new entry.
     */
    add(key: Key, value: Value): void;
    /**
     * Updates a value of an entry in the tree. Also in this case
     * all the hashes of the nodes in the path of the entry are updated
     * with a bottom-up approach.
     * @param key The key of the entry.
     * @param value The value of the entry.
     */
    update(key: Key, value: Value): void;
    /**
     * Deletes an entry in the tree. Also in this case all the hashes of
     * the nodes in the path of the entry are updated with a bottom-up approach.
     * @param key The key of the entry.
     */
    delete(key: Key): void;
    /**
     * Creates a proof to prove the membership or the non-membership
     * of a tree entry.
     * @param key A key of an existing or a non-existing entry.
     * @returns The membership or the non-membership proof.
     */
    createProof(key: Key): MerkleProof;
    /**
     * Verifies a membership or a non-membership proof.
     * @param merkleProof The proof to verify.
     * @returns True if the proof is valid, false otherwise.
     */
    verifyProof(merkleProof: MerkleProof): boolean;
    /**
     * It enables the conversion of the full tree structure into a JSON string,
     * facilitating future imports of the tree. This approach is beneficial for
     * sharing across networks, as it saves time by storing root and the map of
     * hashed nodes directly instead of recomputing them
     * @returns The stringified JSON of the tree.
     */
    export(): string;
    /**
     * It imports an entire tree by initializing the nodes and root without calculating
     * any hashes. Note that it is crucial to ensure the integrity of the tree
     * before or after importing it.
     * The tree must be empty before importing.
     * @param nodes The stringified JSON of the tree.
     */
    import(json: string): void;
    /**
     * Searches for an entry in the tree. If the key passed as parameter exists in
     * the tree, the function returns the entry, otherwise it returns the entry
     * with only the key, and when there is another existing entry
     * in the same path it returns also this entry as 'matching entry'.
     * In any case the function returns the siblings of the path.
     * @param key The key of the entry to search for.
     * @returns The entry response.
     */
    private retrieveEntry;
    /**
     * Calculates nodes with a bottom-up approach until it reaches the root node.
     * @param node The node to start from.
     * @param path The path of the key.
     * @param siblings The siblings of the path.
     * @returns The root node.
     */
    private calculateRoot;
    /**
     * Adds new nodes in the tree with a bottom-up approach until it reaches the root node.
     * @param node The node to start from.
     * @param path The path of the key.
     * @param siblings The siblings of the path.
     * @param i The index to start from.
     * @returns The root node.
     */
    private addNewNodes;
    /**
     * Deletes nodes in the tree with a bottom-up approach until it reaches the root node.
     * @param node The node to start from.
     * @param path The path of the key.
     * @param siblings The siblings of the path.
     */
    private deleteOldNodes;
    /**
     * Checks if a node is a leaf node.
     * @param node A node of the tree.
     * @returns True if the node is a leaf, false otherwise.
     */
    private isLeaf;
    /**
     * Checks the parameter type.
     * @param parameter The parameter to check.
     */
    private checkParameterType;
}
