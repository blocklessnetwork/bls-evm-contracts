const BLSIdentityRegistry = artifacts.require("BLSIdentityRegistry");

contract("BLSIdentityRegistry", (accounts) => {
  let blsIdentityRegistry = null;

  before(async () => {
    blsIdentityRegistry = await BLSIdentityRegistry.deployed();
  });

  it("should register the key-signature pair", async () => {
    const identifier = web3.utils.asciiToHex("identifier");
    const pubKey = web3.utils.asciiToHex("publicKey");
    const signature = web3.utils.asciiToHex("signature");

    await blsIdentityRegistry.registerKeySignaturePair(
      identifier,
      pubKey,
      signature
    );

    const returnedValues = await blsIdentityRegistry.getKeySignaturePair(
      identifier
    );
    const returnedPubKey = returnedValues[0];
    const returnedSignature = returnedValues[1];

    assert.equal(
      web3.utils.hexToUtf8(returnedPubKey),
      web3.utils.hexToUtf8(pubKey),
      "Public keys should be equal"
    );
    assert.equal(
      web3.utils.hexToUtf8(returnedSignature),
      web3.utils.hexToUtf8(signature),
      "Signatures should be equal"
    );
  });

  it("should register and retrieve the IPFS CID", async () => {
    const identifier = web3.utils.asciiToHex("identifier");
    const ipfsCID = "QmXnnyufdzAWL5CqZ2RnSNgPbvCc1ALT73s6epPrRnZ1Xy"; // Example IPFS CID

    await blsIdentityRegistry.registerIpfsCID(identifier, ipfsCID);
    const returnedIpfsCID = await blsIdentityRegistry.getIpfsCID(identifier);

    assert.equal(returnedIpfsCID, ipfsCID, "IPFS CIDs should be equal");
  });
});
