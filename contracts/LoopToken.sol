pragma solidity ^0.4.2;

contract LoopToken {
    //Name
    string public name = "Loop Token";
    //Symbol
    string public symbol="LOOP";
    //standard Option 
    string public standard="LOOP Token v1.0";
    //Total Supply
    uint256 public totalSupply;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    mapping(address => uint256) public balanceOf;

    function LoopToken(uint256 _initialSupply) public {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    } 

    //Transfer    
    function transfer(address _to,uint256 _value) returns (bool sucess) {
        //Exction is account doesn't have enough token
        require(balanceOf[msg.sender] >= _value);
        //Transfer token
        balanceOf[msg.sender]-=_value;
        balanceOf[_to]+=_value;
        //Taransfer Event
        Transfer(msg.sender,_to,_value);
        //Return boolean
        return true;
        
    }
}