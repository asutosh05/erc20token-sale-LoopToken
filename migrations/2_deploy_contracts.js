var LoopToken = artifacts.require("./LoopToken.sol");

module.exports = function(deployer) {
  deployer.deploy(LoopToken);
};
