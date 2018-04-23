const GrainOfSalt = artifacts.require('./GrainOfSalt.sol');

module.exports = function(deployer) {
  deployer.deploy(GrainOfSalt);
};