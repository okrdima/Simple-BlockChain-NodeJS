const { Transaction, Block, Blockchain } = require('./app/')
const moment = require('moment')
const EC = require('elliptic').ec
const ec = new EC('secp256k1')

const blockchain = new Blockchain()
// blockchain.addBlock(
//   new Block(1, moment().format('YYYY-MM-DD HH:mm:ss'), { amount: 4 })
// )
// blockchain.addBlock(
//   new Block(2, moment().format('YYYY-MM-DD HH:mm:ss'), { amount: 15 })
// )

// STEP 1
// blockchain.chain[1].data = { amount: 100 } if we change data filed construction of blockchain will be broken
// console.log('Is blockchain valid  - ', blockchain.isChainValid())
// console.log('\nBlockchain: ', JSON.stringify(blockchain, null, 4))

// STEP 2 add Mining
// console.log('Mining block 1')
//
// blockchain.addBlock(
//   new Block(1, moment().format('YYYY-MM-DD HH:mm:ss'), { amount: 4 })
// )
// console.log('Mining block 2')
//
// blockchain.addBlock(
//   new Block(2, moment().format('YYYY-MM-DD HH:mm:ss'), { amount: 15 })
// )

// STEP 3 add transactions
// blockchain.createTransaction(new Transaction('address1', 'address2', 100))
// blockchain.createTransaction(new Transaction('address2', 'address1', 50))
//
// console.log('\n Starting miner')
// blockchain.minePendingTransaction('Dimas-address')
//
// console.log(
//   '\n Balance on Dima is',
//   blockchain.getBalanceOfAddress('Dimas-address')
// )
//
// console.log('\n Starting miner again')
// blockchain.minePendingTransaction('Dimas-address')
//
// console.log(
//   '\n Balance on Dima is',
//   blockchain.getBalanceOfAddress('Dimas-address')
// )
// console.log('\nBlockchain: ', JSON.stringify(blockchain, null, 4))

// STEP 4

// const myKey = ec.keyFromPrivate(
//   '1bdf3b4d23a72d84ebfc6aee60629d176afe6283e2d635e4fbb692af2e039ce2'
// )
// const myWalletAddress = myKey.getPublic('hex')

// const tx1 = new Transaction(myWalletAddress, 'public', 1)
// tx1.signTransaction(myKey)
// blockchain.addTransaction(tx1)
//
// console.log('Start miner')
// blockchain.minePendingTransactions(myWalletAddress)
//
// console.log('Balance is ', blockchain.getBalanceOfAddress(myWalletAddress))
//
// console.log('is chain valid', blockchain.isChainValid())

// STEP 5
// Your private key goes here
const myKey = ec.keyFromPrivate(
  '7c4c45907dec40c91bab3480c39032e90049f1a44f3e18c3e07c23e3273995cf'
)

// From that we can calculate your public key (which doubles as your wallet address)
const myWalletAddress = myKey.getPublic('hex')

// Create new instance of Blockchain class
const savjeeCoin = new Blockchain()

// Mine first block
savjeeCoin.minePendingTransactions(myWalletAddress)

// Create a transaction & sign it with your key
const tx1 = new Transaction(myWalletAddress, 'address2', 100)
tx1.signTransaction(myKey)
savjeeCoin.addTransaction(tx1)

// Mine block
savjeeCoin.minePendingTransactions(myWalletAddress)

// Create second transaction
const tx2 = new Transaction(myWalletAddress, 'address1', 50)
tx2.signTransaction(myKey)
savjeeCoin.addTransaction(tx2)

// Mine block
savjeeCoin.minePendingTransactions(myWalletAddress)

console.log(
  `Balance of xavier is ${savjeeCoin.getBalanceOfAddress(myWalletAddress)}`
)

// Uncomment this line if you want to test tampering with the chain
// savjeeCoin.chain[1].transactions[0].amount = 10;

// Check if the chain is valid
console.log('Blockchain valid?', savjeeCoin.isChainValid() ? 'Yes' : 'No')
