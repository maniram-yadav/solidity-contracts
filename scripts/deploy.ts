import { ethers } from "hardhat";
import { contracts } from "../typechain-types";
import { ContractMethodArgs } from "ethers";

async function main() {
  try {

    const contracts = [
      {
        name: "MultiSignWallet",
        args: [
          await ethers.getSigners(),
          3
        ]
      }, {
        name: "TimeLock",
        args: []
      }
    ]
  

    for (let contractJson of contracts) {

      // const contractFactory = await ethers.getContractFactory(contractName);
      // const owners = await ethers.getSigners();
      await deployContract(contractJson.name, ...contractJson.args);
      // await deployContract("TimeLock", ...args1);
      // console.log("Estimating gas for deployment...");
      // let deploymentTransaction = await contractFactory.getDeployTransaction([...owners], 3);
      // if (contractName === "MultiSignWallet") {
      //   await contractFactory.getDeployTransaction([...owners], 3);
      // }
      // else {
      //   await contractFactory.getDeployTransaction();
      // }
      // const estimatedGas = await ethers.provider.estimateGas(deploymentTransaction);
      // console.log(`Estimated gas: ${estimatedGas.toString()}`);

      // console.log("Deploying MultiSignWallet contract...");

      // let contract = await contractFactory.deploy([...owners], 3);
      // if (contractName === "MultiSignWallet") {
      //   contract = await contractFactory.deploy([...owners], 3);
      // }
      // else {
      //   contract = await contractFactory.deploy();
      // }
      // await contract.waitForDeployment();

      // console.log(`${contractName} deployed to:`, await contract.getAddress());
    }

    // const MultiSignWallet = await ethers.getContractFactory("MultiSignWallet");
    // const owners = await ethers.getSigners();

    // console.log("Estimating gas for deployment...");
    // const deploymentTransaction = await MultiSignWallet.getDeployTransaction([...owners], 3);
    // const estimatedGas = await ethers.provider.estimateGas(deploymentTransaction);
    // console.log(`Estimated gas: ${estimatedGas.toString()}`);

    // console.log("Deploying MultiSignWallet contract...");
    // const multiSignWallet = await MultiSignWallet.deploy([...owners], 3);

    // await multiSignWallet.waitForDeployment();

    // console.log("TaxRecord deployed to:", await multiSignWallet.getAddress());
  } catch (error) {
    console.error("Error during deployment:", error);
    process.exitCode = 1;
  }
}

async function deployContract(contractName: string, ...args: ContractMethodArgs<any>) {
  const contractFactory = await ethers.getContractFactory(contractName);
  console.log("Estimating gas for deployment...");
  let deploymentTransaction = await contractFactory.getDeployTransaction(...args);
  const estimatedGas = await ethers.provider.estimateGas(deploymentTransaction);
  console.log(`Estimated gas: ${estimatedGas.toString()}`);
  console.log(`Deploying ${contractName}  contract...`);
  let contract = await contractFactory.deploy(...args);
  await contract.waitForDeployment();
  console.log(`${contractName} deployed to:`, await contract.getAddress());
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});