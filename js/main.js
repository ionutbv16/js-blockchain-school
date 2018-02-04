 

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        // CLASS PROPERTIES
        // INDEX IS USED JUST FOR DEMO PURPOSE, THE INDEX OF A BLOCK INSIDE A BLOCKCHAIN IS THE ORDER INSIDE THE BLOCKCHAIN ARRAY
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.calculateHash();
    }

    // USING SHA245, CALCULATE HASH FROM BLOCK STRUCTURE
    calculateHash() {
      return sha256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}


class Blockchain{
    constructor() {
        // INITIALIZE THE BLOCKCHAIN BY CREATING FIRST BLOCK
        this.chain = [this.createGoldyBlock()];
    }

    createGoldyBlock() {
        // FIRST BLOCK STRUCTURE
        return new Block(0, "01/01/2018", "Initial block goldyCoin", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
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

// ADD 2 MORE BLOCK TO THE BLOCKCHAIN
let goldyCoin = new Blockchain();
goldyCoin.addBlock(new Block(1, "02/01/2018", { amount: 4 }));
goldyCoin.addBlock(new Block(2, "03/01/2018", { amount: 9 }));

// SOME CONSOLE CHECKS
console.log('Blockchain ', goldyCoin);
console.log('is blockchain valid? ' + goldyCoin.checkChainValidity());
 
function updateAmount() {
    goldyCoin.chain[1].data = { amount: 100 };
    $("#initial_blockchain_check").html(  JSON.stringify(goldyCoin.checkChainValidity()) ); 
    $("#initial_blockchain").html(  JSON.stringify(goldyCoin, undefined, 2) );
   // console.log("Blockchain valid? " + goldyCoin.checkChainValidity());
}

function updateHash() {
    goldyCoin.chain[1].hash = goldyCoin.chain[1].calculateHash();
    goldyCoin.chain[2].previousHash = goldyCoin.chain[1].hash;
    goldyCoin.chain[2].hash = goldyCoin.chain[2].calculateHash();
    $("#initial_blockchain").html(  JSON.stringify(goldyCoin, undefined, 2) );
    $("#initial_blockchain_check").html(  JSON.stringify(goldyCoin.checkChainValidity()) ); 

    console.log("calculateHash valid? " + goldyCoin.chain[1].hash + JSON.stringify(goldyCoin.checkChainValidity()) );
    
}
 