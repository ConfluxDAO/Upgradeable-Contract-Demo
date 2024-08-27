const hre = require("hardhat");

async function main() {
  const proxyAddress = 'YOUR_PROXY_ADDRESS_HERE';
  
  const Logic2 = await hre.ethers.getContractFactory("Logic2");
  const logic2 = await Logic2.deploy();
  await logic2.deployed();
  console.log("Logic2 deployed to:", logic2.address);

  const SimpleUpgrade = await hre.ethers.getContractFactory("SimpleUpgrade");
  const proxy = SimpleUpgrade.attach(proxyAddress);
  
  await proxy.upgrade(logic2.address);
  console.log("Proxy upgraded to Logic2");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });