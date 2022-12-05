// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract CoinPortal {
    uint256 totalCoins;

    uint256 private seed;

    event NewCoin(address indexed from, uint256 timestamp, string message);

    struct Coin {
        address sender;
        string message;
        uint256 timestamp;
    }

    Coin[] coins;

    mapping(address => uint256) public lastSentCoinAt;

    constructor() payable {
        console.log("Hello, Smart Contract!");

        seed = (block.timestamp + block.difficulty) % 100;
    }

    function sendCoin(string memory _message) public {
        require(
            lastSentCoinAt[msg.sender] + 15 minutes < block.timestamp,
            "Wait 15m"
        );

        lastSentCoinAt[msg.sender] = block.timestamp;

        totalCoins += 1;
        console.log("%s sent a coin!", msg.sender);

        coins.push(Coin(msg.sender, _message, block.timestamp));

        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated: %d", seed);

        /*
         * Give a 50% chance that the user wins the prize.
         */
        if (seed <= 50) {
            console.log("%s won!", msg.sender);
            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }
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
