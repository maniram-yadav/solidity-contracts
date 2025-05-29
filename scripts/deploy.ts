import { ethers } from "hardhat";

async function main() {
  try {
    const MultiSignWallet = await ethers.getContractFactory("MultiSignWallet");
    const owners = await ethers.getSigners();

    console.log("Estimating gas for deployment...");
    const deploymentTransaction = await MultiSignWallet.getDeployTransaction([...owners], 3);
    const estimatedGas = await ethers.provider.estimateGas(deploymentTransaction);
    console.log(`Estimated gas: ${estimatedGas.toString()}`);

    console.log("Deploying MultiSignWallet contract...");
    const multiSignWallet = await MultiSignWallet.deploy([...owners], 3);

    await multiSignWallet.waitForDeployment();

    console.log("TaxRecord deployed to:", await multiSignWallet.getAddress());
  } catch (error) {
    console.error("Error during deployment:", error);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});