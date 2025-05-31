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
      },
       {
        name: "HotelRoom",
        args: []
      }
    ]
  
    let deployResult : Promise<void>[] = [];
    for (let contractJson of contracts) {
      deployResult.push( deployContract(contractJson.name, ...contractJson.args));
    }
    for (let result of deployResult) {
        await result;
    }
  } catch (error) {
    console.error("Error during deployment:", error);
    process.exitCode = 1;
  }
}

async function deployContract(contractName: string, ...args: ContractMethodArgs<any>) : Promise<void> {
  const contractFactory = await ethers.getContractFactory(contractName);
  console.log(`Estimating gas for deployment contract  ${contractName}`);
  let deploymentTransaction = await contractFactory.getDeployTransaction(...args);
  const estimatedGas = await ethers.provider.estimateGas(deploymentTransaction);
  console.log(`Estimated gas for ${contractName}   : ${estimatedGas.toString()}`);
  console.log(`Deploying ${contractName}  contract...`);
  let contract = await contractFactory.deploy(...args);
  await contract.waitForDeployment();
  console.log(`${contractName} deployed to:`, await contract.getAddress());
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});