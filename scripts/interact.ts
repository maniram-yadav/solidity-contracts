import { ethers } from "hardhat";
import { TaxRecord } from "../typechain-types";
import * as dotenv from "dotenv";

dotenv.config();

const { CONTRACT_ADDRESS } = process.env;

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Interacting with the contract with the account:", deployer.address);

  // Replace with your deployed contract address
  const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

  const TaxRecord: any = await ethers.getContractFactory("TaxRecord");
  const taxRecord = TaxRecord.attach(contractAddress) as TaxRecord;

  // Add a record
  console.log("Adding a new record...");
  const tx = await taxRecord.addRecord("twis mostafa rbc", ethers.parseEther("1.5"));
  await tx.wait();
  
  
  const recordId: any = await taxRecord.nextRecordId(); // Get the newly created record ID
  console.log(recordId)
  console.log(`New Record ID: ${parseInt(recordId) - 1}`);
  let abc: any = parseInt(recordId)  - 1

  // Get the record
  console.log("Fetching the added record...");
  const record: any = await taxRecord.getRecord(abc);
  console.log(record)
  console.log(`Record: ID=${record.id}, Name=${record.taxPayerName}, Amount=${ethers.formatEther(record.amount)} ETH, Date=${new Date(Number(record.date) * 1000)}`);

  // Get all records
  console.log("Fetching all records...");
  const allRecords = await taxRecord.getAllRecords();
  console.log("All records:", allRecords);

  // Delete a record
  console.log("Deleting the record...");
  const deleteTx = await taxRecord.deleteRecord(abc);
  await deleteTx.wait();

   // Get all records
   console.log("Fetching all records after delete action...");
   const allRecords1 = await taxRecord.getAllRecords();
   console.log("All records:", allRecords1);

  console.log("Interaction complete!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});