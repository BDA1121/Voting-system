const Blockchain = require('./bc');

const bt = new Blockchain();

const bc1 = {
    "chain": [
    {
    "index": 1,
    "timestamp": 1618484844641,
    "transactions": [],
    "nonce": 100,
    "hash": "0",
    "prevblkhash": "0"
    },
    {
    "index": 2,
    "timestamp": 1618484933466,
    "transactions": [],
    "nonce": 16441,
    "hash": "00009b2ef664890dbcd795344f8145bac1710db47cea457183f41c9ca24c3285",
    "prevblkhash": "0"
    },
    {
    "index": 3,
    "timestamp": 1618485021683,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "c1e566009dda11eb91a8198fcc12e950",
    "transactionID": "f6e694f09dda11eb91a8198fcc12e950"
    },
    {
    "amount": 350,
    "sender": "asdasdas",
    "recipient": "asfasf",
    "transactionID": "228803f09ddb11eb91a8198fcc12e950"
    },
    {
    "amount": 30,
    "sender": "asdasdas",
    "recipient": "asfasf",
    "transactionID": "2494eaf09ddb11eb91a8198fcc12e950"
    },
    {
    "amount": 301,
    "sender": "asdasdas",
    "recipient": "asfasf",
    "transactionID": "271cce509ddb11eb91a8198fcc12e950"
    }
    ],
    "nonce": 12350,
    "hash": "00002f6fa943a427517d3dcef6e833f9af5a4f8f6be427c7fd7942e0d776fd48",
    "prevblkhash": "00009b2ef664890dbcd795344f8145bac1710db47cea457183f41c9ca24c3285"
    },
    {
    "index": 4,
    "timestamp": 1618485092887,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "c1e566009dda11eb91a8198fcc12e950",
    "transactionID": "2b6d8ad09ddb11eb91a8198fcc12e950"
    },
    {
    "amount": 601,
    "sender": "asdasdas",
    "recipient": "asfasf",
    "transactionID": "4e77ba009ddb11eb91a8198fcc12e950"
    },
    {
    "amount": 60,
    "sender": "asdasdas",
    "recipient": "asfasf",
    "transactionID": "5058fd209ddb11eb91a8198fcc12e950"
    }
    ],
    "nonce": 27278,
    "hash": "00007f7c6a8da959d6fc73315c33959d638528466d47fb4205502c0343466c70",
    "prevblkhash": "00002f6fa943a427517d3dcef6e833f9af5a4f8f6be427c7fd7942e0d776fd48"
    },
    {
    "index": 5,
    "timestamp": 1618485105839,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "c1e566009dda11eb91a8198fcc12e950",
    "transactionID": "55dda5c09ddb11eb91a8198fcc12e950"
    }
    ],
    "nonce": 4995,
    "hash": "00005760f220c1b43808b778728c29eb6ceb643ebd0cb63995e8464f9c7187ec",
    "prevblkhash": "00007f7c6a8da959d6fc73315c33959d638528466d47fb4205502c0343466c70"
    },
    {
    "index": 6,
    "timestamp": 1618485111528,
    "transactions": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "c1e566009dda11eb91a8198fcc12e950",
    "transactionID": "5d95f7409ddb11eb91a8198fcc12e950"
    }
    ],
    "nonce": 213221,
    "hash": "0000e4e31eb710b7c33e6e5c76ea0c302906ccbe5c24c4d53d77071a82cc9ec3",
    "prevblkhash": "00005760f220c1b43808b778728c29eb6ceb643ebd0cb63995e8464f9c7187ec"
    }
    ],
    "pendTrans": [
    {
    "amount": 12.5,
    "sender": "00",
    "recipient": "c1e566009dda11eb91a8198fcc12e950",
    "transactionID": "60fa30e09ddb11eb91a8198fcc12e950"
    }
    ],
    "currentnNodeUrl": "http://localhost:3001",
    "networkNodes": []
    }

    console.log(bt.chainIsValid(bc1.chain))

// console.log(bt)