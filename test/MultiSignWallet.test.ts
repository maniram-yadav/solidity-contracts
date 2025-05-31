import { expect } from "chai";
import { ethers } from "hardhat";
import { MultiSignWallet } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("MultiSignWallet Tests", function () {
  let multiSignWallet: MultiSignWallet;
  let owner: HardhatEthersSigner;
  let testenabled = false;

  beforeEach(async function () {
    const owners = await ethers.getSigners();
    const MultiSignWalletFactory = await ethers.getContractFactory("MultiSignWallet");
    multiSignWallet = await MultiSignWalletFactory.deploy([...owners], 3);
    await multiSignWallet.waitForDeployment();
  });

 testenabled &&  it("Total owners count", async function () {
    const owners = await multiSignWallet.getOwners();
    expect(owners.length).to.be.equal(20)
  
  });

 testenabled &&  it("Submit Transaction", async function () {
    const owners = await multiSignWallet.getOwners();
    const tx = await multiSignWallet.submitTransaction(owners[2], 1, "0x");
    const receipt = await tx.wait();
      multiSignWallet.on(multiSignWallet.getEvent("SubmitTransaction"),function (){
      
    })
    const logs = receipt?.logs;
    const log = logs ? logs[0] : null;
    const iface = new ethers.Interface(multiSignWallet.interface.fragments);
    const parsedLog = log && iface.parseLog(log);
    console.log(parsedLog)
    console.log(parsedLog?.fragment.name)
    console.log(parsedLog?.args)
    expect(parsedLog?.args[2]).to.be.equal(owners[2])
    expect(parsedLog?.args[3]).to.be.equal(1)
    expect(parsedLog?.args[4]).to.be.equal("0x")
  });

}); 