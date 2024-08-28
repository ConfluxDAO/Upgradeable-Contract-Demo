const hre = require("hardhat");

async function main() {
  const Logic1 = await hre.ethers.getContractFactory("Logic1");
  const logic1 = await Logic1.deploy();
  await logic1.waitForDeployment();
  console.log("Logic1 deployed to:", await logic1.getAddress());

  const SimpleUpgrade = await hre.ethers.getContractFactory("SimpleUpgrade");
  const proxy = await SimpleUpgrade.deploy(await logic1.getAddress());
  await proxy.waitForDeployment();
  console.log("Proxy deployed to:", await proxy.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
