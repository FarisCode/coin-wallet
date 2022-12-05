const main = async () => {
    const coinContractFactory = await hre.ethers.getContractFactory("CoinPortal");
    const coinContract = await coinContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });
    await coinContract.deployed();

    console.log("Contract deployed to:", coinContract.address);

    /*
        * Get Contract balance
    */
    let contractBalance = await hre.ethers.provider.getBalance(
        coinContract.address
    );
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );


    let coinTxn = await coinContract.sendCoin("Here's a coin for you");
    await coinTxn.wait();
   
    coinTxn = await coinContract.sendCoin("Here's another coin for you");
    await coinTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(
        coinContract.address
    );
    console.log(
        "Contract balance:",
        hre.ethers.utils.formatEther(contractBalance)
    );

    let allCoins = await coinContract.getAllCoins();
    console.log(allCoins);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0); // exit Node process without error
    } catch (error) {
        console.log(error);
        process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
    // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();