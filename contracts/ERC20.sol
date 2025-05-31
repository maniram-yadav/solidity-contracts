// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ERC20 {
    function totalSupply() external pure returns (uint256 _totalSupply);

    function balanceof(address _owner) external view returns (uint256 balance);

    function transfer(address _to, uint256 _value)
        external
        returns (bool success);

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) external returns (bool success);

    function approve(address _spender, uint256 _value)
        external
        returns (bool success);

    function allowance(address _owner, address _sender)
        external
        view
        returns (uint256 remaining);

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );
}

contract ERC20Impl is ERC20 {
    string public constant symbol = "MEC";
    string public constant name = "My ERC20 Token";
    uint8 public constant decimals = 18;

    uint256 private constant __totalSupply = 1000000000000000000000000;
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowance;

    constructor() {
        _balances[msg.sender] = __totalSupply;
    }

    function totalSupply() public pure override returns (uint256) {
        return __totalSupply;
    }

    function balanceof(address _address)
        public
        view
        override
        returns (uint256)
    {
        return _balances[_address];
    }

    function approve(address _spender, uint256 _value)
        external
        returns (bool success)
    {
        _allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _sender)
        external
        view
        returns (uint256 remaining)
    {
        return _allowance[_owner][_sender];
    }

    function transfer(address _to, uint256 _value)
        public
        override
        returns (bool)
    {
        if (_value > 0 && _value <= _balances[msg.sender]) {
            _balances[msg.sender] -= _value;
            _balances[_to] += _value;
            emit Transfer(msg.sender, _to, _value);
            return true;
        }
        return false;
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public override returns (bool) {
        if (
            _value > 0 &&
            _allowance[_from][msg.sender] > 0 &&
            _allowance[_from][msg.sender] >= _value &&
            !isContract(_to)
        ) {
            _balances[_from] -= _value;
            _balances[_to] += _value;
            emit Transfer(_from, _to, _value);
            return true;
        }
        return false;
    }

    function isContract(address _address) public view returns (bool) {
        uint256 codeSize;
        assembly {
            codeSize := extcodesize(_address)
        }

        return codeSize > 0;
    }
}
