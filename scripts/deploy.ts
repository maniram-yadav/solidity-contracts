import { ethers } from "hardhat";

async function main() {
  try {
    const Counter = await ethers.getContractFactory("Counter");
    
    console.log("Estimating gas for deployment...");
    const deploymentTransaction = await Counter.getDeployTransaction();
    const estimatedGas = await ethers.provider.estimateGas(deploymentTransaction);
    console.log(`Estimated gas: ${estimatedGas.toString()}`);

    console.log("Deploying Counter contract...");
    const counter = await Counter.deploy();

    await counter.waitForDeployment();

    console.log("TaxRecord deployed to:", await counter.getAddress());
  } catch (error) {
    console.error("Error during deployment:", error);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});