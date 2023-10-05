# BLSSettlement Contract Suite

BLSSettlement is a suite of Ethereum smart contracts developed using Solidity and is intended to handle settlements and transfers of both Ether and ERC20 tokens with specific authorized contracts.

## Contracts

### BLSSettlement

`BLSSettlement` is a contract responsible for handling settlements in both ETH and ERC20 tokens. The contract allows authorized contracts to initiate fund transfers and maintains the security and integrity of transactions.

### MockERC20

`MockERC20` is a contract used for testing purposes, simulating an ERC20 token by providing basic ERC20 functionalities, such as `transfer()` and `balanceOf()`.

### MockCaller

`MockCaller` is a mock contract utilized for testing `BLSSettlement`. It simulates external contract calls to `BLSSettlement` for transferring ETH and ERC20 tokens.

## Functions

### BLSSettlement

- `authorizeContract(address contractAddress)`: Authorizes a contract to initiate transfers.
- `deauthorizeContract(address contractAddress)`: Revokes the authorization of a contract.
- `transferEth(address payable recipient, uint256 amount)`: Transfers ETH to a recipient.
- `transferToken(address token, address recipient, uint256 amount)`: Transfers ERC20 tokens to a recipient.
- `withdrawAccidentalEth()`: Allows the owner to withdraw accidentally sent ETH.
- `withdrawAccidentalToken(address token)`: Allows the owner to withdraw accidentally sent tokens.

### MockERC20 (Basic ERC20 Functions)

- `transfer(address recipient, uint256 amount)`: Transfers tokens to a recipient.
- `balanceOf(address account)`: Returns the token balance of an account.

### MockCaller

- `transferEth(address payable settlement, address payable recipient, uint256 amount)`: Invokes the `transferEth` function of `BLSSettlement`.
- `transferToken(address settlement, address token, address recipient, uint256 amount)`: Invokes the `transferToken` function of `BLSSettlement`.

## Setup and Testing

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Truffle](https://www.trufflesuite.com/)
- [Ganache](https://www.trufflesuite.com/ganache) (or any Ethereum blockchain testing environment)

### Installation

1. **Install Dependencies**
   ```
   npm install
   ```
2. **Compile Contracts**
   ```
   truffle compile
   ```
3. **Deploy Contracts**
   ```
   truffle migrate
   ```
4. **Run Tests**
   ```
   truffle test
   ```

## License

This project is licensed under the MIT License.

## Disclaimer

This contract suite is for educational and testing purposes only. Make sure to conduct thorough testing and audits before deploying any smart contract to production environments.
