// scripts/deploy.js

const hre = require("hardhat");

async function main() {
  const NidhiSubsidy = await hre.ethers.getContractFactory("NidhiSubsidy");
  const nidhiSubsidy = await NidhiSubsidy.deploy();

  await nidhiSubsidy.waitForDeployment(); // ✅ Hardhat v2.21+ uses this instead of .deployed()

  console.log("Contract deployed to:", await nidhiSubsidy.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
