const BLSIdentityRegistry = artifacts.require("BLSIdentityRegistry");

module.exports = async function (callback) {
  blsIdentityRegistry = await BLSIdentityRegistry.deployed();

  // Watch for new events
  await blsIdentityRegistry.KeySignaturePairRegistered({}, (error, result) => {
    if (error) console.error(error);
    console.log(
      `[TESTER] => [message] : ${result.args.message} [status] : ${result.args.status}`
    );
  });

  // TODO: implement your actions
  const identifier = web3.utils.asciiToHex("identifier123");
  const pubKey = web3.utils.asciiToHex("publicKey123");
  const signature = web3.utils.asciiToHex("signature123");

  await blsIdentityRegistry.registerKeySignaturePair(
    identifier,
    pubKey,
    signature
  );

  // invoke callback
  callback();
};
