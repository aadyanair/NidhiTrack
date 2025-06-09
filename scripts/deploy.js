const { ethers } = require("hardhat");

async function main() {
  const NidhiSubsidy = await ethers.getContractFactory("NidhiSubsidy");
  const nidhiSubsidy = await NidhiSubsidy.deploy();
  
  console.log("Contract deployed to:", nidhiSubsidy.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
