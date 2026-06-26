const hre = require("hardhat");

async function main() {
  console.log("Starting deployment on network:", hre.network.name);

  // 1. Deploy PRUToken
  console.log("Deploying PRUToken...");
  const PRUToken = await hre.ethers.getContractFactory("PRUToken");
  const token = await PRUToken.deploy();
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("PRUToken deployed to:", tokenAddress);

  // 2. Deploy PRUMembershipSBT
  console.log("Deploying PRUMembershipSBT...");
  const PRUMembershipSBT = await hre.ethers.getContractFactory("PRUMembershipSBT");
  const sbt = await PRUMembershipSBT.deploy();
  await sbt.waitForDeployment();
  const sbtAddress = await sbt.getAddress();
  console.log("PRUMembershipSBT deployed to:", sbtAddress);

  // 3. Deploy PRUClubPortal (coordinator)
  console.log("Deploying PRUClubPortal...");
  const PRUClubPortal = await hre.ethers.getContractFactory("PRUClubPortal");
  const portal = await PRUClubPortal.deploy(tokenAddress, sbtAddress);
  await portal.waitForDeployment();
  const portalAddress = await portal.getAddress();
  console.log("PRUClubPortal deployed to:", portalAddress);

  // 4. Grant roles/authorizations
  console.log("Setting authorizations...");
  
  // Set Portal as authorized minter in PRUToken
  const tx1 = await token.setMinterStatus(portalAddress, true);
  await tx1.wait();
  console.log("Portal authorized as minter in PRUToken");

  // Set Portal as authorized controller in PRUMembershipSBT
  const tx2 = await sbt.setControllerStatus(portalAddress, true);
  await tx2.wait();
  console.log("Portal authorized as controller in PRUMembershipSBT");

  console.log("\n--- DEPLOYMENT COMPLETE ---");
  console.log("Copy and paste these contract addresses into your app.js: \n");
  console.log(`PRUToken: "${tokenAddress}",`);
  console.log(`PRUMembershipSBT: "${sbtAddress}",`);
  console.log(`PRUClubPortal: "${portalAddress}"`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
