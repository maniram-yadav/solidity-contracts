// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/utils/math/Math.sol";


contract TimeLock {
    
    using Math for uint256;

    mapping(address => uint256) public balances;
    mapping(address => uint256) public lockTime;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        lockTime[msg.sender] = block.timestamp + 1 weeks;
    }

    function increaseTimeLock(uint256   secondsToIncrease) public {
        lockTime[msg.sender] = lockTime[msg.sender] +secondsToIncrease;
    }

    function withdraw() public {
        require(balances[msg.sender]>0,"Inefficient fund");
        require(block.timestamp > lockTime[msg.sender],"lock time have not expired");
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool sent,) = msg.sender.call{value:amount}("");
        require(sent,"Failed to send transfer");
    }
}