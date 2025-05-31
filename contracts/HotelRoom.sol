// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


 contract HotelRoom {

    enum RoomStatus {
        Available,
        Booked
    }
    RoomStatus status;
      address payable public owner;

    constructor(){
        owner = payable(msg.sender);
        status = RoomStatus.Available;
    }

    event Booked(address _occupant,uint256 _value);
    event Released(address _occupant);
    
    modifier onlyBooked(){
        require(status==RoomStatus.Booked,"Room is not booked");
        _;
    }

    modifier onlyAvailable(){
        require(status==RoomStatus.Available,"Room is now available");
        _;
    }
     modifier costs(uint256 amount){
        require(msg.value>=amount,"Not enough either provided");
        _;
    }

    function book() external payable onlyAvailable costs(2){
        status = RoomStatus.Booked;
        owner.transfer(msg.value);
        emit Booked(msg.sender,msg.value);
    }

    function release() external  onlyBooked {
        status = RoomStatus.Available;
        emit Released(msg.sender);
    }
 }