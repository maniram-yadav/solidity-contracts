# easy-deploy-blockchain-project-hardhat
Easily blockchain project (smart contract) with hardhat

# Tax Record Smart Contract Project

This project implements a simple tax record system on the Ethereum blockchain using Hardhat and TypeScript. It allows for adding, retrieving, and deleting tax records on the blockchain.

## Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- An Ethereum wallet (like MetaMask)
- Alchemy API key (for deploying to Sepolia testnet and mainnet)

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/code4mk/easy-deploy-blockchain-project-hardhat.git
   cd easy-deploy-blockchain-project-hardhat
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your configuration:
   ```
   SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
   PRIVATE_KEY=your_wallet_private_key
   MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
   MAINNET_PRIVATE_KEY=your_mainnet_private_key
   ETHERSCAN_API_KEY=your_etherscan_api_key
   ```

## Compilation

Compile the smart contracts:

```bash
npx hardhat compile
```

## Testing

Run the test suite:

```bash
npx hardhat test
```

## Deployment and Interaction

### Local Deployment (Hardhat Network)

1. Start a local Hardhat node:
   ```bash
   npx hardhat node
   ```

2. In a new terminal, deploy the contract:
   ```bash
   npm run deploy:localhost
   ```

3. Interact with the contract:
   ```bash
   npx hardhat run scripts/interact.ts --network localhost
   ```

### Sepolia Testnet Deployment

1. Ensure you have Sepolia ETH. You can get some from a faucet like [Alchemy's Sepolia Faucet](https://sepoliafaucet.com/).

2. Deploy the contract:
   ```bash
   npm run deploy:sepolia
   ```

3. Interact with the contract:
   ```bash
   npx hardhat run scripts/interact.ts --network sepolia
   ```

### Mainnet Deployment

1. Ensure you have sufficient ETH in your wallet to cover gas fees.

2. Deploy the contract:
   ```bash
   npm run deploy:mainnet
   ```

3. Interact with the contract:
   ```bash
   npx hardhat run scripts/interact.ts --network mainnet
   ```

## Contract Interaction using Hardhat Console

You can also interact with the deployed contract using the Hardhat console:

1. For localhost:
   ```bash
   npx hardhat console --network localhost
   ```

2. For Sepolia:
   ```bash
   npx hardhat console --network sepolia
   ```

3. For Mainnet:
   ```bash
   npx hardhat console --network mainnet
   ```

Then, in the console:

```javascript
const TaxRecord = await ethers.getContractFactory("TaxRecord");
const taxRecord = await TaxRecord.attach("DEPLOYED_CONTRACT_ADDRESS");
await taxRecord.addRecord("John Doe", ethers.parseEther("1.5"));
const record = await taxRecord.getRecord(1);
console.log(record);
```

Replace `DEPLOYED_CONTRACT_ADDRESS` with the actual address of your deployed contract.

## Gas Management

- For Sepolia testnet, get free ETH from a Sepolia faucet.
- For mainnet deployment, ensure you have sufficient ETH to cover gas fees.

## Etherscan Verification

After deployment, you can verify your contract on Etherscan:

```bash
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS
```

Replace `sepolia` with `mainnet` for mainnet deployments.

## Project Structure

```
tax-record-smart-contract/
├── contracts/
│   └── TaxRecord.sol
├── scripts/
│   ├── deploy.ts
│   └── interact.ts
├── test/
│   └── TaxRecord.test.ts
├── .env
├── .gitignore
├── hardhat.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.