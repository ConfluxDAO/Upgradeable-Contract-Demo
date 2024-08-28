const hre = require("hardhat");

async function main() {
  const proxyAddress = '0x24C91c9cE0C8bC4b509B20D120224a454a2850cE';
  
  const Logic2 = await hre.ethers.getContractFactory("Logic2");
  const logic2 = await Logic2.deploy();
  await logic2.waitForDeployment();
  console.log("Logic2 deployed to:", await logic2.getAddress());

  const SimpleUpgrade = await hre.ethers.getContractFactory("SimpleUpgrade");
  const proxy = SimpleUpgrade.attach(proxyAddress);
  
  console.log("Admin address:", await proxy.admin());
  console.log("Current implementation:", await proxy.implementation());
  console.log("New implementation address:", await logic2.getAddress());

  const [signer] = await hre.ethers.getSigners(); // Get signer
  console.log("Caller address:", await signer.getAddress());

  await proxy.upgrade(await logic2.getAddress(), {
    gasLimit: 1000000, // Adjust this value
    maxFeePerGas: ethers.parseUnits('20', 'gwei'), // Adjust this value
    maxPriorityFeePerGas: ethers.parseUnits('2', 'gwei') // Optional priority fee
  });
  console.log("Proxy upgraded to Logic2");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });