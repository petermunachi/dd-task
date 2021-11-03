
const Token = artifacts.require("Token");
const Channel = artifacts.require("Channel");

module.exports = async function (deployer, network, accounts) {

  if (network === "main") {
    return
  }

  const owners = accounts.slice(0, 2);
  const tokenName = "DD Token";
  const tokenSymbol = "DDT";
  let result;

  const weiValue = web3.utils.toWei('10', 'ether');
  console.log(weiValue);

  console.log("--------------Network---------------")
  console.log(network)
  console.log("------------------------------------")

  console.log("--------------OWNERS----------------")
  console.log(owners)
  console.log("------------------------------------")

  // Deploy Token
  await deployer.deploy(Token, tokenName, tokenSymbol);
  const token = await Token.deployed()

  console.log("--------------TOKEN ADDRESS---------")
  console.log(token.address)
  console.log("------------------------------------")

  await deployer.deploy(Channel, token.address, owners);
  const channel = await Channel.deployed();

  result = await token.addAdmin(channel.address, {from: accounts[0]})

  console.log("--------------addAdmin------------")
  console.log(result)
  console.log("------------------------------------")

  result = await token.mint(owners[0], weiValue, {from: accounts[0]})

  console.log("--------------mint1------------")
  console.log(result)
  console.log("------------------------------------")

  result = await token.mint(owners[1], weiValue, {from: accounts[0]})

  console.log("--------------mint2------------")
  console.log(result)
  console.log("------------------------------------")




};
