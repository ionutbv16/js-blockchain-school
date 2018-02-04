 

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        // CLASS PROPERTIES
        // INDEX IS USED JUST FOR DEMO PURPOSE, THE INDEX OF A BLOCK INSIDE A BLOCKCHAIN IS THE ORDER INSIDE THE BLOCKCHAIN ARRAY
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
        // RANDOM VALUE TO CHANGE HASH
        this.nonce = 0;
    }

    // USING SHA245, CALCULATE HASH FROM BLOCK STRUCTURE
    calculateHash() {
      return sha256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)  + this.nonce).toString();
    }
    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("BLOCK MINED: " + this.hash);
    }

}

class Blockchain{
    constructor() {
        // INITIALIZE THE BLOCKCHAIN BY CREATING FIRST BLOCK
        this.chain = [this.createGoldyBlock()];
        this.difficulty = 3;
    }
    createGoldyBlock() {
        // FIRST BLOCK STRUCTURE
        return new Block(0, "01/01/2018", "Initial block goldyCoin", "0");
    }
    emptyChain() {
        //  
        this.chain = [this.createGoldyBlock()];
    }
    setDifficulty(diff) {
        //  
        this.difficulty = diff;
    }
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock) {
        var _this = this;
        setTimeout(function(){
            newBlock.previousHash = _this.getLatestBlock().hash;
            newBlock.mineBlock(_this.difficulty);
            _this.chain.push(newBlock);
            console.log("chain updated: ", _this.chain);
            $("#initial_blockchain").html(  JSON.stringify(_this.chain, undefined, 2) );
            
        }, 100);
    }

    // VERIFY EACH BLOCK INSIDE BLOCKCHAIN
    checkChainValidity() {
        for (let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                //console.log("hash " + i);
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                //console.log("previousHash " + i);
                return false;
            }
        }
        return true;
    }
}

// ADD 3 MORE BLOCK TO THE BLOCKCHAIN
let goldyCoin = new Blockchain();
goldyCoin.addBlock(new Block(1, "02/01/2018", { amount: 4 }));
goldyCoin.addBlock(new Block(2, "03/01/2018", { amount: 9 }));
goldyCoin.addBlock(new Block(3, "04/01/2018", { amount: 19 }));

// SOME CONSOLE CHECKS
console.log('Blockchain ', goldyCoin);
 
function updateDiff(diff) {
    goldyCoin.emptyChain();
    $("#initial_blockchain").html( "Mining Chain now ... please wait for about 16 secounds ... more in console.log" );
    goldyCoin.setDifficulty(diff);
    goldyCoin.addBlock(new Block(1, "02/01/2018", { amount: 4 }));
    goldyCoin.addBlock(new Block(2, "03/01/2018", { amount: 9 }));
    goldyCoin.addBlock(new Block(3, "04/01/2018", { amount: 19 }));

}
 
 