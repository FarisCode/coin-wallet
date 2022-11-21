// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract CoinPortal {
    uint256 totalCoins;

    event NewCoin(address indexed from, uint256 timestamp, string message);

    struct Coin {
        address sender;
        string message;
        uint256 timestamp;
    }

    Coin[] coins;

    constructor() {
        console.log("Hello, Smart Contract!");
    }

    function sendCoin(string memory _message) public {
        totalCoins += 1;
        console.log("%s sent a coin!", msg.sender);

        coins.push(Coin(msg.sender, _message, block.timestamp));

        emit NewCoin(msg.sender, block.timestamp, _message);
    }

    function getAllCoins() public view returns (Coin[] memory) {
        return coins;
    }

    function getTotalCoins() public view returns (uint256) {
        console.log("We have %d total coins!", totalCoins);
        return totalCoins;
    }
}
