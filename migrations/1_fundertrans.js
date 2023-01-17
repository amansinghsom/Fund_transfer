var MyContract = artifacts.require("Funder");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(MyContract);
};
