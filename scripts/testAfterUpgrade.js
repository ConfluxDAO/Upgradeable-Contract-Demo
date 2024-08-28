const hre = require("hardhat");

async function main() {
  const proxyAddress = '0x24C91c9cE0C8bC4b509B20D120224a454a2850cE';
  
  // Use Logic2's ABI
  const Logic2 = await hre.ethers.getContractFactory("Logic2");
  // Attach to the Logic2 contract using the proxy address
  const proxy = Logic2.attach(proxyAddress);
  
  // Call the foo function
  const tx = await proxy.foo();
  console.log("Waiting for on-chain confirmation...");
  await tx.wait(); // Wait for on-chain confirmation

  // Get and print the value of the words variable
  const words = await proxy.words();
  console.log("Words after calling Logic2's foo():", words);

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
