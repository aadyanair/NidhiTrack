# NidhiTrack

NidhiTrack is a blockchain-based subsidy tracker that aims to bring transparency to subsidy distribution by storing records immutably on the Ethereum blockchain.

## Features

- Only authorized government address can add subsidy records
- Subsidy details include recipient ID, amount, date, and purpose
- All data is publicly viewable on the blockchain

## Tech Stack

- Solidity (Smart Contracts)
- Hardhat (Ethereum development environment)
- JavaScript (Deployment scripts)

## Getting Started

1. Clone the repo  
2. Run `npm install` to install dependencies  
3. Compile contracts with `npx hardhat compile`  
4. Run a local blockchain node using `npx hardhat node`  
5. Deploy contract with `npx hardhat run scripts/deploy.js --network localhost`

## Project Structure

NidhiTrack/
├── contracts/          # Solidity smart contracts
├── scripts/            # Deployment scripts
├── hardhat.config.js   # Hardhat configuration
├── package.json        # NPM dependencies
└── README.md           # Project overview



## Author

Aadya Nair

---

*Project in progress...*
