import { expect } from "chai";
import { ethers } from "hardhat";
import { HotelRoom } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("HotelRoom Tests", async function () {

  let hotelRoom: HotelRoom;
  let owner: HardhatEthersSigner;
  let testenabled = false;

  beforeEach(async function () {
    const [owner] = await ethers.getSigners();
    const HoterRoomFactory = await ethers.getContractFactory("HotelRoom");
    hotelRoom = await HoterRoomFactory.deploy();
    await hotelRoom.waitForDeployment();
  });

  testenabled && it("Book Room", async function () {
    const tx = await hotelRoom.book({ value: 2 });
    const bookedEvent = hotelRoom.getEvent("Booked");
    hotelRoom.on(bookedEvent, (from, value) => {
      console.log("Booked event triggered:");
      console.log("From:", from);
      console.log("Value:", value.toString()); 

    });
    await tx.wait();
  });

  testenabled && it("Released Room", async function () {
    const bookTransaction = await hotelRoom.book({ value: 2 });
    await bookTransaction.wait();
    const tx = await hotelRoom.release();
    const releaseEvent = hotelRoom.getEvent("Released");
    hotelRoom.on(releaseEvent, (from) => {
      console.log("Released event triggered:");
      console.log("From:", from);
    });
    await tx.wait();
  });


});