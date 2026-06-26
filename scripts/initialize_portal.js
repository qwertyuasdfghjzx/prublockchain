const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Initializing portal on network:", hre.network.name);
  console.log("Using account:", deployer.address);

  const tokenAddress = "0x0dF5919fb649e2df756CA54C098A84212A9B3448";
  const sbtAddress = "0x6811Fb205E7Df5bE7e7aEd5e3B83C4A9A4cDa1D1";
  const portalAddress = "0x7aa23b16e687fb9Ed37Eca3BDFD01d173a9B751a";

  const PRUToken = await hre.ethers.getContractFactory("PRUToken");
  const token = PRUToken.attach(tokenAddress);

  const PRUMembershipSBT = await hre.ethers.getContractFactory("PRUMembershipSBT");
  const sbt = PRUMembershipSBT.attach(sbtAddress);

  const PRUClubPortal = await hre.ethers.getContractFactory("PRUClubPortal");
  const portal = PRUClubPortal.attach(portalAddress);

  // 1. Register profile as Officer if not registered
  const tokenIdRaw = await sbt.addressToTokenId(deployer.address);
  const tokenId = Number(tokenIdRaw);
  if (tokenId === 0) {
    console.log("Registering profile as officer...");
    const tx = await portal.registerProfile("officer");
    await tx.wait();
    console.log("Profile registered as officer!");
  } else {
    console.log("Profile already registered. Token ID:", tokenId);
  }

  // 2. Claim Faucet
  console.log("Checking faucet cooldown...");
  const lastClaim = await token.lastFaucetClaim(deployer.address);
  const now = Math.floor(Date.now() / 1000);
  if (now - Number(lastClaim) > 30) {
    console.log("Claiming faucet tokens...");
    const tx = await token.claimFaucet();
    await tx.wait();
    console.log("Faucet tokens claimed!");
  } else {
    console.log("Faucet cooldown active.");
  }

  // 3. Register standard events
  console.log("Registering default events...");
  const eventsCount = await portal.getEventsCount();
  if (Number(eventsCount) === 0) {
    const tx1 = await portal.registerEvent("Solidity ile Akıllı Sözleşme 101", "27 Haziran - 18:30", 25, 10);
    await tx1.wait();
    console.log("Event 1 registered.");

    const tx2 = await portal.registerEvent("Haftalık Coffee & Web3 Meetup", "28 Haziran - 15:00", 15, 5);
    await tx2.wait();
    console.log("Event 2 registered.");
  } else {
    console.log("Events already registered.");
  }

  // 4. Approve PRU token spending for DAO
  console.log("Approving PRU tokens for DAO proposal fee...");
  const allowance = await token.allowance(deployer.address, portalAddress);
  if (allowance < hre.ethers.parseEther("50")) {
    const tx = await token.approve(portalAddress, hre.ethers.MaxUint256);
    await tx.wait();
    console.log("Approved PRU token spending!");
  }

  // 5. Create a DAO proposal
  console.log("Creating default proposal...");
  const proposalsCount = await portal.getProposalsCount();
  if (Number(proposalsCount) === 0) {
    const tx = await portal.createDAOProposal("IPR-12", "Kulüp Bütçesi ile Ledger Donanım Cüzdanı Alımı", "Kulüp üyelerine eğitim ödülü olarak dağıtılmak üzere kasadan 3 adet Ledger donanım cüzdanı satın alınması teklifidir.");
    await tx.wait();
    console.log("DAO proposal created successfully!");
  } else {
    console.log("Proposal already exists.");
  }

  console.log("\n--- PORTAL INITIALIZATION COMPLETE ---");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
