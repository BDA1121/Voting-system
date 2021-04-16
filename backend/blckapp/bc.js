const sha256 = require('sha256'),
    uuid = require('uuid');
const currentnNodeUrl = process.argv[3];

function Blockchain() {
    this.chain = [];
    this.pendTrans = [];

    this.currentnNodeUrl = currentnNodeUrl;
    this.networkNodes = [];

    this.createBlock(100,'0','0');
}

Blockchain.prototype.createBlock = function(nonce, prevblkhash, hash){
    const newblk = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transactions: this.pendTrans,
        nonce: nonce,
        hash:hash,
        prevblkhash:prevblkhash
    };
    this.pendTrans = [];
    this.chain.push(newblk);
    return newblk;
}

Blockchain.prototype.getLast = function(){
    return this.chain[this.chain.length - 1];
}

Blockchain.prototype.createTrans = function(amount, send, rec){
    const newTrans = {
        amount:amount,
        sender: send,
        recipient: rec,
        transactionID: uuid.v1().split('-').join('')
    };
    // this.pendTrans.push(newTrans)
    return newTrans;
}

Blockchain.prototype.addTransToPend = function(trans){
    this.pendTrans.push(trans);
    return this.getLast()['index'] + 1;
}

Blockchain.prototype.hashBlk = function(prevblkhash, curblkdata, nonce){
    const data = prevblkhash + nonce.toString() + JSON.stringify(curblkdata);
    const hash = sha256(data);
    return hash;
}

Blockchain.prototype.proofWork = function(prevblkhash, curblkdata){
    let nonce = 0;
    let hash = this.hashBlk(prevblkhash,curblkdata,nonce);
    while(hash.substring(0,4) !== '0000'){
        nonce++;
        hash = this.hashBlk(prevblkhash,curblkdata, nonce);
    }
    return nonce;
}

Blockchain.prototype.chainIsValid = function(blockchain){
    let validChain = true;
    for(var i =1;i < blockchain.length;i++){
        const currentBlock = blockchain[i];
		const prevBlock = blockchain[i - 1];
		const blockHash = this.hashBlk(prevBlock['hash'], { transactions: currentBlock['transactions'], index: currentBlock['index'] }, currentBlock['nonce']);
        if(blockHash.substring(0,4) !== '0000'){
            validChain = false;
        }
        if(currentBlock['prevblkhash'] !== prevBlock['hash']){
            validChain = false
            console.log("my fault1")
        };
    }
    const genesisBlk = blockchain[0];
    const correctnonce = genesisBlk['nonce'] === 100;
    const correctHash = genesisBlk['hash'] === '0';
    const correctTrans = genesisBlk['transactions'].length === 0;
    if(!correctnonce || !correctHash || !correctTrans){
        validChain =false;
        console.log("my fault")
    }
    return validChain;
}

Blockchain.prototype.getBlock = function(blockHash){
    let correctBlock = null;
    this.chain.forEach(block =>{
        if(block.hash === blockHash){
            correctBlock = block;
        }
    })
    return correctBlock;
}

Blockchain.prototype.getTrans= function(transactionId){
    let correctTrans = null;
    let correctBlock = null;
    this.chain.forEach(block=>{
        block.transactions.forEach(transaction =>{
            if(transaction.transactionID === transactionId){
                correctTrans = transaction;
                correctBlock = block;
            }
        })
    })
    return {transaction:correctTrans, block:correctBlock}
}

Blockchain.prototype.getAddress = function(address){
    const addressTransactions = [];
    this.chain.forEach(block=>{
        block.transactions.forEach(transaction=>{
            if(transaction.sender === address || transaction.recipient === address){
                addressTransactions.push(transaction);
            }
        })
    })

    let total = 0;
    addressTransactions.forEach(transaction=>{
        if(transaction.recipient === address){
            total += transaction.amount;
        }
        else if(transaction.sender === address){
            total -= transaction.amount
        }
    })

    return {
        addressTransactions :addressTransactions,
        total : total
    }
}

module.exports = Blockchain;