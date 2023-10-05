const BLSIdentityRegistry = artifacts.require("BLSIdentityRegistry");
const BLSSettlement = artifacts.require("BLSSettlement");

module.exports = function (deployer) {
  deployer.deploy(BLSIdentityRegistry);
  deployer.deploy(BLSSettlement);
};
