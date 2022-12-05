const main = async () => {
    const [deployer] = await hre.ethers.getSigners();
    const accountBalance = await deployer.getBalance();

    console.log("Deploying contracts with account: ", deployer.address);
    console.log("Account balance: ", accountBalance.toString());

    const coinContractFactory = await hre.ethers.getContractFactory("CoinPortal");
    const coinContract = await coinContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1")
    });
    await coinContract.deployed();

    console.log("Coins Wallet address: ", coinContract.address);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();

// 0x0388da3b942359E0f5BF311c6B8B76506cD8e674 coin wallet address