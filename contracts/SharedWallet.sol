// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


contract SharedWallet {

    address private _owner;
    mapping(address => bool) private _owners;
    uint256 public _totalOwners;
    constructor(){
        _owner = msg.sender;
        _owners[msg.sender] = true;
        _totalOwners = 1;
    }

    event DepositFund(address indexed from,uint256 amount);
    event TransferFund(address indexed from,address indexed to,uint256 amount);
    event WithdrawFund(address indexed from,uint256 amount);
    event Fallback(address indexed from);
    

    modifier validOwner(){
        require(_owners[msg.sender],"Sender is not valid owner of shared wallet");
        _;
    }

    modifier onlyOwner(){
        require(msg.sender==_owner,"Not valid owner");
        _;
    }

    receive() external payable {
        emit DepositFund(msg.sender,msg.value);
    }
    fallback() external { 
        emit Fallback(msg.sender);
     }

    function addOwner(address owner) external onlyOwner {
            _owners[owner] = true;
            _totalOwners +=1;
    }
    function removeOwner(address owner) external onlyOwner {
            _owners[owner] = false;
            delete _owners[owner];
            _totalOwners -=1;
    }

    function transferTo(address _to,uint256 amount) external payable validOwner {
        require(address(this).balance >= amount,"Insufficient amount");
        payable(_to).transfer(amount);
        emit TransferFund(address(this),_to,amount);
    }
       
       
    function withdraw(uint256 amount) external payable validOwner {
        require(address(this).balance >= amount,"Insufficient amount for withdraw");
        payable(msg.sender).transfer(amount);
        emit WithdrawFund(msg.sender,amount);
    }

    function balance() external  view validOwner returns (uint256){
        return  address(this).balance;
    }

    function totalOwners() external  view validOwner returns (uint256){
        return  _totalOwners;
    }


}