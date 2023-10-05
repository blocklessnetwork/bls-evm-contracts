// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BLSSettlement is Ownable {
    
    constructor(address initialOwner) Ownable(initialOwner) {}

    mapping(address => bool) public authorizedContracts;
    
    event FundsTransferred(address from, address to, uint256 amount, address tokenAddress);
    event ContractAuthorized(address contractAddress);
    event ContractDeauthorized(address contractAddress);
    
    modifier onlyAuthorizedContracts() {
        require(authorizedContracts[msg.sender], "Not authorized");
        _;
    }
    
    // Authorize a contract to use the settlement functions
    function authorizeContract(address contractAddress) external onlyOwner {
        authorizedContracts[contractAddress] = true;
        emit ContractAuthorized(contractAddress);
    }
    
    // Deauthorize a contract to use the settlement functions
    function deauthorizeContract(address contractAddress) external onlyOwner {
        authorizedContracts[contractAddress] = false;
        emit ContractDeauthorized(contractAddress);
    }
    
    // Transfer ETH to a specified recipient
    function transferEth(address payable recipient, uint256 amount) external onlyAuthorizedContracts {
        require(address(this).balance >= amount, "Insufficient balance");
        recipient.transfer(amount);
        emit FundsTransferred(address(this), recipient, amount, address(0));
    }
    
    // Transfer tokens to a specified recipient
    function transferToken(address token, address recipient, uint256 amount) external onlyAuthorizedContracts {
        require(IERC20(token).balanceOf(address(this)) >= amount, "Insufficient token balance");
        require(IERC20(token).transfer(recipient, amount), "Transfer failed");
        emit FundsTransferred(address(this), recipient, amount, token);
    }
    
    // Withdraw accidentally sent ETH from the contract
    function withdrawAccidentalEth() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    // Withdraw accidentally sent tokens from the contract
    function withdrawAccidentalToken(address token) external onlyOwner {
        uint256 balance = IERC20(token).balanceOf(address(this));
        IERC20(token).transfer(owner(), balance);
    }
}
