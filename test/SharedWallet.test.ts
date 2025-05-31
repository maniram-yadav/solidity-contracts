import { expect } from "chai";
import { ethers } from "hardhat";
import { SharedWallet } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("SharedWallet Tests", async function () {

  let sharedWallet: SharedWallet;
  let owner: HardhatEthersSigner;
  let testenabled = true;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    const SharedWalletFactory = await ethers.getContractFactory("SharedWallet");
    sharedWallet = await SharedWalletFactory.deploy();
    await sharedWallet.waitForDeployment();
  });

  testenabled && it("Add balance", async function () {
    const tx = await sharedWallet.addOwner("0x2546BcD3c84621e976D8185a91A922aE77ECEc30");
    await tx.wait();
    const totalOwners = await sharedWallet.totalOwners();
    expect(totalOwners).to.be.equal(2);

  });

  testenabled && it("Should accept ETH transfers and emit event", async function () {
    
    const amount = ethers.parseEther("1.5");
    const tx = await owner.sendTransaction({
      to: await sharedWallet.getAddress(),
      value: amount
    });

    await expect(
      await tx.wait()
    ).to.emit(sharedWallet, "DepositFund")
      .withArgs(owner.address, amount);

    const newBalance = await sharedWallet.balance();
    console.log(newBalance);
    expect(newBalance).to.equal(amount);
  });

});