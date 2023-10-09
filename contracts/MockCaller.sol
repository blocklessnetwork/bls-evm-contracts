// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "./BLSSettlement.sol";  // Ensure path is correct

contract MockCaller {
    BLSSettlement public blsSettlement;
    
    constructor(address payable _blsSettlement) {
        blsSettlement = BLSSettlement(_blsSettlement);
    }

    function transferEth(address payable recipient, uint256 amount) external {
        blsSettlement.transferEth(recipient, amount);
    }

    function transferToken(address token, address recipient, uint256 amount) external {
        blsSettlement.transferToken(token, recipient, amount);
    }
}
