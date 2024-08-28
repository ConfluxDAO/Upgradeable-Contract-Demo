const hre = require("hardhat");

async function main() {
  const proxyAddress = 'YOUR_PROXY_ADDRESS_HERE';

  const SimpleUpgrade = await hre.ethers.getContractFactory("SimpleUpgrade");
  const proxy = SimpleUpgrade.attach(proxyAddress);

  const Logic1 = await hre.ethers.getContractFactory("Logic1");
  const logic1 = Logic1.attach(proxyAddress);

  // Call the foo function
  await logic1.foo();

  // Get and print the value of the words variable
  const words = await proxy.words();
  console.log("Words after calling Logic1's foo():", words);

  // Verify the implementation address
  const implementationAddress = await proxy.implementation();
  console.log("Current implementation address:", implementationAddress);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });