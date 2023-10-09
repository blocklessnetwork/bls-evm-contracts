// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

contract BLSIdentityRegistry is Ownable {

    constructor() Ownable() {
        // Ownable constructor no longer takes an argument
    }

   function initialize(address initialOwner) external {
        // Ensure this function can only be called in a way that's safe
        transferOwnership(initialOwner);
    }
    
    // Struct to hold the public key and its associated signature
    struct KeySignaturePair {
        bytes pubKey;
        bytes signature;
    }

    // Mapping to store public key and signature pairs by an identifier
    mapping(bytes => KeySignaturePair) public keySignaturePairs;
    
    // Mapping to store IPFS CIDs by an identifier
    mapping(bytes => string) public ipfsCIDs;

    // Events
    event KeySignaturePairRegistered(bytes identifier, bytes pubKey, bytes signature);
    event IpfsCIDRegistered(bytes identifier, string ipfsCID);
    event KeySignaturePairDeleted(bytes identifier);
    event KeySignaturePairUpdated(bytes identifier, bytes newPubKey, bytes newSignature);

    // Register a new public key and signature pair
    function registerKeySignaturePair(bytes memory identifier, bytes memory pubKey, bytes memory signature) public onlyOwner {
        require(pubKey.length == 48, "Invalid public key length"); // Example length check
        require(signature.length == 96, "Invalid signature length"); // Example length check

        KeySignaturePair memory newPair = KeySignaturePair(pubKey, signature);
        keySignaturePairs[identifier] = newPair;

        emit KeySignaturePairRegistered(identifier, pubKey, signature);
    }

    // Register or update the IPFS CID
    function registerIpfsCID(bytes memory identifier, string memory ipfsCID) public onlyOwner {
        require(bytes(ipfsCID).length > 0, "IPFS CID cannot be empty");

        ipfsCIDs[identifier] = ipfsCID;

        emit IpfsCIDRegistered(identifier, ipfsCID);
    }

    // Deletes a public key and signature pair by its identifier
    function deleteKeySignaturePair(bytes memory identifier) public onlyOwner {
        require(keySignaturePairs[identifier].pubKey.length > 0, "KeySignaturePair does not exist");

        delete keySignaturePairs[identifier];

        emit KeySignaturePairDeleted(identifier);
    }

    // Updates an existing public key and signature pair
    function updateKeySignaturePair(bytes memory identifier, bytes memory newPubKey, bytes memory newSignature) public onlyOwner {
        require(newPubKey.length == 48, "Invalid public key length"); // Example length check
        require(newSignature.length == 96, "Invalid signature length"); // Example length check

        KeySignaturePair memory updatedPair = KeySignaturePair(newPubKey, newSignature);
        keySignaturePairs[identifier] = updatedPair;

        emit KeySignaturePairUpdated(identifier, newPubKey, newSignature);
    }

    // Retrieves a public key and signature pair by its identifier
    function getKeySignaturePair(bytes memory identifier) public view returns (bytes memory, bytes memory) {
        KeySignaturePair memory pair = keySignaturePairs[identifier];
        require(pair.pubKey.length > 0, "KeySignaturePair does not exist");

        return (pair.pubKey, pair.signature);
    }

    // Retrieves an IPFS CID by its identifier
    function getIpfsCID(bytes memory identifier) public view returns (string memory) {
        string memory cid = ipfsCIDs[identifier];
        require(bytes(cid).length > 0, "CID does not exist");

        return cid;
    }
}
