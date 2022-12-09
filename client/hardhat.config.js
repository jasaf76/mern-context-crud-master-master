require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    //hardhat: {},
    // chainId: 80001,
    polygon_mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/QGAA7s6XfIq-NkPgUn_slcdjandoswia",
      accounts: [
        `0x${"b83f1b99a3203d680f03cce225398dabed1342a18656b78c752b7e341ebd7148"}`,
      ],
    },
  },
};
