import { expect } from "chai";
import { ethers } from "hardhat";
import { MultiSignWallet } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("MultiSignWallet Tests", function () {
  let multiSignWallet: MultiSignWallet ;
  let owner: HardhatEthersSigner;

  beforeEach(async function () {
    const owners = await ethers.getSigners();
    const MultiSignWalletFactory = await ethers.getContractFactory("MultiSignWallet");
    multiSignWallet = await MultiSignWalletFactory.deploy([...owners],3);
    await multiSignWallet.waitForDeployment();
  });

  it("get owners",async function() {
    const owners = await  multiSignWallet.getOwners();
    
    console.log(owners.length)
    // expect(owners.length).to.be.

  });

});