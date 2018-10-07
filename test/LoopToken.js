var LoopToken= artifacts.require("./LoopToken.sol");

contract ("LoopToken",function(accounts){
    it("set the total no of token",function(){

        return LoopToken.deployed().then(function(instance){
            tokenInstance=instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply){
            assert.equal(totalSupply.toNumber(),1000000,"sets the total Supply to 1,000,000" );
        });
    }); 
});