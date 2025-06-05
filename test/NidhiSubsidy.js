const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NidhiSubsidy contract", function () {
  let NidhiSubsidy, nidhiSubsidy, owner, addr1;

  beforeEach(async function () {
    NidhiSubsidy = await ethers.getContractFactory("NidhiSubsidy");
    [owner, addr1] = await ethers.getSigners();
    nidhiSubsidy = await NidhiSubsidy.deploy();
  });

  it("Should set the deployer as government", async function () {
    expect(await nidhiSubsidy.government()).to.equal(owner.address);
  });

  it("Should allow only government to add subsidy", async function () {
    await expect(
      nidhiSubsidy.addSubsidy("abc123", 5000, "Education")
    ).to.not.be.reverted;

    await expect(
      nidhiSubsidy.connect(addr1).addSubsidy("def456", 3000, "Health")
    ).to.be.revertedWith("Only government can add");
  });
});