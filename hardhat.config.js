require("dotenv").config();

module.exports = {
  solidity: "0.8.24",
  networks: {
    confluxTestnet: {
      url: "https://evmtestnet.confluxrpc.com",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 71
    }
  }
};