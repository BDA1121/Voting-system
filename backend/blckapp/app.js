const express = require('express'),
      bodyParser = require('body-parser'),
      Blockchain = require('./bc'),
      uuid = require('uuid'),
      port = process.argv[2],
      rp = require('request-promise'),
      cors = require('cors');;
const app = express();

const nodeAddress = uuid.v1().split('-').join('');
const bt = new Blockchain();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//to get blockchain
app.get('/blockchain',function(req,res){
    return res.status(200).json(bt)
})


app.post('/transaction',function(req,res){
    const trans = req.body;
    const blkIndex = bt.addTransToPend(trans);
    res.json({note:`added to ${blkIndex}`})
})

// to broadcast the vote and create it
app.post('/transaction/broad',function(req,res){
    const newTrans = bt.createTrans(req.body.amount,req.body.sender,req.body.recipient);
    bt.addTransToPend(newTrans);
    const requestPromises = [];
    bt.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/transaction',
            method: 'POST',
            body: newTrans,
            json: true
        };
        requestPromises.push(rp(requestOptions)) 
    });

    Promise.all(requestPromises)
    .then(data =>{
        res.json({note:"TRans broad"})
    })
})

//to mine a new block
app.get('/mine',function(req,res){
    const lastBlk = bt.getLast();
    const prevblkhash = lastBlk['hash'];
    const curblkdata = {
        transactions: bt.pendTrans,
        index: lastBlk['index'] +1
    };
    const nonce = bt.proofWork(prevblkhash,curblkdata);
    const hash = bt.hashBlk(prevblkhash,curblkdata,nonce);
    
    const newBlk = bt.createBlock(nonce,prevblkhash,hash);

    const requestPromises = [];
    bt.networkNodes.forEach(networkNodeUrl => {
        const requestOptions = {
            uri: networkNodeUrl + '/receive-blk',
            method: 'POST',
            body: {newBlk : newBlk},
            json : true
        }
        requestPromises.push(rp(requestOptions)) 
    });

    Promise.all(requestPromises)
    .then(data=>{
        const requestOptions = {
            uri: bt.currentnNodeUrl + '/transaction/broad',
            method: 'POST',
            body: {amount:12.5,sender:'00',recipient:nodeAddress},
            json: true
        }
        return rp(requestOptions);
    })
    .then(data => {
        res.json({note:"new blk",blk:newBlk})
    })
})

//block recieved from broadcast
app.post('/receive-blk',function(req,res){
    const newBlk = req.body.newBlk;
    const lastBlk = bt.getLast();
    const correcthash = lastBlk.hash === newBlk.prevblkhash;
    const correctIndex = lastBlk['index']+ 1 === newBlk['index'];
    if(correctIndex&&correcthash){
        bt.chain.push(newBlk);
        bt.pendTrans = [];
        res.json({note:"new blk received and added",newBlk:newBlk})
    } else{
        res.json({note:"blk rejected",Blk:newBlk});
    }
})

app.post('/reg-and-brd',function(req,res){
    const newNodeUrl = req.body.newNodeUrl;
	if (bt.networkNodes.indexOf(newNodeUrl) == -1) bt.networkNodes.push(newNodeUrl);

	const regNodesPromises = [];
	bt.networkNodes.forEach(networkNodeUrl => {
		const requestOptions = {
			uri: networkNodeUrl + '/reg-node',
			method: 'POST',
			body: { newNodeUrl: newNodeUrl },
			json: true
		};

		regNodesPromises.push(rp(requestOptions));
	});

	Promise.all(regNodesPromises)
	.then(data => {
		const bulkRegisterOptions = {
			uri: newNodeUrl + '/reg-bulk',
			method: 'POST',
			body: { allNetworkNodes: [ ...bt.networkNodes, bt.currentnNodeUrl ] },
			json: true
		};

		return rp(bulkRegisterOptions);
	})
	.then(data => {
		res.json({ note: 'New node registered with network successfully.' });
	});
})


//to register node
app.post('/reg-node', function(req,res){
    const newNodeUrl = req.body.newNodeUrl;
    if(bt.networkNodes.indexOf(newNodeUrl)=== -1 && bt.currentnNodeUrl !== newNodeUrl){
        bt.networkNodes.push(newNodeUrl);
    }
    res.json({note:"someone is here"})
})

app.post('/reg-bulk',function(req,res){
    const allNetworkNodes = req.body.allNetworkNodes;
    allNetworkNodes.forEach(networkNodeUrl =>{
        if(bt.networkNodes.indexOf(networkNodeUrl)=== -1 && bt.currentnNodeUrl !== networkNodeUrl){
            bt.networkNodes.push(networkNodeUrl);
        }
    })
    res.json({note:"bulk reg done"});
})

// to check the validity of the chain
app.get('/consensus',function(req,res){
    const requestPromises = [];
    bt.networkNodes.forEach(networkNodeUrl =>{
        const requestOptions = {
            uri: networkNodeUrl + '/blockchain',
            method: 'GET',
            json: true
        }
        requestPromises.push(rp(requestOptions));
    })
    Promise.all(requestPromises)
    .then(blkChains=>{
        const curChainLen = bt.chain.length;
        let maxChainLen = curChainLen;
        let newLongChain = null;
        let NewPendTrans = null;
        blkChains.forEach(blkChain=>{
            if(blkChain.chain.length > maxChainLen){
                maxChainLen = blkChain.chain.length;
                newLongChain = blkChain.chain;
                NewPendTrans = blkChain.pendTrans;
            }
        })
        if(!newLongChain || (newLongChain && !bt.chainIsValid(newLongChain))){
            res.json({note:'current chain not cahnged',chain:bt.chain});
        }
        else{
            bt.chain = newLongChain;
            bt.pendTrans =NewPendTrans;
            res.json({note:'note changed',chain:bt.chain})
        }
    })
})

app.get('/block/:blockhash',function(req,res){
    const blockHash = req.params.blockhash;
    const correctBlock = bt.getBlock(blockHash);
    res.json({blk:correctBlock});
})

app.get('/transaction/:transactionId',function(req,res){
    const transactionId = req.params.transactionId;
    // console.log("ok")
    const transactionData = bt.getTrans(transactionId);
    // console.log("ok2")
    res.json({transactionData:transactionData});
})

app.get('/address/:address',function(req,res){
    const address = req.params.address;

    const addressData = bt.getAddress(address);

    res.json({addressData:addressData})
})

app.listen(port,function(){
    console.log("boomhikichakchak")
});
