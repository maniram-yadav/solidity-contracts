// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "hardhat/console.sol";

contract Lottery {
    uint totalAmount = 0;
    uint totalPlayers = 0;
    mapping(uint => address payable) public players;
    mapping(address => bool ) public participated;
    enum State {
        Accepting,
        Distributing,
        Paid
    }
    State internal state;
     string public generator = "https://maniram.github.io/";
    event Log(address me,address gambler,uint amount,string message);
    constructor(){
        state = State.Accepting;
    }

    receive() external payable {

    }
    
    fallback() external payable {
        
    }

    modifier ended(){
        require(state == State.Distributing,"Distributing");
        _;
    }

    
    modifier restartable(){
        require(state == State.Paid,"paid");
        _;
    }

    
    modifier acceptable(){
        require(state == State.Accepting,"Accepting");
        _;
    }

    function selectWinnner() private ended {
        emit Log(address(this),msg.sender,msg.value,"select winner");
        uint winner = random() % 5;
        payable(players[winner]).transfer(totalAmount);
        console.log("  --  ");
         console.log("Lottery (selectWinner): randomIndex:%s", winner);
        console.log("%s won %s", players[winner], totalAmount);
        console.log("  --  ");
        state = State.Paid;
        restart();
    }

    function restart() private restartable {
        totalAmount = 0;
        totalPlayers = 0;
        for(uint i=0;i<5;i++){
            participated[players[i]] = false;
        } 
        state = State.Accepting;
    }

    function random () private returns (uint) {
          uint rnd = uint(keccak256(abi.encodePacked(block.prevrandao, block.timestamp))); 
        emit Log(address(this), msg.sender, rnd, "random");        
        return rnd;  
    }

    function wager() public payable acceptable {
        emit Log(address(this),msg.sender,msg.value,"wager");
        if(msg.value > 0) {
            if(participated[msg.sender]==false){
                players[totalPlayers] = payable(msg.sender);
                participated[msg.sender] = true;
                totalAmount++;
                if(totalPlayers == 5){
                    state = State.Distributing;
                }
                
            }
            totalAmount += msg.value;
            if(state==State.Distributing){
                selectWinnner();
            }
                
        }
    }
}