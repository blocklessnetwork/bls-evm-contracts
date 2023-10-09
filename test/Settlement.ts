const { expect } = require("chai");
import hardhat from "hardhat";

describe("BLSSettlement", function () {
  let BLS,
    bls,
    MOCKERC20,
    mockERC20,
    MOCKCALLER,
    mockCaller,
    owner,
    addr1,
    addr2: { getBalance: () => any; address: any },
    addrs;

  beforeEach(async function () {
    BLS = await ethers.getContractFactory("BLSSettlement");
    MOCKERC20 = await ethers.getContractFactory("MockERC20");
    MOCKCALLER = await ethers.getContractFactory("MockCaller");

    [owner, addr1, addr2, ...addrs] = await hardhat.ethers.getSigners();

    bls = await BLS.deploy();
    bls.initialize(owner.address);
    mockERC20 = await MOCKERC20.deploy("MockToken", "MKT");
    mockCaller = await MOCKCALLER.deploy(bls.target);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await bls.owner()).to.equal(owner.address);
    });

    it("MockERC20 should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await mockERC20.balanceOf(owner.address);
      expect(await mockERC20.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer ETH", async function () {
      await bls.authorizeContract(mockCaller.target);
      await mockERC20.transfer(addr2.address, hardhat.ethers.parseEther("1"));
      const bal = await mockERC20.balanceOf(addr2.address);
      expect(bal).to.equal(hardhat.ethers.parseEther("1"));
    });
  });
});
