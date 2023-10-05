const BLSSettlement = artifacts.require("BLSSettlement");
const MockERC20 = artifacts.require("MockERC20");
const MockCaller = artifacts.require("MockCaller");

contract("BLSSettlement", (accounts) => {
  let settlement, mockERC20, mockCaller;
  const owner = accounts[0];

  beforeEach(async () => {
    settlement = await BLSSettlement.new({ from: owner });
    mockERC20 = await MockERC20.new("MockToken", "MTK", { from: owner });
    mockCaller = await MockCaller.new({ from: owner });

    await mockERC20.transfer(
      settlement.address,
      web3.utils.toWei("1000", "ether"),
      { from: owner }
    );

    // Authorizing the mockCaller contract
    await settlement.authorizeContract(mockCaller.address, { from: owner });
  });

  it("should transfer ETH only if called by an authorized contract", async () => {
    const amount = web3.utils.toWei("1", "ether");
    await web3.eth.sendTransaction({
      from: owner,
      to: settlement.address,
      value: amount,
    });

    await mockCaller.transferEth(settlement.address, recipient, amount, {
      from: owner,
    });

    const recipientBalance = await web3.eth.getBalance(recipient);
    assert.equal(
      recipientBalance,
      amount,
      "The recipient did not receive the ETH"
    );
  });

  it("should transfer ERC20 tokens only if called by an authorized contract", async () => {
    const amount = web3.utils.toWei("100", "ether");

    await mockCaller.transferToken(
      settlement.address,
      mockERC20.address,
      recipient,
      amount,
      { from: owner }
    );

    const recipientBalance = await mockERC20.balanceOf(recipient);
    assert.equal(
      recipientBalance.toString(),
      amount,
      "The recipient did not receive the tokens"
    );
  });
});
