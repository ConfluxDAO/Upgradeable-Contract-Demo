const hre = require("hardhat");

async function main() {
  const proxyAddress = '0xf0E489cb5665B39ce08DCD28263823F55B1d7Ebf';
  
  const Logic2 = await hre.ethers.getContractFactory("Logic2");
  const logic2 = await Logic2.deploy();
  await logic2.waitForDeployment();
  console.log("Logic2 deployed to:", await logic2.getAddress());

  const SimpleUpgrade = await hre.ethers.getContractFactory("SimpleUpgrade");
  const proxy = SimpleUpgrade.attach(proxyAddress);
  
  console.log("Admin address:", await proxy.admin());
  console.log("Current implementation:", await proxy.implementation());
  console.log("New implementation address:", await logic2.getAddress());
  console.log("Caller address:", await signer.getAddress());

  await proxy.upgrade(await logic2.getAddress(), {
    gasLimit: 1000000, // 调整这个值
    maxFeePerGas: ethers.parseUnits('20', 'gwei'), // 调整这个值
    maxPriorityFeePerGas: ethers.parseUnits('2', 'gwei') // 可选的优先费用
  });
  console.log("Proxy upgraded to Logic2");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });