# BLSSettlement Contract Suite

BLSSettlement is a suite of Ethereum smart contracts developed using Solidity, designed to handle settlements and transfers of both Ether and ERC20 tokens with specific authorized contracts. This suite has been updated to utilize the Hardhat development environment.

## Contracts

### BLSIdentityRegistry

BLSIdentityRegistry allows the owner to register, update, and delete key signature pairs and IPFS CIDs, each associated with an identifier.

### BLSSettlement

BLSSettlement manages settlements in both ETH and ERC20 tokens.

### MockERC20

MockERC20 simulates an ERC20 token for testing purposes.

### MockCaller

MockCaller is utilized for testing BLSSettlement, simulating external contract calls.

### \[Other Contracts\]

Detail additional contracts as per your suite here.

## Functions

\[The detailed functions of each contract can be kept the same as your original README.\]

## Setup and Testing

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Hardhat](https://hardhat.org/)
- [Ethereum Test Account](https://metamask.io/)

### Installation

1.  Install Dependencies

npm install

3.  Compile Contracts

npx hardhat compile

5.  Run Local Ethereum Node

npx hardhat node

7.  Deploy Contracts

npx hardhat run --network localhost scripts/deploy.js

9.  Run Tests

npx hardhat test

### Example Deploy Script (scripts/deploy.js)

        // scripts/deploy.js
        async function main() {
            const BLSIdentityRegistry = await ethers.getContractFactory("BLSIdentityRegistry");
            const blsIdentityRegistry = await BLSIdentityRegistry.deploy(/\* constructor arguments here \*/);
            console.log("BLSIdentityRegistry deployed to:", blsIdentityRegistry.address);

            // Deploy other contracts similarly...
        }

        main()
            .then(() => process.exit(0))
            .catch((error) => {
                console.error(error);
                process.exit(1);
            });


### Connect to MetaMask (Optional)

Connect to the local Ethereum node provided by Hardhat Network using MetaMask.

1.  Open MetaMask and connect to the network http://localhost:8545.
2.  Import a test account using the private key provided by Hardhat Network.

## License

This project is licensed under the MIT License.

## Disclaimer

This contract suite is for educational and testing purposes only. Conduct thorough testing and audits before deploying any smart contract to production environments.
