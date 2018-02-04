


class Transaction {
    constructor (fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor( timestamp, transactions, previousHash = '') {
        // CLASS PROPERTIES
        // INDEX IS USED JUST FOR DEMO PURPOSE, THE INDEX OF A BLOCK INSIDE A BLOCKCHAIN IS THE ORDER INSIDE THE BLOCKCHAIN ARRAY
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.hash = this.calculateHash();
        // RANDOM VALUE TO CHANGE HASH
        this.nonce = 0;
    }

    // USING SHA245, CALCULATE HASH FROM BLOCK STRUCTURE
    calculateHash() {
      return sha256(this.previousHash + this.timestamp + JSON.stringify(this.transactions)  + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
    }
}

class Blockchain{
    constructor() {
        // INITIALIZE THE BLOCKCHAIN BY CREATING FIRST BLOCK
        this.chain = [this.createGoldyBlock()];
        this.difficulty = 3;
        this.pendingTransactions = [];
        this.miningRewards = 4;
    }
    createGoldyBlock() {
        // FIRST BLOCK STRUCTURE
        return new Block(Date.parse("2017-01-01"), [], "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    minePendingTransactions (miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock(this.difficulty);
        
        this.chain.push(block);
        //console.log("this.chain.push", this.chain);

        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningRewards)
        ]
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;
        for (const block of this.chain) {
            console.log("for block", block);
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }
                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }
        console.log("return balance", balance);
        return balance;
    }    
}

// ADD 3 MORE BLOCK TO THE BLOCKCHAIN
let goldyCoin = new Blockchain();
function sendMoney() {
    goldyCoin.createTransaction(new Transaction("adress A", "address B", 100));
    goldyCoin.createTransaction(new Transaction("adress B", "address A", 50));
    $("#initial_blockchain").html(  "100 goldyCoins sent to Address B, on Pending Transactions" );
}

function mineReward() {
    //console.log('Start Mining');
    goldyCoin.minePendingTransactions('reward-address');
    goldyCoin.minePendingTransactions('reward-address');    
    $("#initial_blockchain").html(  "Mining done, Miner Reward: " + goldyCoin.getBalanceOfAddress('reward-address') + " goldyCoins" );

}
 

  
 
 