const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BLSIdentityRegistry", function () {
  let BLSIdentityRegistry;
  let blsIdentityRegistry: any;

  beforeEach(async function () {
    BLSIdentityRegistry = await ethers.getContractFactory(
      "BLSIdentityRegistry"
    );
    const [owner] = await ethers.getSigners();
    blsIdentityRegistry = await BLSIdentityRegistry.deploy(owner.address);
  });

  it("should register the key-signature pair", async function () {
    const identifier = ethers.hexlify(ethers.toUtf8Bytes("identifier"));

    const pubKey = "0x" + "00".repeat(48); // 96 hex characters, 48 bytes
    const signature = "0x" + "00".repeat(96); // 192 hex characters, 96 bytes

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
    const identifier = ethers.hexlify(ethers.toUtf8Bytes("identifier"));
    const ipfsCID = "QmXnnyufdzAWL5CqZ2RnSNgPbvCc1ALT73s6epPrRnZ1Xy";

    await blsIdentityRegistry.registerIpfsCID(identifier, ipfsCID);
    const returnedIpfsCID = await blsIdentityRegistry.getIpfsCID(identifier);

    expect(returnedIpfsCID).to.equal(ipfsCID, "IPFS CIDs should be equal");
  });
});
