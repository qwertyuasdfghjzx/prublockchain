const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Minting tokens on network:", hre.network.name);
  console.log("Owner/Deployer address:", deployer.address);

  const tokenAddress = "0x0dF5919fb649e2df756CA54C098A84212A9B3448";
  const PRUToken = await hre.ethers.getContractFactory("PRUToken");
  const token = PRUToken.attach(tokenAddress);

  const beforeSupply = await token.totalSupply();
  console.log("Current Total Supply:", hre.ethers.formatEther(beforeSupply), "PRU");

  // Mint 15,000 PRU tokens
  const mintAmount = hre.ethers.parseEther("15000");
  console.log("Minting 15,000 PRU...");
  const tx = await token.mint(deployer.address, mintAmount);
  console.log("Tx hash:", tx.hash);
  await tx.wait();
  console.log("Tokens minted successfully!");

  const afterSupply = await token.totalSupply();
  console.log("New Total Supply:", hre.ethers.formatEther(afterSupply), "PRU");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
