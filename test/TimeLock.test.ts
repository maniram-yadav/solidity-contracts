import { expect } from "chai";
import { ethers } from "hardhat";
import { TimeLock } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("TimeLock Tests", async function () {

  let timeLock: TimeLock;
  let owner: HardhatEthersSigner;
  let testenabled = false;

  beforeEach(async function () {
    const owners = await ethers.getSigners();
    const TimeLockFactory = await ethers.getContractFactory("TimeLock");
    timeLock = await TimeLockFactory.deploy();
    await timeLock.waitForDeployment();
  });

  testenabled && it("Add balance", async function () {
    const tx = await timeLock.deposit({ value: 1000 });
    await tx.wait();
    const balance = await timeLock.getBalance();
    expect(balance).to.be.equal(1000);

  });

  testenabled && it("Insufficient balance", async function () {
    const tx = await timeLock.withdraw();
    expect(tx).to.be.revertedWith("Inefficient fund");
  });

  testenabled && it("Lock time not expired", async function () {
    const tx = await timeLock.deposit({ value: 1000 });
    await tx.wait();
    
    const withdraw = await timeLock.withdraw();
    expect(withdraw).to.be.revertedWith("lock time have not expired");
  });

});