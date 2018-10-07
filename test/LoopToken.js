var LoopToken= artifacts.require("./LoopToken.sol");

contract ("LoopToken",function(accounts){
    var tokenInstance;
    it("inintializes the contracts with correct valuses",function(){
        return LoopToken.deployed().then(function(instance){
            tokenInstance=instance;
            return tokenInstance.name();
        }).then(function(name){
            assert.equal(name,"Loop Token",'has the correct name')
            return tokenInstance.symbol();
        }).then(function(symbol){
            assert.equal(symbol,"LOOP",'has the correct sysmbol')
            return tokenInstance.standard();
        }).then(function(standard){
            assert.equal(standard,"LOOP Token v1.0",'has the correct standard');
        });
    });
    it("allocate the total no of token",function(){
        
        return LoopToken.deployed().then(function(instance){
            tokenInstance=instance;
            return tokenInstance.totalSupply();
        }).then(function(totalSupply){
            assert.equal(totalSupply.toNumber(),1000000,"sets the total Supply to 1,000,000" );
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(adminBalance){
            assert.equal(adminBalance.toNumber(),1000000,"it allocate inital supply to admin account");
        });
    }); 

    it('transfer token owneship',function(){
        return LoopToken.deployed().then(function(instance){
            tokenInstance=instance
            //Test `required statement first by transfering something larger than the snder's banlance
            return tokenInstance.transfer.call(accounts[1],999999999999999999);
        }).then(assert.fail).catch(function(error){
            assert(error.message.indexOf('revert')>=0,'error message must contain revent');
            return tokenInstance.transfer.call(accounts[1],250000,{from:accounts[0]})
        }).then(function(success){
            assert.equal(success,true,'its returs true');
            return tokenInstance.transfer(accounts[1],250000,{from:accounts[0]});
        
        }).then(function(receipt){
            assert.equal(receipt.logs.length,1,'trigger one vent');
            assert.equal(receipt.logs[0].event,'Transfer','Should be the "Transfer" event');
            assert.equal(receipt.logs[0].args._from,accounts[0],'log the account the tokens are transfered from');
            assert.equal(receipt.logs[0].args._to,accounts[1],'logs the account the token are trensfered to');
            assert.equal(receipt.logs[0].args._value,250000,'logs the transfer amount');
            return tokenInstance.balanceOf(accounts[1]);
        }).then(function(banlance){
            assert.equal(banlance.toNumber(),250000,"adds the amount to the receiving accounr");
            return tokenInstance.balanceOf(accounts[0]);
        }).then(function(balanceOf){
            assert.equal(balanceOf.toNumber(),750000,"deducted the amount from the sending account");
        });
    });
});