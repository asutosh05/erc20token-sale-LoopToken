var LoopToken = artifacts.require("./LoopToken.sol");

module.exports = function(deployer) {
  deployer.deploy(LoopToken,1000000);
};
