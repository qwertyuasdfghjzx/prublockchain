require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0000000000000000000000000000000000000000000000000000000000000000";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "cancun"
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    amoy: {
      url: "https://rpc-amoy.polygon.technology",
      accounts: PRIVATE_KEY.startsWith("0x") ? [PRIVATE_KEY] : [`0x${PRIVATE_KEY}`],
      chainId: 80002,
    },
    sepolia: {
      url: "https://sepolia.gateway.tenderly.co",
      accounts: PRIVATE_KEY.startsWith("0x") ? [PRIVATE_KEY] : [`0x${PRIVATE_KEY}`],
      chainId: 11155111,
    },
  },
};
