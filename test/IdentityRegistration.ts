const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BLSIdentityRegistry", function () {
  let BLSIdentityRegistry;
  let blsIdentityRegistry: any;

  beforeEach(async function () {
    BLSIdentityRegistry = await ethers.getContractFactory(
      "BLSIdentityRegistry"
    );
    blsIdentityRegistry = await BLSIdentityRegistry.deploy();
    await blsIdentityRegistry.deployed();
  });

  it("should register the key-signature pair", async function () {
    const identifier = ethers.utils.hexlify(
      ethers.utils.toUtf8Bytes("identifier")
    );
    const pubKey = ethers.utils.hexlify(ethers.utils.toUtf8Bytes("publicKey"));
    const signature = ethers.utils.hexlify(
      ethers.utils.toUtf8Bytes("signature")
    );

    await blsIdentityRegistry.registerKeySignaturePair(
      identifier,
      pubKey,
      signature
    );

    const [returnedPubKey, returnedSignature] =
      await blsIdentityRegistry.getKeySignaturePair(identifier);

    expect(returnedPubKey).to.equal(pubKey, "Public keys should be equal");
    expect(returnedSignature).to.equal(signature, "Signatures should be equal");
  });

  it("should register and retrieve the IPFS CID", async function () {
    const identifier = ethers.utils.hexlify(
      ethers.utils.toUtf8Bytes("identifier")
    );
    const ipfsCID = "QmXnnyufdzAWL5CqZ2RnSNgPbvCc1ALT73s6epPrRnZ1Xy"; // Example IPFS CID

    await blsIdentityRegistry.registerIpfsCID(identifier, ipfsCID);
    const returnedIpfsCID = await blsIdentityRegistry.getIpfsCID(identifier);

    expect(returnedIpfsCID).to.equal(ipfsCID, "IPFS CIDs should be equal");
  });
});
